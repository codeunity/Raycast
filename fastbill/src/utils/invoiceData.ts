import { Color } from "@raycast/api";
import { orderBy } from "es-toolkit";
import { DateTime } from "luxon";
import { Invoice, InvoiceApiResponse } from "../types/Invoice";

export type InvoiceListItem = {
  id: string;
  title: string;
  subtitle: string;
  paidState: { title: string; color: Color };
  data: Invoice;
};

const isOverDueDate = (dueDate: string) => {
  return DateTime.now() > DateTime.fromFormat(dueDate, "yyyy-MM-dd HH:mm:ss");
};

const getPaidState = (invoice: Invoice) => {
  return invoice.PAID_DATE.includes("0000-00-00")
    ? isOverDueDate(invoice.DUE_DATE)
      ? { title: "DUE", color: Color.Red }
      : { title: "OPEN", color: Color.Yellow }
    : { title: "PAID", color: Color.Green };
};

export const toInvoiceListItems = (apiInvoices?: InvoiceApiResponse): InvoiceListItem[] => {
  if (!apiInvoices) return [];

  const invoiceListItems = apiInvoices.RESPONSE.INVOICES.map(
    (invoice) =>
      ({
        id: invoice.INVOICE_ID,
        title: `${invoice.INVOICE_NUMBER} - ${invoice.ORGANIZATION}`,
        subtitle: `${Number(invoice.TOTAL).toFixed(2).replace(".", ",")}€`,
        paidState: getPaidState(invoice),
        data: invoice,
      }) satisfies InvoiceListItem,
  );

  return orderBy(invoiceListItems, ["title"], ["desc"]);
};
