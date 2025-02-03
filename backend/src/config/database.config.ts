import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  const host = process.env.POSTGRES_HOST;
  const port = parseInt(process.env.POSTGRES_PORT);
  const username = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DB;

  if (!host || !port || !username || !password || !database) {
    throw new Error('Missing database environment variables');
  }
  return {
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
  };
});
