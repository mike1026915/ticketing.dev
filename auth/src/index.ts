import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { CurrentUserRouter } from './routes/currentUser';
import { SignInRouter } from './routes/signin';
import { SignUpRouter } from './routes/signup';
import { SignOutRouter } from './routes/singout';

import { NotFoundError } from './errors/NotFoundError';

import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.set('trust proxy', true);  // because app is under ingress nginx which is as a proxy

app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)

app.use(CurrentUserRouter);
app.use(SignInRouter);
app.use(SignUpRouter);
app.use(SignOutRouter);

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('Needs JWT_KEY')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');

        console.info('Database connected')
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!');
    })
}

start();