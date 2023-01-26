export interface Configs {
  PORT: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  REDIS_URL: string;
}

export default (): Configs => ({
  PORT: process.env["PORT"],
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
});
