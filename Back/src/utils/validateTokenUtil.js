import jwt from 'jsonwebtoken';

import { invalidCredentialsError } from '../services/errorService.js';

import { SECRET } from '../../env.js';

export const validateTokenUtil = async (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    invalidCredentialsError();
  }
};
