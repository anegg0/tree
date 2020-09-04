import express from 'express';

import * as controller from './controller';
export const filesRouter = express.Router();

/** POST /api/files */
filesRouter.route('/').post(controller.create);

// /** GET /api/users */
// filesRouter.route('/').get(controller.find);

// /** GET /api/users/:userId */
// /** Authenticated route */
// filesRouter
//   .route('/:userId')
//   .get(jwt({ secret: config.secret, algorithms: config.algorithms }), controller.get);

// /** POST /api/users */
// filesRouter.route('/').post(controller.create);

// /** PATCH /api/users/:userId */
// /** Authenticated route */
// filesRouter
//   .route('/:userId')
//   .patch(jwt({ secret: config.secret, algorithms: config.algorithms }), controller.patch);
