import express from 'express';

import { authRouter } from './auth';
import { userRouter } from './users';
import { filesRouter } from './files';

export const services = express.Router();

services.use('/auth', authRouter);
services.use('/users', userRouter);
services.use('/files', filesRouter);
