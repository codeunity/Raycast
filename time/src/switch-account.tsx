import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { AccountId } from "./hooks/auth0";
import { useAccounts } from "./hooks/useAccounts";

export default function SwitchAccount() {
  const { accounts, isLoading, switchTo, addAccount, removeAccount } = useAccounts();
  const hasSecondAccount = accounts.length > 1;

  return (
    <List isLoading={isLoading}>
      {accounts.map((account) => (
        <List.Item
          key={account.id}
          icon={account.isActive ? { source: Icon.CheckCircle, tintColor: Color.Green } : Icon.Circle}
          title={account.email ?? account.name ?? account.id}
          subtitle={account.isActive ? "Active" : undefined}
          actions={
            <ActionPanel>
              {account.isActive ? (
                <Action
                  title="Active Account"
                  icon={Icon.CheckCircle}
                  onAction={() => {
                    // no-op — prevents Remove from becoming the primary Enter action
                  }}
                />
              ) : (
                <Action
                  title="Switch to This Account"
                  icon={Icon.ArrowRight}
                  onAction={() => switchTo(account.id as AccountId)}
                />
              )}
              {!account.isActive && (
                <Action
                  title="Remove Account"
                  icon={Icon.Trash}
                  style={Action.Style.Destructive}
                  shortcut={{ modifiers: ["cmd"], key: "backspace" }}
                  onAction={() => removeAccount(account.id as AccountId)}
                />
              )}
            </ActionPanel>
          }
        />
      ))}
      {!hasSecondAccount && !isLoading && (
        <List.Item
          key="add-account"
          icon={Icon.AddPerson}
          title="Add Second Account"
          actions={
            <ActionPanel>
              <Action title="Add Account" icon={Icon.Plus} onAction={addAccount} />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
