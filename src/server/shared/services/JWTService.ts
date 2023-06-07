import * as jwt from 'jsonwebtoken';

interface IJwtData {
  uid: number;
  urole: string;
}

const sign = (data: IJwtData): string | 'JWT_SECRET_NOT_DEFINED' => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_DEFINED';

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string): IJwtData | 'JWT_SECRET_NOT_DEFINED' | 'INVALID_TOKEN' => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_DEFINED';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'string') return 'INVALID_TOKEN';

    return decoded as IJwtData;
  } catch (error) {
    return 'INVALID_TOKEN';
  }
};

export const JWTService = {
  sign,
  verify,
};
