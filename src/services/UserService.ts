import { UserDTO } from "../interface/UserDTO";
import User from "../models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default class UserService {
  constructor() {}

  private UserServiceReturn(
    success: boolean,
    result: any,
    statusCode: number
  ): { success: boolean; result: any; statusCode: number } {
    return { success, result, statusCode };
  }

  private async newToken(user: UserDTO): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(JSON.stringify(user), process.env.JWT_SECRET!, (err, token) => {
        if (err) resolve(null);
        else resolve(token);
      });
    });
  }

  /**
   * @비지니스로직
   */

  // 로그인 비지니스 로직
  public async signIn(
    user: UserDTO
  ): Promise<{ success: boolean; result: any; statusCode: number } | any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!(user.email && user.password))
        result = this.UserServiceReturn(false, "dto error", 400);
      else {
        const exUser = await User.findOne({
          where: { email: user.email },
        });
        if (!exUser)
          result = this.UserServiceReturn(false, "user is not exists", 404);
        else {
          delete exUser.dataValues.id;
          delete exUser.dataValues.password;
          delete exUser.dataValues.createdAt;
          delete exUser.dataValues.updatedAt;
          const token = await this.newToken(exUser.dataValues);
          if (token) result = this.UserServiceReturn(true, token, 200);
        }
      }
    } catch (signInError) {
      result = this.UserServiceReturn(false, signInError.message, 500);
    } finally {
      return result;
    }
  }

  // 회원가입 비지니스 로직
  public async signUp(
    user: UserDTO
  ): Promise<{ success: boolean; result: any; statusCode: number } | any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!(user.email && user.name && user.password))
        result = this.UserServiceReturn(false, "dto error", 400);
      else if (await User.findOne({ where: { email: user.email } })) {
        result = this.UserServiceReturn(false, "overlap", 409);
      } else {
        const password = await bcrypt.hash(user.password, 12);
        const newUser = await User.create({
          email: user.email,
          name: user.name,
          password,
        });
        result = this.UserServiceReturn(true, "signUp success", 200);
      }
    } catch (signUpError) {
      result = this.UserServiceReturn(false, signUpError.message, 500);
    } finally {
      return result;
    }
  }

  // 이메일수정 비지니스 로직
  public async emailModify(
    user: UserDTO,
    newEmail: string
  ): Promise<{ success: boolean; result: any; statusCode: number } | any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!newEmail)
        result = this.UserServiceReturn(false, "newEmail is null", 400);
      else {
        const updateUser = await User.update(
          { email: newEmail },
          { where: { email: user.email } }
        );
        if (updateUser[0] == 1)
          result = this.UserServiceReturn(true, updateUser, 200);
        else result = this.UserServiceReturn(false, "user is not exists", 404);
      }
    } catch (emailModifyError) {
      result = this.UserServiceReturn(false, emailModifyError.message, 500);
    } finally {
      return result;
    }
  }

  public async passwordModify(
    user: UserDTO,
    password: string,
    newPassword: string
  ): Promise<{ success: boolean; result: any; statusCode: number } | any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!(password && newPassword))
        result = this.UserServiceReturn(
          false,
          "password or newPassword is null",
          400
        );
      else {
        const updateUser = await User.update(
          { password: newPassword },
          { where: { email: user.email, password } }
        );
        if (updateUser[0] == 1)
          result = this.UserServiceReturn(true, updateUser, 200);
        else result = this.UserServiceReturn(false, "update fail", 400);
      }
    } catch (passwordModifyError) {
      result = this.UserServiceReturn(false, passwordModifyError.message, 500);
    } finally {
      return result;
    }
  }
}
