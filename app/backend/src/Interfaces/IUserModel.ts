export interface IUsers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export default interface IUsersModel {
  // findAll(): Promise<IUsers[]>
  findByEmail(email: string): Promise<IUsers | null>
}
