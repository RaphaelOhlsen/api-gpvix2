import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';

interface IBodyProps extends Omit<IUser, 'id' | 'role'> {}


export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    }),
  ),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsersProvider.create({
    ...req.body,
    email: req.body.email.toLowerCase(),
    role: 'user'
  });

  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

  return res.status(StatusCodes.CREATED).json(result);
};
