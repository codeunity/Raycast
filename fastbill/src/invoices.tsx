import { Action, ActionPanel, getPreferenceValues, Icon, List, useNavigation } from "@raycast/api";

import { useState } from "react";
import { MarkInvoiceAsPaid } from "./components/MarkInvoiceAsPaid";
import { OpenPreferences } from "./components/OpenPreferences";
import { useFastbillClient } from "./hooks/useFastbillClient";
import { FastbillPreferences } from "./types/FastbillPreferences";
import { getInvoicesGroupedByMonth, toInvoiceListItems } from "./utils/invoiceData";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { push } = useNavigation();

  const { data, isLoading, revalidate } = useFastbillClient().getInvoices();

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

  const groupedInvoices = getInvoicesGroupedByMonth(filteredInvoices ?? []);
  const monthNames = Object.getOwnPropertyNames(groupedInvoices);
  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText}>
      {filteredInvoices && (
        <>
          {monthNames.map((month) => (
            <List.Section key={month} title={`${month} (${groupedInvoices[month].length} invoices)`}>
              {groupedInvoices[month].map((invoice) => (
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
                  actions={
                    <ActionPanel>
                      {invoice.paidState.title !== "PAID" && (
                        <Action
                          title={`Mark as paid`}
                          onAction={() => push(<MarkInvoiceAsPaid invoice={invoice} onMarkedAsPaid={revalidate} />)}
                        />
                      )}
                    </ActionPanel>
                  }
                />
              ))}
            </List.Section>
          ))}
        </>
      )}
    </List>
  );
}
