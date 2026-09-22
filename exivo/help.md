# Connect your exivo system

1. Sign in to the [exivo customer portal](https://customer.exivo.io) as an administrator.
2. Open your site's API settings and create an API client. Copy the generated
   **Client ID** and **Client Secret**.
3. The **System ID** is the id of your exivo site — it is the `site` segment in the
   portal URL and is shown in the site's settings.

All three values are used for HTTP basic authentication against the
[exivo API](https://customer.exivo.io/docs/api/). The API client needs
permission to read components and access logs, and to unlock doors.
