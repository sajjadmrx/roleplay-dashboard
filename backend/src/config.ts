export interface Configs {
    PORT: string;
    NODE_ENV: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    STEAM_RETURN_URL: string
    STEAM_API_KEY: string
    STEAM_REALM: string
    JWT_SECRET: string
}

export default (): Configs => ({
    PORT: process.env["PORT"],
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    STEAM_RETURN_URL: process.env.STEAM_RETURN_URL,
    STEAM_API_KEY: process.env.STEAM_API_KEY,
    STEAM_REALM: process.env.STEAM_REALM,
    JWT_SECRET: process.env.JWT_SECRET,
});
