import IUsersModel, { IUsers } from '../Interfaces/IUserModel';
import User from '../database/models/UserModel';

export default class UserModel implements IUsersModel {
  private model = User;

  async findByEmail(email: string): Promise<IUsers | null> {
    const data = await this.model.findOne({ where: { email } });
    if (!data) return null;
    return data.toJSON();
  }
}
