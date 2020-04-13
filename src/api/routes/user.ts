import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import UserService from "../../services/UserService";
import { UserDTO } from "../../interface/UserDTO";
const router = Router();

export default (app: Router) => {
  app.use("/users", router);

  // 로그인 라우터
  router.post("/login", async (req: Request, res: Response) => {
    const user: UserDTO = {
      email: req.body.email,
      password: req.body.password,
    };
    const {
      success,
      result,
      statusCode,
      tempData,
    } = await new UserService().signIn(user);
    if (success) {
      res.setHeader("Authorization", result.toString());
      // res.setHeader("token", JSON.stringify(result));
      res
        .status(statusCode)
        .json({ success, message: "login success", check: tempData });
    } else {
      res.status(statusCode).json({ success, message: result });
    }
  });

  // 회원가입 라우터
  router.post("/signup", async (req: Request, res: Response) => {
    const user: UserDTO = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    const { success, result, statusCode } = await new UserService().signUp(
      user
    );
    res.status(statusCode).json({ success, message: result });
  });

  // 내 정보 라우터
  router.get(
    "/account",
    middlewares.jwtVerify,
    async (req: Request, res: Response) => {
      res.status(200).json({ success: true, message: "", user: req.user });
    }
  );

  // 이메일 수정 라우터
  router.put(
    "/account/emailmodify",
    middlewares.jwtVerify,
    async (req: Request, res: Response) => {
      const newEmail = req.body.newEmail;
      const {
        success,
        result,
        statusCode,
      } = await new UserService().emailModify(req.user!, newEmail);
      res.status(statusCode).json({ success, message: result });
    }
  );

  // 비밀번호 수정 라우터
  router.put(
    "/account/passwordmodify",
    middlewares.jwtVerify,
    async (req, res) => {
      const { password, newPassword } = req.body;
      const {
        success,
        result,
        statusCode,
      } = await new UserService().passwordModify(
        req.user!,
        password,
        newPassword
      );
      res.status(statusCode).json({ success, message: result });
    }
  );

  // 첫 로그인 체크 라우터
  router.put("/login/check", middlewares.jwtVerify, async (req, res) => {
    const check = req.body.check;
    const { success, result, statusCode } = await new UserService().loginCheck(
      req.user!,
      check
    );
    res.status(statusCode).json({ success, message: result });
  });

  // 비밀번호 찾기 라우터
  router.post("/find/password", async (req, res) => {
    const user: UserDTO = {
      email: req.body.email,
      name: req.body.name,
    };
    const {
      success,
      result,
      statusCode,
    } = await new UserService().findPassword(user);
    res.status(statusCode).json({ success, message: result });
  });

  // 임시 비밀번호 발급 라우터
  router.post("/temporary/password", async (req, res) => {
    const user: UserDTO = {
      email: req.body.email,
      password: req.body.tmpPassword,
    };
    const {
      success,
      result,
      statusCode,
    } = await new UserService().temporaryPassword(user);
    res.status(statusCode).json({ success, message: result });
  });

  // 회원 탈퇴 라우터
  router.delete(
    "/withdrawal",
    middlewares.jwtVerify,
    async (req: Request, res: Response) => {
      const password = req.body.password;
      const {
        success,
        result,
        statusCode,
      } = await new UserService().withdrawal(req.user!, password);
      res.status(statusCode).json({ success, message: result });
    }
  );
};
