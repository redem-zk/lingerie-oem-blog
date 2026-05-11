export const prerender = false;

const CLIENT_ID = "Ov23libt3fxKTYcSq2cJ";
const CLIENT_SECRET = "adadee354457e2525638c7b9988c08fecf8f03a2";

export async function GET({ url }: { url: URL }) {
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code parameter", { status: 400 });
  }

  // Exchange code for token
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
  });
  const data = await res.json();

  if (data.error) {
    return new Response(JSON.stringify(data), { status: 400 });
  }

  // Post token back to CMS via postMessage, then close popup
  const html = `<!DOCTYPE html>
<html><body>
<script>
  window.opener.postMessage(
    { token: '${data.access_token}', provider: 'github' },
    window.location.origin
  );
  window.close();
</script>
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
