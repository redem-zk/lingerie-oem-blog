export const prerender = false;

const CLIENT_ID = "Ov23libt3fxKTYcSq2cJ";
const CLIENT_SECRET = "adadee354457e2525638c7b9988c08fecf8f03a2";
const BASE_URL = "https://kayson.cc.cd";

export async function GET({ url, redirect }: { url: URL; redirect: Function }) {
  // Step 1: initiate OAuth - redirect to GitHub
  const scope = url.searchParams.get("scope") || "repo,user";
  const authUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(BASE_URL + "/api/callback")}` +
    `&scope=${encodeURIComponent(scope)}`;

  return redirect(authUrl);
}
