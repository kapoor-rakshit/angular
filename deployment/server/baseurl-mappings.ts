// NOTE: This file has reference in `SERVER/NODE.HELPER.TS`

export const BaseUrlMappings: IURLMappings[] = [
  {
    clientUrl: [
      'https://PROD_BROWSER_URL_1(/)?',
      'https://(www.)?PROD_BROWSER_URL_2(/)?',
    ],
    apiUrl: 'https://PROD_API_URL',
  },
  {
    clientUrl: [
      'https://STG_BROWSER_URL_1(/)?',
      'https://STG_BROWSER_URL_2(/)?',
    ],
    apiUrl: 'https://STG_API_URL',
  },
  {
    clientUrl: [
      'https://DEV_BROWSER_URL_1(/)?',
      'https://DEV_BROWSER_URL_2(/)?',
    ],
    apiUrl: 'https://DEV_API_URL',
  },
];

export const BASE_URL_PREFIX = 'occ/v2/';
export interface IURLMappings {
  clientUrl: string[];
  apiUrl: string;
}
