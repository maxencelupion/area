import { registerAs } from '@nestjs/config';

export default registerAs('twitch', () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const redirectUri = process.env.TWITCH_CALLBACK_URL;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing Twitch OAuth environment variables');
  }
  return {
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: redirectUri,
  };
});
