import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { showFailureToast, useFetch } from "@raycast/utils";
import { DateTime } from "luxon";
import { InvoiceApiResponse } from "../types/Invoice";

const FastbillConfig = {
  baseUrl: "https://my.fastbill.com/api/1.0/api.php",
};

const requestHeaders = () => {
  const { email, apiKey } = getPreferenceValues<Preferences>();

  return {
    Authorization: `Basic ${btoa(`${email}:${apiKey}`)}`,
    "Content-Type": "application/json",
  };
};

export const useInvoices = () => {
  return useFetch<InvoiceApiResponse>(FastbillConfig.baseUrl, {
    onError: (error) => {
      showFailureToast(error, { title: "Failed to load invoices." });
    },
    method: "POST",
    headers: requestHeaders(),
    body: JSON.stringify({
      SERVICE: "invoice.get",
      LIMIT: 50,
      FILTER: {
        START_DATE: DateTime.now().minus({ month: 2 }).set({ day: 1 }).toFormat("yyyy-MM-dd"),
      },
    }),
  });
};

export const markInvoiceAsPaid = async (invoiceId: string, paidDate: Date) => {
  const toast = await showToast({ style: Toast.Style.Animated, title: "Submitting paid date..." });

  try {
    const response = await fetch(FastbillConfig.baseUrl, {
      method: "POST",
      headers: requestHeaders(),
      body: JSON.stringify({
        SERVICE: "invoice.setpaid",
        DATA: {
          INVOICE_ID: invoiceId,
          PAID_DATE: DateTime.fromJSDate(paidDate).toFormat("yyyy-MM-dd"),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    toast.style = Toast.Style.Success;
    toast.title = "Marked invoice as paid successfully!";
  } catch (error) {
    await showFailureToast(error, { title: "Failed to mark invoice as paid." });
  }
};
