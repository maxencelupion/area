import { registerAs } from '@nestjs/config';

export default registerAs('spotify', () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;
  const redirectUri = process.env.SPOTIFY_CALLBACK_URL;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing Spotify OAuth2 environment variables');
  }
  return {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  };
});
