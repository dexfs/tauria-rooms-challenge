import { Request, Response } from 'express';

import GetRoomsByUsernameAction from '@modules/users/actions/GetRoomsByUsernameAction';

class UserRoomsController {
  async index(request: Request, response: Response): Promise<Response> {
    const action = new GetRoomsByUsernameAction();
    const { username } = request.params;
    const rooms = await action.execute({ username });

    return response.json(rooms);
  }
}

export default UserRoomsController;
