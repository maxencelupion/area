import { registerAs } from '@nestjs/config';

export default registerAs('github', () => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing GitHub OAuth environment variables');
  }
  return {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  };
});
