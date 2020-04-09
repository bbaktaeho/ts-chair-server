import { UserDTO } from "../interface/UserDTO";

export default class AuthService {
  constructor() {}

  public async signIn(user: UserDTO): Promise<any> {}
  public async signUp(): Promise<any> {}
}
