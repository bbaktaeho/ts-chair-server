import { UserDTO } from "../interface/UserDTO";
import User from "../models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import config from "../config";
import * as crypto from "crypto";
// import * as fs from "fs";
// import * as handlebars from "handlebars";

// var readHTMLFile = function (path: string, callback: Function) {
//   fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
//     if (err) {
//       throw err;
//       callback(err);
//     } else {
//       callback(null, html);
//     }
//   });
// };

// let emailHtml: string;
// readHTMLFile("../views/email.html", function (err: any, html: any) {
//   var template = handlebars.compile(html);
//   var replacements = {
//     email: "Bbaktaeho",
//     temporaryPassword: crypto.randomBytes(4).toString("hex"),
//   };
//   emailHtml = template(replacements);
// });

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
        html: `
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>A Simple Responsive HTML Email</title>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      min-width: 100% !important;
    }
    img {
      height: auto;
    }
    .content {
      width: 100%;
      max-width: 600px;
    }
    .header {
      padding: 40px 30px 20px 30px;
    }
    .innerpadding {
      padding: 30px 30px 30px 30px;
    }
    .borderbottom {
      border-bottom: 1px solid #f2eeed;
    }
    .subhead {
      font-size: 15px;
      color: #ffffff;
      font-family: sans-serif;
      letter-spacing: 10px;
    }
    .h1,
    .h2,
    .bodycopy {
      color: #153643;
      font-family: sans-serif;
    }
    .h1 {
      font-size: 33px;
      line-height: 38px;
      font-weight: bold;
    }
    .h2 {
      padding: 0 0 15px 0;
      font-size: 24px;
      line-height: 28px;
      font-weight: bold;
    }
    .bodycopy {
      font-size: 16px;
      line-height: 22px;
    }
    .button {
      text-align: center;
      font-size: 18px;
      font-family: sans-serif;
      font-weight: bold;
      padding: 0 30px 0 30px;
    }
    .button input {
      font-size: 16px;
      background-color: #e05443;
      border-color: #e05443;
      color: #ffffff;
      text-decoration: none;
    }
    .footer {
      padding: 20px 30px 15px 30px;
    }
    .footercopy {
      font-family: sans-serif;
      font-size: 14px;
      color: #ffffff;
    }
    .footercopy a {
      color: #ffffff;
      text-decoration: underline;
    }

    @media only screen and (max-width: 550px),
      screen and (max-device-width: 550px) {
      body[yahoo] .hide {
        display: none !important;
      }
      body[yahoo] .buttonwrapper {
        background-color: transparent !important;
      }
      body[yahoo] .button {
        padding: 0px !important;
      }
      body[yahoo] .button a {
        background-color: #e05443;
        padding: 15px 15px 13px !important;
      }
      body[yahoo] .unsubscribe {
        display: block;
        margin-top: 20px;
        padding: 10px 50px;
        background: #2f3942;
        border-radius: 5px;
        text-decoration: none !important;
        font-weight: bold;
      }
    }

    /*@media only screen and (min-device-width: 601px) {
  .content {width: 600px !important;}
  .col425 {width: 425px!important;}
  .col380 {width: 380px!important;}
  }*/
  </style>
</head>

<body yahoo bgcolor="#f6f8f1">
  <table
    width="100%"
    bgcolor="#f6f8f1"
    border="0"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <td>
        <!--[if (gte mso 9)|(IE)]>
    <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td>
  <![endif]-->
        <table
          bgcolor="#ffffff"
          class="content"
          align="center"
          cellpadding="0"
          cellspacing="0"
          border="0"
        >
          <tr>
            <td bgcolor="#c7d8a7" class="header">
              <table
                width="70"
                align="left"
                border="0"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td height="70" style="padding: 0 20px 20px 0;">
                    <img
                      class="fix"
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/icon.gif"
                      width="70"
                      height="70"
                      border="0"
                      alt=""
                    />
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
          <table width="425" align="left" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
        <![endif]-->
              <table
                class="col425"
                align="left"
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="width: 100%; max-width: 425px;"
              >
                <tr>
                  <td height="70">
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td class="subhead" style="padding: 0 0 0 3px;">
                          CREATING
                        </td>
                      </tr>
                      <tr>
                        <td class="h1" style="padding: 5px 0 0 0;">
                          의자소통 공식 이메일
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
            </tr>
        </table>
        <![endif]-->
            </td>
          </tr>
          <tr>
            <td class="innerpadding borderbottom">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="h2">
                    비밀번호를 잊어버렸나요?
                  </td>
                </tr>
                <tr>
                  <td class="bodycopy">
                    걱정마세요! 의자소통에서 임시 비밀번호를 발급해드립니다.
                    아래 임시 비밀번호로 변경하려면 변경 버튼을 클릭해주세요.
                    만약 버튼을 클릭하지 않으면 비밀번호는 변경되지 않습니다.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="innerpadding borderbottom">
              <table
                width="115"
                align="left"
                border="0"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td height="115" style="padding: 0 20px 20px 0;">
                    <img
                      class="fix"
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/article1.png"
                      width="115"
                      height="115"
                      border="0"
                      alt=""
                    />
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
          <table width="380" align="left" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
        <![endif]-->
              <table
                class="col380"
                align="left"
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="width: 100%; max-width: 380px;"
              >
                <tr>
                  <td>
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td class="bodycopy">
                          <p>${temporaryPassword}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 0 0 0;">
                          <table
                            class="buttonwrapper"
                            bgcolor="#e05443"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td class="button" height="45">
                                <form
                                  action="http://http://13.124.213.28:9000/temporary/password"
                                  method="POST"
                                >
                                  <input
                                    type="hidden"
                                    name="email"
                                    value="${user.email}"
                                  />
                                  <input
                                    type="hidden"
                                    name="tmpPassword"
                                    value="${temporaryPassword}"
                                  />
                                  <input
                                    style="background-color: #e05443;"
                                    type="submit"
                                    href="http://http://13.124.213.28:9000/temporary/password"
                                    value="변경하기"
                                  />
                                </form>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
            </tr>
        </table>
        <![endif]-->
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
      </tr>
  </table>
  <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
`, // html body
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
            exUser.setDataValue("password", "비번 유출 안되지롱~");
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
        const exUser = await User.findOne({ where: { email: newEmail } });
        if (!exUser) {
          const updateUser = await User.update(
            { email: newEmail },
            { where: { email: user.email } }
          );
          if (updateUser[0] == 1)
            result = this.UserServiceReturn(true, updateUser, 200);
          else
            result = this.UserServiceReturn(false, "user is not exists", 404);
        } else {
          result = this.UserServiceReturn(false, "email is exists", 400);
        }
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
