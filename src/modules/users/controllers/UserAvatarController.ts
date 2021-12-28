import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, avatarFilename } = request.body;
    const updateAvatar = new UpdateUserAvatarService();
    const user = updateAvatar.execute({
      user_id,
      avatarFilename,
    });

    return response.json(user);
  }
}
