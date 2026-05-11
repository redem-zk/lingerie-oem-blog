export const prerender = false;

const CLIENT_ID = "Ov23libt3fxKTYcSq2cJ";
const CLIENT_SECRET = "adadee354457e2525638c7b9988c08fecf8f03a2";
const REDIRECT_URI = "https://kayson.cc.cd/api/auth";

export async function GET({ url, redirect }: { url: URL; redirect: Function }) {
  const code = url.searchParams.get("code");

  if (!code) {
    const githubUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=repo,user`;
    return redirect(githubUrl);
  }

  // Exchange code for token
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
  });
  const data = await res.json();

  const html = `<!DOCTYPE html>
<html><body>
<script>
  const data = ${JSON.stringify(data)};
  window.opener.postMessage({ token: data.access_token, provider: 'github' }, '*');
  window.close();
</script>
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
