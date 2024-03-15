import "dotenv/config";

export default {
    PORT: process.env.PORT,
    ENV: process.env.ENV,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_URL_TESTS: process.env.MONGO_URL_TESTS,
    SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    PERSISTENCE: process.env.PERSISTENCE,
    SECRET_COOKIES: process.env.SECRET_COOKIES,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    SECRET_COOKIES: process.env.SECRET_COOKIES
};