import logger from '#config/logger.js';
import { signUpSchema } from '#validations/auth.validations.js';
import { formatValidationError } from '#utils/format.js';
import { createUser } from '#services/auth.services.js';
import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signUpSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { name, email, password, role } = validationResult.data;

    //AUTH SERVICE: CHECK IF USER EXISTS
    const user = await createUser(name, email, password, role);
    logger.info(`User registred successfully: ${email}`);

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    cookies.set(res, 'token', token);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Error signing up', error);

    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ message: 'Email already exists' });
    }

    next(error);
  }
};
