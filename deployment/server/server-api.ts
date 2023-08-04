// NOTE: This file has reference in `SERVER.PROD.TS`

import { APP_BASE_HREF } from '@angular/common';
import { NodeHelper } from 'server/node.helper';

const notFoundUrl = '/not-found';

export const checkSearchAndContentPageUrl = (server: any, indexHtml: string) => {
  server.get(['*/search/:searchtext*', '*'], (req: any, res: any) => {
    let urlToTest = req.originalUrl.split('?')[0];
    res.append('UrlToTest', urlToTest);

    if (urlToTest === '/' || urlToTest === '/cx-preview' || (urlToTest.includes('/search') && req.params.searchtext)) {
      render(req, res, indexHtml);
      return;
    }

    if (urlToTest.indexOf(notFoundUrl) > -1) {
      render(req, res, indexHtml, 404);
      return;
    }

    try {
      NodeHelper.contentPageExists(urlToTest, res, req)
        .then((result: any) => {
          onSuccess(req, res, result, indexHtml);
        })
        .catch((err) => {
          res.append('err', JSON.stringify(err));
          onError(req, res, indexHtml);
        });
    } catch {
      onError(req, res, indexHtml);
    }
  });
};

export const checkCategoryPageUrl = (server: any, indexHtml: string) => {
  server.get(['*/c/:subCat', '*/c/:subCat\\?*'], (req: any, res: any) => {
    if (!req.params.subCat) {
      res.redirect(301, notFoundUrl);
      res.end();
    } else {
      try {
        NodeHelper.categoryCodeExists(req.params.subCat, res, req)
          .then((result: any) => {
            onSuccess(req, res, result, indexHtml);
          })
          .catch(() => {
            onError(req, res, indexHtml);
          });
      } catch {
        onError(req, res, indexHtml);
      }
    }
  });
};

export const checkPDPPageUrl = (server: any, indexHtml: string) => {
  server.get(['*/p/:productCode', '*/p/:productCode\\?*'], (req: any, res: any) => {
    if (!req.params.productCode) {
      res.redirect(301, notFoundUrl);
      res.end();
    } else {
      try {
        NodeHelper.productCodeExists(req.params.productCode, res, req)
          .then((result: any) => {
            onSuccess(req, res, result, indexHtml);
          })
          .catch(() => {
            onError(req, res, indexHtml);
          });
      } catch {
        onError(req, res, indexHtml);
      }
    }
  });
};

const onSuccess = (req: any, res: any, result: any, indexHtml: any) => {
  if (result === false || (typeof result === 'object' && !result?.status)) {
    res.redirect(301, notFoundUrl);
    res.end();
  } else {
    res.append('Warning', typeof result === 'string' ? result : (result?.message || '') + (result?.stack || ''));
    render(req, res, indexHtml);
  }
};

const onError = (req: any, res: any, indexHtml: string) => {
  render(req, res, indexHtml);
};

const render = (req: any, res: any, indexHtml: any, status?: number) => {
  status && res.status(status);

  res.render(indexHtml, {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  });
};

