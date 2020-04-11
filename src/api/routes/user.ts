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
    const { success, result, statusCode } = await new UserService().signIn(
      user
    );
    if (success) {
      res.setHeader("token", JSON.stringify(result));
      res.status(statusCode).json({ success, result: "login success" });
    } else {
      res.status(statusCode).json({ success, result });
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
    res.status(statusCode).json({ success, result });
  });

  // 내 정보 라우터
  router.get(
    "/account",
    middlewares.jwtVerify,
    async (req: Request, res: Response) => {
      res.status(200).json({ success: true, user: req.user });
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
      res.status(statusCode).json({ success, result });
    }
  );

  // 비밀번호 수정 라우터
  router.put("/account/passwordmodify", (req: Request, res: Response) => {});

  // 첫 로그인 체크
  router.put("/login/check", (req: Request, res: Response) => {});

  // 회원 탈퇴
  router.delete("/withdrawal", (req: Request, res: Response) => {});
};
