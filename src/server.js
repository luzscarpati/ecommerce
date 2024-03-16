import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import MainRouter from './routes/index.js';
import config from './config/config.js';
import { mongoStoreOptions } from './utils/utils.js';
import { errorHandler } from "./middlewares/errorHandler.js";

const mainRouter = new MainRouter();
const app = express();

app.use(session(mongoStoreOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser(config.SECRET_COOKIES));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(errorHandler);
app.use('/api', mainRouter.getRouter())

const PORT = config.PORT;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

