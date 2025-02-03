import { registerAs } from '@nestjs/config';

export default registerAs('ms', () => {
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  const redirectUri = process.env.MS_CALLBACK_URL;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing Microsoft OAuth environment variables');
  }
  return {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  };
});
