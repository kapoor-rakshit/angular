// NOTE: This file is placed inside <PROJECT_NAME> directory, i.e. at same level of `package.json`
// This file is used in 'build:ssr' command of package.json

import 'zone.js/dist/zone-node';

import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import { NgExpressEngineDecorator } from '@spartacus/setup/ssr';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { existsSync } from 'fs';
import { checkCategoryPageUrl, checkPDPPageUrl, checkSearchAndContentPageUrl } from 'server/server-api';

const ngExpressEngine = NgExpressEngineDecorator.get(engine);

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/<PROJECT_NAME>/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.set('trust proxy', 'loopback');

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // server.get('*', (req, res) => {
  //   res.render(indexHtml, {
  //     req,
  //     providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  //   });
  // });

  checkCategoryPageUrl(server, indexHtml);
  checkPDPPageUrl(server, indexHtml);
  checkSearchAndContentPageUrl(server, indexHtml);

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
