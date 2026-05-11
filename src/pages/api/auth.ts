export const prerender = false;

const CLIENT_ID = "Ov23libt3fxKTYcSq2cJ";
const CLIENT_SECRET = "adadee354457e2525638c7b9988c08fecf8f03a2";
const REDIRECT_URI = "https://kayson.cc.cd/admin/";

export async function GET({ url, redirect }: { url: URL; redirect: Function }) {
  const code = url.searchParams.get("code");

  if (!code) {
    // Step 1: Redirect user to GitHub for authorization
    const githubUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=repo,user`;

    return redirect(githubUrl);
  }

  // Step 2: Exchange code for access token
  const response = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      }),
    },
  );

  const data = await response.json();

  // Step 3: Post token back to admin page via postMessage
  const html = `<!DOCTYPE html>
<html><head><title>Authorizing...</title></head><body>
<script>
  (function() {
    const data = ${JSON.stringify(data)};
    window.opener.postMessage(
      { type: 'authorization', payload: data },
      window.location.origin
    );
    window.close();
  })();
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
