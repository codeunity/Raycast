import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { useState } from "react";
import { useFastbillClient } from "../hooks/useFastbillClient";
import { InvoiceListItem } from "../utils/invoiceData";

type MarkInvoiceAsPaidProps = {
  invoice: InvoiceListItem;
  onMarkedAsPaid: () => void;
};

export const MarkInvoiceAsPaid: React.FC<MarkInvoiceAsPaidProps> = ({ invoice, onMarkedAsPaid }) => {
  const [date, setDate] = useState<Date | null>(null);
  const { markInvoiceAsPaid } = useFastbillClient();
  const { pop } = useNavigation();

  async function handleSubmit() {
    if (!date) return;

    await markInvoiceAsPaid(invoice.id, date);
    onMarkedAsPaid();
    pop();
  }

  return (
    <Form
      navigationTitle={`Mark invoice ${invoice.data.INVOICE_NUMBER} as paid`}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Mark as Paid" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.DatePicker
        id="payDate"
        title="Paid at"
        max={new Date()}
        type={Form.DatePicker.Type.Date}
        defaultValue={new Date()}
        onChange={setDate}
      />
    </Form>
  );
};
