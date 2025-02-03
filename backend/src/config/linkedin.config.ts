import { registerAs } from '@nestjs/config';

export default registerAs('linkedin', () => {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_SECRET;
  const redirectUri = process.env.LINKEDIN_CALLBACK_URL;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing Linkedin OAuth2 environment variables');
  }
  return {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  };
});
