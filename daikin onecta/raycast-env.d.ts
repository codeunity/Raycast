/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Client ID - Your daikin onecta client id. */
  "clientId": string,
  /** Client Secret - Your daikin onecta client secret. */
  "clientSecret": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `devices` command */
  export type Devices = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `devices` command */
  export type Devices = {}
}

