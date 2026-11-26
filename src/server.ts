import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { environment } from './environments/environment';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * The blog's RSS feed. The API builds it; it is served from here so that
 * subscribers hold an address on the site's own domain.
 */
app.get('/rss.xml', async (_req, res) => {
  try {
    const feed = await fetch(`${environment.API}/rss.xml`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!feed.ok) throw new Error(`API answered ${feed.status}`);
    const body = await feed.text();

    res
      .set('Cache-Control', 'public, max-age=900')
      .type('application/rss+xml; charset=utf-8')
      .send(body);
  } catch (error) {
    console.error('RSS feed unavailable', error);
    res.sendStatus(502);
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = 32010;
  app.listen(port, () => {
    console.log(`Corbin.Dev frontend started on port ${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
