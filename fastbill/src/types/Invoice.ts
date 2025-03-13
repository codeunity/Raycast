export type InvoiceApiResponse = {
  REQUEST: {
    SERVICE: string;
  };
  RESPONSE: {
    INVOICES: Invoice[];
  };
};

export type Invoice = {
  INVOICE_ID: string;
  TYPE: string;
  CUSTOMER_ID: string;
  CUSTOMER_NUMBER: string;
  CUSTOMER_COSTCENTER_ID: string;
  CONTACT_ID: string;
  PROJECT_ID: string;
  CURRENCY_CODE: string;
  DELIVERY_DATE: string;
  INVOICE_TITLE: string;
  CASH_DISCOUNT_PERCENT: string;
  CASH_DISCOUNT_DAYS: string;
  SUB_TOTAL: number;
  VAT_TOTAL: number;
  VAT_CASE: string;
  VAT_ITEMS: VatItem[];
  ITEMS: InvoiceItem[];
  TOTAL: number;
  ORGANIZATION: string;
  NOTE: string;
  SALUTATION: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  ADDRESS: string;
  ADDRESS_2: string;
  ZIPCODE: string;
  CITY: string;
  SERVICE_PERIOD_START: string;
  SERVICE_PERIOD_END: string;
  PAYMENT_TYPE: string;
  BANK_NAME: string;
  BANK_ACCOUNT_NUMBER: string;
  BANK_CODE: string;
  BANK_ACCOUNT_OWNER: string;
  BANK_IBAN: string;
  BANK_BIC: string;
  COUNTRY_CODE: string;
  VAT_ID: string;
  TEMPLATE_ID: string;
  INVOICE_NUMBER: string;
  INTROTEXT: string;
  PAID_DATE: string;
  IS_CANCELED: string;
  INVOICE_DATE: string;
  DUE_DATE: string;
  PAYMENT_INFO: string;
  PAYMENTS: Payment[];
  LASTUPDATE: string;
  DOCUMENT_URL: string;
  COMMENTS?: Comment[];
};

export type VatItem = {
  VAT_PERCENT: number;
  COMPLETE_NET: number;
  VAT_VALUE: number;
};

export type InvoiceItem = {
  INVOICE_ITEM_ID: number;
  ARTICLE_NUMBER: string;
  DESCRIPTION: string;
  QUANTITY: number;
  UNIT: string;
  UNIT_PRICE: number;
  VAT_PERCENT: number;
  VAT_VALUE: number;
  COMPLETE_NET: number;
  COMPLETE_GROSS: number;
  CATEGORY: string[];
  CATEGORY_ID: string[];
  SORT_ORDER: number;
};

export type Payment = {
  PAYMENT_ID: string;
  DATE: string;
  AMOUNT: string;
  CURRENCY_CODE: string;
  NOTE: string;
  TYPE: string;
};

export type Comment = {
  DATE: string;
  COMMENT: string;
  COMMENT_PUBLIC: string;
};
