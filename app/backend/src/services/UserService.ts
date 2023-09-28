import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import IUsersModel from '../Interfaces/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(private userModel: IUsersModel = new UserModel()) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha incorretos' } };
    const isPassWordValid = await bcrypt.compare(password, user.password);
    if (!isPassWordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Senha incorreta' } };
    }
    const token = jwt.sign({
      id: user.id,
      email: user.email,
    }, process.env.JWT_SECRET || 'Senha padrão', {
      expiresIn: '7d',
    });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
