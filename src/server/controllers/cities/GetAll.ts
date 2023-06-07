import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CitiesProvider } from '../../database/providers/cities';
import { validation } from '../../shared/middlewares';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().moreThan(0),
      limit: yup.number().moreThan(0),
      id: yup.number().integer().default(0),
      filter: yup.string(),
    }),
  ),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const { page, limit, filter, id } = req.query;
  const result = await CitiesProvider.getAll(page || 1, limit || 7, filter || '', Number(id || 0));
  const count = await CitiesProvider.count(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader('access-control-expose-headers', 'X-Total-Count');
  res.setHeader('X-Total-Count', count);

  return res.status(StatusCodes.OK).json(result);
};
