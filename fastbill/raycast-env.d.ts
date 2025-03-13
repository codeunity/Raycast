/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Email - Email of your fastbill account. */
  "email": string,
  /** API Key - API Key of your fastbill account. */
  "apiKey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `invoices` command */
  export type Invoices = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `invoices` command */
  export type Invoices = {}
}

