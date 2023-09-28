import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import IUsersModel from '../Interfaces/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Token from '../utils/JsonWebToken';

export default class UserService {
  constructor(private userModel: IUsersModel = new UserModel()) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    const isPassWordValid = await bcrypt.compare(password, user.password);
    if (!isPassWordValid || email !== user.email) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }
    const { role } = user;
    const token = Token.sign({ role });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
