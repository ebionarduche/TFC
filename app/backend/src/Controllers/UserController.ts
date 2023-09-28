import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const ServiceResponse = await this.userService.login(email, password);
    return res.status(200).json(ServiceResponse.data);
  }
}
