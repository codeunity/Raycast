# onecta Changelog

## [Raycast 2 API] - {PR_MERGE_DATE}

- Migrated to the Raycast 2 API (`@raycast/api` 2.x, `@raycast/utils` 2.x)
- Declared `platforms` in the manifest, the extension now also runs on Windows
- Added a `help.md` that is shown next to the setup form while the required preferences are missing
- Dropped the unused `es-toolkit` and `luxon` dependencies
- Device actions now report a failed request instead of always showing a success toast

## [Devices] - 2025-06-24

- Added get all devices
