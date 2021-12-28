import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from './../controllers/UsersController';
import isAuthenticaded from '../../../shared/http/middlewares/isAuthenticaded';
import UserAvatarController from './../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticaded, usersController.index);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);
usersRouter.patch(
  '/avatar',
  isAuthenticaded,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
