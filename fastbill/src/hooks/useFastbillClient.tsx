import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { DateTime } from "luxon";
import fetch from "node-fetch";
import { FastbillPreferences } from "../types/FastbillPreferences";
import { InvoiceApiResponse } from "../types/Invoice";

const FastbillConfig = {
  baseUrl: "https://my.fastbill.com/api/1.0/api.php",
};

const credentials = () => {
  const preferences = getPreferenceValues<FastbillPreferences>();
  return btoa(`${preferences.email}:${preferences.apiKey}`);
};

export const useFastbillClient = () => {
  const getInvoices = () => {
    return useFetch<InvoiceApiResponse>(FastbillConfig.baseUrl, {
      onError: (error) => {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to load invoices.",
          message: error.message,
        });
      },
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SERVICE: "invoice.get",
        LIMIT: 50,
        FILTER: {
          START_DATE: DateTime.now().minus({ month: 2 }).set({ day: 1 }).toFormat("yyyy-MM-dd"),
        },
      }),
    });
  };

  const markInvoiceAsPaid = (invoiceId: string, paidDate: Date) => {
    showToast({ style: Toast.Style.Animated, title: "Submitting paid date..." });
    return fetch(FastbillConfig.baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SERVICE: "invoice.setpaid",
        DATA: {
          INVOICE_ID: invoiceId,
          PAID_DATE: DateTime.fromJSDate(paidDate).toFormat("yyyy-MM-dd"),
        },
      }),
    })
      .then(() => {
        showToast({
          style: Toast.Style.Success,
          title: `Marked invoice as paid successfully!`,
        });
      })
      .catch((error: { message: string }) => {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed mark invoice as paid.",
          message: error.message,
        });
      });
  };

  return { getInvoices, markInvoiceAsPaid };
};
