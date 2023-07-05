// NOTE: This file has reference in `SERVER/SERVER-API.TS`

import { BaseSite, JavaRegExpConverter } from '@spartacus/core';
import axios from 'axios';
import { Request } from 'express';
import { environment } from 'src/environments/environment';
import { BaseUrlMappings, BASE_URL_PREFIX, IURLMappings } from './baseurl-mappings';

export class NodeHelper {
  static getRequestOrigin(req: Request): string {
    const trustProxyFn = req.app.get('trust proxy fn');
    let forwardedHost = req.get('X-Forwarded-Host');
    if (forwardedHost && trustProxyFn(req.connection.remoteAddress, 0)) {
      forwardedHost = forwardedHost.split(',')[0];
      return req.protocol + '://' + forwardedHost;
    } else {
      return req.protocol + '://' + req.get('host');
    }
  }

  static getFullRequestURL(req: any) {
    const fullUrl = this.getRequestOrigin(req) + req.originalUrl;
    return fullUrl;
  }

  static getBaseURL(req: Request): string {
    let apiBaseURL: string | undefined = environment.occBaseUrl;
    if (!apiBaseURL) {
      const clientOrigin = this.getRequestOrigin(req);
      const mapped = BaseUrlMappings?.find(
        (x: IURLMappings) => !!x?.clientUrl?.some((m) => new RegExp(m).test(clientOrigin?.toLowerCase()))
      );

      apiBaseURL = mapped?.apiUrl || '';
    }
    return apiBaseURL ? apiBaseURL + (apiBaseURL.endsWith('/') ? '' : '/') + BASE_URL_PREFIX : '';
  }

  static getBaseSiteUId(res: any, req: Request) {
    const fullUrl = this.getFullRequestURL(req);
    try {
      const apiBaseURL = this.getBaseURL(req);
      if (!apiBaseURL) {
        return Promise.reject(`No url mapping found`);
      }

      return axios
        .get(apiBaseURL + 'basesites?fields=baseSites(uid,urlPatterns)')
        .then((response: any) => response?.data?.baseSites)
        .then((baseSites: BaseSite[]) => {
          const site = baseSites?.find((x) => this.isCurrentBaseSite(x, fullUrl));
          res.append('BaseSite', site?.uid);
          return site?.uid;
        });
    } catch (result: any) {
      res.append('sitecatch', typeof result === 'string' ? result : (result?.message || '') + (result?.stack || ''));
      return Promise.reject(`catch error`);
    }
  }

  static contentPageExists(pageId: string, res: any, req: Request) {
    return new Promise((resolve, reject) => {
      try {
        this.getBaseSiteUId(res, req)
          .then((baseSiteUid) => {
            if (!baseSiteUid) {
              resolve(true);
              return;
            }
            const url = this.getContentPageTestApiUrl(pageId, baseSiteUid, req);
            axios
              .get(url)
              .then((response: any) => {
                resolve(response.data.status === 'SUCCESS');
              })
              .catch(() => {
                resolve(true);
              });
          })
          .catch(() => {
            resolve(true);
          });
      } catch (err: any) {
        const msg = typeof err === 'string' ? err : (err?.message || '') + (err?.stack || '');
        return reject(`catch error ${msg}`);
      }
    });
  }

  static categoryCodeExists(categoryCode: string, res: any, req: Request) {
    return new Promise((resolve, reject) => {
      try {
        this.getBaseSiteUId(res, req)
          .then((baseSiteUid) => {
            if (!baseSiteUid) {
              resolve(true);
              return;
            }
            const catUrl = NodeHelper.getCategoryTestApiUrl(encodeURIComponent(categoryCode), baseSiteUid, req);
            axios
              .get(catUrl)
              .then((response: any) => {
                resolve(response.data.status === 'SUCCESS');
              })
              .catch(() => {
                resolve(true);
              });
          })
          .catch((err: any) => {
            resolve(err);
          });
      } catch (result: any) {
        const msg = typeof result === 'string' ? result : (result?.message || '') + (result?.stack || '');
        return reject(`catch error ${msg}`);
      }
    });
  }

  static productCodeExists(pCode: string, res: any, req: Request) {
    return new Promise((resolve, reject) => {
      try {
        this.getBaseSiteUId(res, req)
          .then((baseSiteUid) => {
            if (!baseSiteUid) {
              resolve(true);
              return;
            }
            const url = this.getProductCodeTestApiUrl(pCode, baseSiteUid, req);
            axios
              .get(url)
              .then((response: any) => {
                resolve(response.data.status === 'SUCCESS');
              })
              .catch(() => {
                resolve(true);
              });
          })
          .catch(() => {
            resolve(true);
          });
      } catch (err: any) {
        const msg = typeof err === 'string' ? err : (err?.message || '') + (err?.stack || '');
        return reject(`catch error ${msg}`);
      }
    });
  }

  static getContentPageTestApiUrl(pageId: string, baseSiteId: string, req: Request): string {
    const url =
      this.getBaseURL(req) + `${baseSiteId}/doesPageExist?fields=DEFAULT&pageLabelOrId=${pageId}&pageType=ContentPage`;
    return url;
  }

  static getCategoryTestApiUrl(category: string, baseSiteId: string, req: Request): string {
    const url =
      this.getBaseURL(req) + `${baseSiteId}/doesTypeWithCodeExist?fields=DEFAULT&type=category&code=${category}`;
    return url;
  }

  static getProductCodeTestApiUrl(productCode: string, baseSiteId: string, req: Request): string {
    const url =
      this.getBaseURL(req) + `${baseSiteId}/doesTypeWithCodeExist?fields=DEFAULT&type=product&code=${productCode}`;
    return url;
  }

  static isCurrentBaseSite(site: BaseSite, currentUrl: string): boolean {
    const index = (site.urlPatterns || []).findIndex((javaRegexp) => {
      const jsRegexp = new JavaRegExpConverter().toJsRegExp(javaRegexp);
      if (jsRegexp) {
        const result = jsRegexp.test(currentUrl);
        return result;
      }
      return -1;
    });

    return index !== -1;
  }
}

