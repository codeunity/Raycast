import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { DateTime } from "luxon";
import { FastbillPreferences } from "../types/FastbillPreferences";
import { InvoiceApiResponse } from "../types/Invoice";

const Fastbillonfig = {
  baseUrl: "https://my.fastbill.com/api/1.0/api.php",
};

const credentials = () => {
  const preferences = getPreferenceValues<FastbillPreferences>();
  return btoa(`${preferences.email}:${preferences.apiKey}`);
};

export const useFastbillClient = () => {
  const getInvoices = () => {
    return useFetch<InvoiceApiResponse>(`${Fastbillonfig.baseUrl}`, {
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
        LIMIT: 30,
        FILTER: {
          START_DATE: DateTime.now().minus({ month: 2 }).toFormat("yyyy-MM-dd"),
        },
      }),
    });
  };

  return { getInvoices };
};
