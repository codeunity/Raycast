/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** System ID - Unique dormakaba exivo system id. */
  "siteId": string,
  /** Client ID - Your dormakaba exivo client id. */
  "clientId": string,
  /** Client Secret - Your dormakaba exivo client secret. */
  "clientSecret": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `unlock-door` command */
  export type UnlockDoor = ExtensionPreferences & {}
  /** Preferences accessible in the `access-log` command */
  export type AccessLog = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `unlock-door` command */
  export type UnlockDoor = {}
  /** Arguments passed to the `access-log` command */
  export type AccessLog = {}
}

