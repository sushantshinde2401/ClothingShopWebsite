const getBaseUrl = (req) => {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
};

const renderPopupResponse = ({ token, error }) => {
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

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = req.query.code;

  if (!clientId || !clientSecret) {
    res.status(500).send(renderPopupResponse({ error: 'Missing GitHub OAuth environment variables.' }));
    return;
  }

  if (!code || typeof code !== 'string') {
    res.status(400).send(renderPopupResponse({ error: 'Missing GitHub OAuth code.' }));
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
        redirect_uri: `${getBaseUrl(req)}/api/callback`,
      }),
    });
    const data = await tokenResponse.json();

console.log("GitHub Status:", tokenResponse.status);
console.log("GitHub Response:", data);

    if (!tokenResponse.ok || !data.access_token) {
      res.status(401).send(renderPopupResponse({ error: data.error_description || data.error || 'GitHub authorization failed.' }));
      return;
    }

    res.status(200).send(renderPopupResponse({ token: data.access_token }));
  } catch (error) {
    res.status(500).send(renderPopupResponse({ error: error.message }));
  }
}
