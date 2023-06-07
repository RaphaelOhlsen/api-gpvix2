import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { UsersProvider } from '../../database/providers/users';

interface IParamProps {
  id?: number;
}

interface IBodyParams {
  name?: string,
  email?: string,
  password?: string,
  role?: string,
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyParams>(
    yup.object().shape({
      name: yup.string().min(3),
      email: yup.string().email(),
      role: yup.string().oneOf(['user', 'admin', 'sadmin']),
      password: yup.string().min(6),
    }),
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

function isObjectEmpty(obj: IBodyParams): boolean {
  return Object.values(obj).every((value) => value === undefined);
}

export const updateById = async (req: Request<IParamProps, {}, IBodyParams>, res: Response) => {
  const { id } = req.params;

  let body = req.body;

  if (isObjectEmpty(body)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'É necessário informar ao menos um campo para atualização.',
      },
    });
  }

  if (body.email) {
    body = {
      ...body,
      email: body.email.toLowerCase(),
    };
  }
  const result = await UsersProvider.updateById(Number(id), body);

  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

  return res.status(StatusCodes.NO_CONTENT).send();
};