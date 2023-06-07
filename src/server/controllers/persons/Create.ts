import { Request, Response } from 'express';
import { REQUESTED_RANGE_NOT_SATISFIABLE, StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PersonsProvider } from '../../database/providers/persons';
import { validation } from '../../shared/middlewares';
import { IPerson } from '../../database/models';

interface IBodyProps extends Omit<IPerson, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      fullName: yup.string().required().min(3),
      cityId: yup.number().integer().required(),
      email: yup.string().required().email(),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await PersonsProvider.create({
    ...req.body,
    email: req.body.email.toLowerCase(),
  });

  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

  return res.status(StatusCodes.CREATED).json(result);
};
