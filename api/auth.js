const getBaseUrl = (req) => {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
};

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  // ADD THIS LINE
  console.log("CLIENT_ID =", clientId);

  if (!clientId) {
    res.status(500).send('Missing GITHUB_CLIENT_ID');
    return;
  }

  const state = typeof req.query.state === 'string' ? req.query.state : '';
  const redirectUri = `${getBaseUrl(req)}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state,
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}