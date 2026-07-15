import { Color } from "@raycast/api";
import { orderBy, sum } from "es-toolkit";
import { DateTime } from "luxon";
import { Invoice, InvoiceApiResponse } from "../types/Invoice";

export type InvoicePaidState = { title: "OPEN" | "DUE" | "PAID"; color: Color };

export type InvoiceListItem = {
  id: string;
  title: string;
  subtitle: string;
  paidState: InvoicePaidState;
  data: Invoice;
};

const isOverDueDate = (dueDate: string) => {
  return DateTime.now() > DateTime.fromFormat(dueDate, "yyyy-MM-dd HH:mm:ss");
};

const getPaidState = (invoice: Invoice): InvoicePaidState => {
  return invoice.PAID_DATE.includes("0000-00-00")
    ? isOverDueDate(invoice.DUE_DATE)
      ? { title: "DUE", color: Color.Red }
      : { title: "OPEN", color: Color.Yellow }
    : { title: "PAID", color: Color.Green };
};

export const toInvoiceListItems = (apiInvoices?: InvoiceApiResponse): InvoiceListItem[] => {
  if (!apiInvoices) return [];

  const invoicesOnly = apiInvoices.RESPONSE.INVOICES.filter(
    (invoice) => invoice.TOTAL >= 0 && invoice.IS_CANCELED !== "1",
  );

  const invoiceListItems = invoicesOnly.map(
    (invoice) =>
      ({
        id: invoice.INVOICE_ID,
        title: `${invoice.INVOICE_NUMBER} - ${invoice.ORGANIZATION}`,
        subtitle: `${Number(invoice.SUB_TOTAL).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`,
        paidState: getPaidState(invoice),
        data: invoice,
      }) satisfies InvoiceListItem,
  );

  return orderBy(invoiceListItems, ["title"], ["desc"]);
};

export const getInvoicesGroupedByMonth = (invoices: InvoiceListItem[]) => {
  return invoices.reduce(
    (acc, invoice) => {
      const month = new Date(invoice.data.INVOICE_DATE).toLocaleString("en-US", { month: "long" });

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(invoice);
      return acc;
    },
    {} as Record<string, InvoiceListItem[]>,
  );
};

export const getTotal = (invoices: InvoiceListItem[]) => {
  const total = sum(invoices.map((x) => Number(x.data.SUB_TOTAL)));
  return `${total.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`;
};
