import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

class TokenService {
  generate(subject: string): string {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject,
      expiresIn,
    });

    return token;
  }
}

export default TokenService;
