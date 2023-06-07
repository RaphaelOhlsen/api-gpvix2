import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ensureAuthorized =
  (allowedRoles: string[]): RequestHandler =>
    async (req, res, next) => {
      const { userRole } = req.headers;

      if (typeof userRole === 'string') {
        const hasPermission = allowedRoles.includes(userRole);

        if (hasPermission) {
          return next();
        } else {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autorizado' },
          });
        }
      } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: { default: 'Não autorizado' },
        });
      }
    };
