import { registerAs } from '@nestjs/config';

export default registerAs('google', () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing Google OAuth environment variables');
  }
  return {
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: redirectUri,
  };
});
