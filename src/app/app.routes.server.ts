import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Rendered per request so an edited home configuration shows without a rebuild.
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Client,
  },
  {
    path: 'blog/a/*/*',
    renderMode: RenderMode.Server,
  },
  {
    // The authoring surface depends on a session held in the browser, so there is
    // nothing meaningful for the server to render and no reason to try.
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
