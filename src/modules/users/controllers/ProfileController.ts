import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const userId = request.user.id;
    const user = await showProfile.execute({ userId });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const createUser = new UpdateProfileService();

    const user = await createUser.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(user);
  }
}
