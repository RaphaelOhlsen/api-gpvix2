import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { ICity } from '../../database/models';
import { CitiesProvider } from '../../database/providers/cities';

interface IParamProps {
  id?: number;
}

interface IBodyParams extends Omit<ICity, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyParams>(
    yup.object().shape({
      name: yup.string().required().min(3),
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
  const result = await CitiesProvider.updateById(Number(id), req.body);

  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

  return res.status(StatusCodes.NO_CONTENT).send();
};
