# Exivo Changelog

## [Raycast 2 API] - {PR_MERGE_DATE}

- Migrated to the Raycast 2 API (`@raycast/api` 2.x, `@raycast/utils` 2.x)
- Declared `platforms` in the manifest, the extension now also runs on Windows
- Added a `help.md` that is shown next to the setup form while the required preferences are missing
- Moved ESLint to the flat config format required by ESLint 9 and above
- Replaced the `node-fetch` import with the global `fetch` of the Node 22 runtime
- Fixed the Show Details action in the access log, it was passed as a detail view and could never be triggered
- Unlocking a door and setting a door mode now report a failed request instead of always showing a success toast

## [Added Exivo] - {PR_MERGE_DATE}

Initial version code
