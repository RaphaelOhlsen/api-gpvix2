import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { JWTService, PasswordCrypto } from '../../shared/services';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';

interface IBodyProps extends Omit<IUser, 'id' | 'name' | 'role'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    }),
  ),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, password } = req.body;

  const user = await UsersProvider.getByEmail(email);

  if (user instanceof Error)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha incorretos',
      },
    });

  const isPasswordValid = await PasswordCrypto.verifyPassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha incorretos',
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: user.id, urole: user.role });
    const role = user.role;

    if (accessToken === 'JWT_SECRET_NOT_DEFINED') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar access token',
        },
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken, role });
  }
};
