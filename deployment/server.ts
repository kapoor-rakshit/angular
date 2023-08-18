// NOTE: This file is placed inside <PROJECT_NAME> directory, i.e. at same level of `package.json`
// This file is used in 'build:ssr' command of package.json i.e.
// "build:ssr": "(cp server.prod.ts server.ts || copy server.prod.ts server.ts) && ng build --configuration production && ng run <PROJECT_NAME>:server:production"
//  `server.ts` is always used for SSR, `cp server.prod.ts server.ts` copies content of PROD file here in `server.ts` when making deployment on NON-LOCAL env

import 'zone.js/dist/zone-node';
import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import { NgExpressEngineDecorator } from '@spartacus/setup/ssr';
import * as express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { checkCategoryPageUrl, checkPDPPageUrl, checkSearchAndContentPageUrl } from 'server/server-api';
import { AppServerModule } from './src/main.server';

const ngExpressEngine = NgExpressEngineDecorator.get(engine, { timeout: 3000 });

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
      inlineCriticalCss: false,
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

  checkCategoryPageUrl(server, indexHtml);
  checkPDPPageUrl(server, indexHtml);
  checkSearchAndContentPageUrl(server, indexHtml);
  return server;
}

function run() {
  const server = app();
  const https = require('https');
  const fs = require('fs');

  const port = process.env.PORT || 4200;

  const options = {
    key: fs.readFileSync('certs/localhost.key'),
    cert: fs.readFileSync('certs/localhost.crt'),
  };

  // Start up the Node server
  const nodeServer = https.createServer(options, server).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Node Express server listening on https://localhost:${port}`);
  });
  nodeServer.timeout = 120000;
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
