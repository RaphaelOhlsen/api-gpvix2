import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' },
    });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' },
    });
  }

  const jwtData = JWTService.verify(token);
  
  if (jwtData === 'JWT_SECRET_NOT_DEFINED') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Erro ao verficar access token' },
    });
  }

  if (jwtData === 'INVALID_TOKEN') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' },
    });
  }

  req.headers.userId = jwtData.uid.toString();
  req.headers.userRole = jwtData.urole;

  return next();
};
