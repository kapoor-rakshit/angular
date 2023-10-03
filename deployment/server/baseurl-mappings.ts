// NOTE: This file has reference in `SERVER/NODE.HELPER.TS`

export const BaseUrlMappings: IURLMappings[] = [
  {
    clientUrl: [
      'https://PROD_BROWSER_URL_1.com(/)?',
      'https://(www.)?PROD_BROWSER_URL_2.com.au(/)?',
    ],
    apiUrl: 'https://PROD_API_URL.com',
  },
  {
    clientUrl: [
      'https://STG_BROWSER_URL_1.com(/)?',
      'https://(prod.)?STG_BROWSER_URL_2.com(/)?',
    ],
    apiUrl: 'https://STG_API_URL.com',
  },
  {
    clientUrl: [
      'https://DEV_BROWSER_URL_1.com(/)?',
      'https://DEV_BROWSER_URL_2.com(/)?',
    ],
    apiUrl: 'https://DEV_API_URL.com',
  },
];

export const BASE_URL_PREFIX = 'occ/v2/';
export interface IURLMappings {
  clientUrl: string[];
  apiUrl: string;
}
