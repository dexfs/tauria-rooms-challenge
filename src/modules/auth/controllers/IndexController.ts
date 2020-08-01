import { Request, Response } from 'express';
import AuthenticateAction from '../actions/AuthenticateAction';

class IndexController {
  async authenticate(request: Request, response: Response) {
    const authenticateAction = new AuthenticateAction();
    const { user, token } = await authenticateAction.execute(request.body);
    return response.json({ user, token });
  }
}

export default IndexController;
