# fastbill Changelog

## [Raycast 2 API] - {PR_MERGE_DATE}

- Migrated to the Raycast 2 API (`@raycast/api` 2.x, `@raycast/utils` 2.x)
- Declared `platforms` in the manifest, the extension now also runs on Windows
- Added a `help.md` that is shown next to the setup form while the required preferences are missing
- Replaced the `node-fetch` import with the global `fetch` of the Node 22 runtime
- Marking an invoice as paid now reports a failed request instead of always showing a success toast
- Draft invoices are no longer listed
- List items fall back to the contact's first and last name when no company name is set

## [Dependency Updates] - {PR_MERGE_DATE}

- Updated all dependencies
- List items now show netto prices instead of brutto

## [Initial Version] - {PR_MERGE_DATE}
