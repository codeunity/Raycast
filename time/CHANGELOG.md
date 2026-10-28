# time Changelog

## [Keycloak Login] - 2026-10-28

- Sign in with Keycloak instead of Auth0, existing accounts have to sign in again

## [Raycast 2 API] - 2026-10-28

- Migrated to the Raycast 2 API (`@raycast/api` 2.x, `@raycast/utils` 2.x)
- Declared `platforms` in the manifest, the extension now also runs on Windows
- Opening the time records or the create form no longer refetches the project list
- Creating, updating and deleting a time record now report a failed request instead of always showing a success toast
- The Delete Time Record and Remove Account shortcuts now have a Windows binding next to the macOS one

## [Dependency Updates] - 2026-07-15

- Updated all dependencies

## [Auth Fix] - 2026-05-07

- Fixed Authentication for new deployed backend

## [Support two tenants] - 2026-04-09

- Added support for two different time tenants

## [TimeRecords] - 2025-04-24

- Added TimeRecords read, create and delte
