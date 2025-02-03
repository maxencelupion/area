import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('app', () => {
  const secret = process.env.SECRET_KEY;
  const crypto_key = process.env.CRYPTO_KEY;
  const front_url =
    'http://' + process.env.HOST_FRONT + ':' + process.env.PORT_FRONT;

  const back_host: string = process.env.HOST_BACK;
  let uri_scheme: string;
  let back_url: string;
  if (back_host.includes('localhost')) {
    uri_scheme = 'http://';
    back_url = uri_scheme + back_host + ':' + process.env.PORT_BACK;
  } else {
    uri_scheme = 'https://';
    back_url = uri_scheme + back_host;
  }
  if (!secret || !front_url || !back_url || !crypto_key) {
    throw new Error('Missing app environment variables');
  }
  return {
    secret: secret,
    front_url: front_url,
    back_url: back_url,
    crypto_key: crypto_key,
  };
});
