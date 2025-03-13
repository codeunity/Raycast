import { getPreferenceValues, Icon, List } from "@raycast/api";

import { useState } from "react";
import { OpenPreferences } from "./components/OpenPreferences";
import { useFastbillClient } from "./hooks/useFastbillClient";
import { FastbillPreferences } from "./types/FastbillPreferences";
import { toInvoiceListItems } from "./utils/invoiceData";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useFastbillClient().getInvoices();

  const preferences = getPreferenceValues<FastbillPreferences>();
  if (!preferences.apiKey || !preferences.email) {
    return OpenPreferences();
  }

  const filteredInvoices = toInvoiceListItems(data)?.filter(
    (listItem) =>
      listItem.title.toLowerCase().includes(searchText.toLowerCase()) ||
      listItem.subtitle.toLowerCase().includes(searchText.toLowerCase()) ||
      listItem.paidState.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText}>
      {filteredInvoices && (
        <List.Section title={`Last ${filteredInvoices.length} invoices`}>
          {filteredInvoices.map((invoice) => (
            <List.Item
              key={invoice.id}
              icon={Icon.ArrowRightCircle}
              title={invoice.title}
              subtitle={invoice.subtitle}
              accessories={[
                {
                  tag: {
                    value: invoice.paidState.title,
                    color: invoice.paidState.color,
                  },
                },
              ]}
            />
          ))}
        </List.Section>
      )}
    </List>
  );
}
