import { NextFunction, Request, Response } from 'express';
import { User } from '../../server.js';

export const find = (req, res, next) => {
  // If a query string ?publicAddress=... is given, then filter results
  const whereClause = req.query &&
    req.query.publicAddress && {
      where: { publicAddress: req.query.publicAddress },
    };

  return User.findAll(whereClause)
    .then((users) => res.json(users))
    .catch(next);
};

export const get = (req, res, next) => {
  // AccessToken payload is in req.user.payload, especially its `id` field
  // UserId is the param in /users/:userId
  // We only allow user accessing herself, i.e. require payload.id==userId
  if ((req).user.payload.id !== +req.params.userId) {
    return res.status(401).send({ error: 'You can can only access yourself' });
  }
  return User.findByPk(req.params.userId)
    .then((user) => res.json(user))
    .catch(next);
};

export const create = (req, res, next) =>
  User.create(req.body)
    .then((user) => res.json(user))
    .catch(next);

export const patch = (req, res, next) => {
  // Only allow to fetch current user
  if ((req).user.payload.id !== +req.params.userId) {
    return res.status(401).send({ error: 'You can can only access yourself' });
  }
  return User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) {
        return user;
      }

      Object.assign(user, req.body);
      return user.save();
    })
    .then((user) => {
      return user
        ? res.json(user)
        : res.status(401).send({
            error: `User with publicAddress ${req.params.userId} is not found in database`,
          });
    })
    .catch(next);
};
