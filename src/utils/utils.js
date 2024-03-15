import { dirname } from "path";
import { fileURLToPath } from "url";
import bcryptjs from "bcryptjs";
import MongoStore from "connect-mongo";
import config from "../config/config.js";

export const mongoStoreOptions = {
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000
    },
    store: new MongoStore({
      mongoUrl: config.MONGO_URL,
      ttl: 10,
    }),
};