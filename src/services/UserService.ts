import { UserDTO } from "../interface/UserDTO";
import User from "../models/user";
import * as bcrypt from "bcrypt";

function UserServiceReturn(
  success: boolean,
  result: any,
  statusCode: number
): any {
  return { success, result, statusCode };
}

export default class UserService {
  constructor() {}

  // 로그인 비지니스 로직
  public async signIn(
    user: UserDTO
  ): Promise<{ success: boolean; result: any; statusCode: number }> {
    try {
      if (!(user.email && user.password))
        return UserServiceReturn(false, "dto error", 400);
      const exUser = await User.findOne({
        where: { email: user.email },
      });
      if (!exUser) return UserServiceReturn(false, "user is not exists", 404);

      return UserServiceReturn(true, exUser, 200);
    } catch (signInError) {
      return UserServiceReturn(false, signInError.message, 500);
    }
  }

  // 회원가입 비지니스 로직
  public async signUp(
    user: UserDTO
  ): Promise<{ success: boolean; result: any; statusCode: number }> {
    try {
      if (!(user.email && user.name && user.password))
        return UserServiceReturn(false, "dto error", 400);

      if (await User.findOne({ where: { email: user.email } })) {
        return UserServiceReturn(false, "overlap", 409);
      }

      const password = await bcrypt.hash(user.password, 12);
      const newUser = User.create({
        email: user.email,
        name: user.name,
        password,
      });
      return UserServiceReturn(true, newUser, 200);
    } catch (signUpError) {
      return UserServiceReturn(false, signUpError.message, 500);
    }
  }
}
