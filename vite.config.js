import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const getDevBaseUrl = (req) => {
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
};

const renderAuthPopup = ({ token, error }) => {
  const status = token ? 'success' : 'error';
  const payload = JSON.stringify(token ? { token, provider: 'github' } : { error });
  const message = `authorization:github:${status}:${payload}`;

  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Authorizing...</title></head>
  <body>
    <script>
      (function () {
        var message = ${JSON.stringify(message)};
        function send(origin) {
          if (window.opener) window.opener.postMessage(message, origin || '*');
        }
        window.addEventListener('message', function (event) { send(event.origin); }, false);
        if (window.opener) window.opener.postMessage('authorizing:github', '*');
        setTimeout(function () { send('*'); window.close(); }, 500);
      })();
    </script>
  </body>
</html>`;
};

const adminRoute = () => ({
  name: 'admin-and-dev-oauth-routes',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url, getDevBaseUrl(req));

      if (req.url === '/admin') {
        res.statusCode = 302;
        res.setHeader('Location', '/admin/');
        res.end();
        return;
      }

      if (req.url === '/admin/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(readFileSync(resolve(process.cwd(), 'public/admin/index.html')));
        return;
      }

      if (url.pathname === '/api/auth') {
        const clientId = process.env.GITHUB_CLIENT_ID;

        if (!clientId) {
          res.statusCode = 500;
          res.end('Missing GITHUB_CLIENT_ID. Add it to .env.local or .env before testing GitHub login locally.');
          return;
        }

        const params = new URLSearchParams({
          client_id: clientId,
          redirect_uri: `${getDevBaseUrl(req)}/api/callback`,
          scope: 'repo,user',
          state: url.searchParams.get('state') || '',
        });

        res.statusCode = 302;
        res.setHeader('Location', `https://github.com/login/oauth/authorize?${params.toString()}`);
        res.end();
        return;
      }

      if (url.pathname === '/api/callback') {
        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;
        const code = url.searchParams.get('code');

        res.setHeader('Content-Type', 'text/html');

        if (!clientId || !clientSecret) {
          res.statusCode = 500;
          res.end(renderAuthPopup({ error: 'Missing GitHub OAuth environment variables.' }));
          return;
        }

        if (!code) {
          res.statusCode = 400;
          res.end(renderAuthPopup({ error: 'Missing GitHub OAuth code.' }));
          return;
        }

        try {
          const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code,
              redirect_uri: `${getDevBaseUrl(req)}/api/callback`,
            }),
          });
          const data = await tokenResponse.json();

          if (!tokenResponse.ok || !data.access_token) {
            res.statusCode = 401;
            res.end(renderAuthPopup({ error: data.error_description || data.error || 'GitHub authorization failed.' }));
            return;
          }

          res.end(renderAuthPopup({ token: data.access_token }));
        } catch (error) {
          res.statusCode = 500;
          res.end(renderAuthPopup({ error: error.message }));
        }
        return;
      }

      next();
    });
  },
});

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    cacheDir: process.env.VITE_CACHE_DIR || '.vite-cache',
    plugins: [adminRoute(), react(), tailwindcss()],
  };
});
