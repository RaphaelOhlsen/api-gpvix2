import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { IPerson } from '../../database/models';
import { PersonsProvider } from '../../database/providers/persons';

interface IParamProps {
  id?: number;
}

interface IBodyParams extends Omit<IPerson, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyParams>(
    yup.object().shape({
      fullName: yup.string().required().min(3),
      email: yup.string().required().email(),
      cityId: yup.number().integer().required(),
    }),
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyParams>, res: Response) => {
  const { id } = req.params;
  const body = {
    ...req.body,
    email: req.body.email.toLowerCase(),
    
  };
  const result = await PersonsProvider.updateById(Number(id), body);

  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

  return res.status(StatusCodes.NO_CONTENT).send();
};
