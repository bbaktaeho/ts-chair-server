import { UserDTO } from "../interface/UserDTO";
import User from "../models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import config from "../config";
import * as crypto from "crypto";

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
      jwt.sign(JSON.stringify(user), config.jwtSecret, (err, token) => {
        if (err) resolve(null);
        else resolve(token);
      });
    });
  }

  private async sendMail(user: UserDTO): Promise<any> {
    const temporaryPassword = crypto.randomBytes(4).toString("hex");
    try {
      const transporter = nodemailer.createTransport({
        host: "smpt.gmail.com",
        service: "gmail",
        port: 465,
        secure: false,
        auth: {
          user: config.serviceEmail, // generated ethereal user
          pass: config.servicePassword, // generated ethereal password
        },
      });

      const info = await transporter.sendMail({
        from: "🔥의자소통(chairCommunication) <inuchair@gmail.com>", // sender address
        to: user.email, // list of receivers
        subject: "🔥임시 비밀번호 ✔", // Subject line
        html: `<p>${temporaryPassword} 이거로 로그인해라</p>
        <form action="http://localhost:${config.port}/api/users/temporary/password" method="post">
         <input type="hidden" name="email" value="${user.email}">
         <input type="hidden" name="tmpPassword" value="${temporaryPassword}">
         <input type="submit" name="btn1" value="비밀번호 변경하기" />
       </form>`, // html body
      });
      if (info) return true;
      else return false;
    } catch (sendMailError) {
      console.error(sendMailError.message);
      return false;
    }
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
          if (
            !(await bcrypt.compare(
              user.password,
              exUser.getDataValue("password")
            ))
          )
            result = this.UserServiceReturn(
              false,
              "password is defferent",
              400
            );
          else {
            delete exUser.password;
            const token = await this.newToken(exUser);
            if (token) result = this.UserServiceReturn(true, token, 200);
            else result = this.UserServiceReturn(false, "where token..?", 400);
          }
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

  // 비밀번호 수정 비지니스 로직
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
        const selectUser = await User.findOne({ where: { email: user.email } });
        if (!selectUser)
          result = this.UserServiceReturn(false, "user is not exists", 400);
        else {
          if (!(await bcrypt.compare(password, selectUser.password)))
            result = this.UserServiceReturn(
              false,
              "password is defferent",
              400
            );
          else {
            const hashPassword = await bcrypt.hash(newPassword, 12);
            const updateUser = await User.update(
              { password: hashPassword },
              { where: { email: user.email } }
            );
            if (updateUser[0] == 1)
              result = this.UserServiceReturn(true, updateUser, 200);
            else result = this.UserServiceReturn(false, "update fail", 400);
          }
        }
      }
    } catch (passwordModifyError) {
      result = this.UserServiceReturn(false, passwordModifyError.message, 500);
    } finally {
      return result;
    }
  }

  // 첫 로그인 체크 비지니스 로직
  public async loginCheck(user: UserDTO, check: number): Promise<any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!check) result = this.UserServiceReturn(false, "check is null", 400);
      else {
        const updateUser = await User.update(
          { login_check: check },
          { where: { email: user.email } }
        );
        if (updateUser[0] == 1)
          result = this.UserServiceReturn(true, updateUser, 200);
        else result = this.UserServiceReturn(false, "update fail", 400);
      }
    } catch (loginCheckError) {
      result = this.UserServiceReturn(false, loginCheckError.message, 500);
    } finally {
      return result;
    }
  }

  // 비밀번호 찾기 비지니스 로직
  public async findPassword(user: UserDTO): Promise<any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!(user.email && user.name))
        result = this.UserServiceReturn(false, "dto error", 400);
      else {
        const selectUser = await User.findOne({
          where: { email: user.email, name: user.name },
        });
        if (!selectUser)
          result = this.UserServiceReturn(false, "user is not exists", 404);
        else {
          if (!(await this.sendMail(user)))
            result = this.UserServiceReturn(false, "failed to send", 400);
          else result = this.UserServiceReturn(true, "check your email", 200);
        }
      }
    } catch (findPasswordError) {
      result = this.UserServiceReturn(false, findPasswordError.message, 500);
    } finally {
      return result;
    }
  }

  // 임시 비밀번호 변경 비지니스 로직
  public async temporaryPassword(user: UserDTO): Promise<any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!(user.email && user.password))
        result = this.UserServiceReturn(false, "dto error", 400);
      else {
        const selectUser = await User.findOne({ where: { email: user.email } });
        if (!selectUser)
          result = this.UserServiceReturn(false, "user is not exists", 404);
        else {
          const hashPassword = await bcrypt.hash(user.password, 12);
          const updateUser = await User.update(
            { password: hashPassword },
            { where: { email: user.email } }
          );
          if (updateUser[0] == 1)
            result = this.UserServiceReturn(true, "update", 200);
          else result = this.UserServiceReturn(false, "failed", 400);
        }
      }
    } catch (temporaryPasswordError) {
      result = this.UserServiceReturn(
        false,
        temporaryPasswordError.message,
        500
      );
    } finally {
      return result;
    }
  }

  // 회원탈퇴 비지니스 로직
  public async withdrawal(user: UserDTO, password: string): Promise<any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      if (!password)
        result = this.UserServiceReturn(false, "password is null", 400);
      else {
        const selectUser = await User.findOne({ where: { email: user.email } });
        if (!(await bcrypt.compare(password, selectUser!.password)))
          result = this.UserServiceReturn(false, "password is different", 400);
        else {
          const deleteUser = await User.destroy({
            where: { email: user.email },
          });
          if (deleteUser == 1)
            result = this.UserServiceReturn(true, deleteUser, 200);
          else result = this.UserServiceReturn(false, "withdrawal fail", 400);
        }
      }
    } catch (withdrawalError) {
      result = this.UserServiceReturn(false, withdrawalError.message, 500);
    } finally {
      return result;
    }
  }
}
