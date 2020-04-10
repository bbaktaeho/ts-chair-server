import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import UserService from "../../services/UserService";
import { UserDTO } from "../../interface/UserDTO";
const router = Router();

export default (app: Router) => {
  app.use("/users", router);

  router.get("/me", (req: Request, res: Response) => {
    return res.json({ test: "hi" }).status(200);
  });

  router.post(
    "/login",
    middlewares.jwtSign,
    async (req: Request, res: Response) => {}
  );
  router.post("/signup", async (req: Request, res: Response) => {
    const user: UserDTO = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    const signUp = new UserService().signUp;
    const { success, result, statusCode } = await signUp(user);
    res.status(statusCode).json({ success, result });
  });
  router.get(
    "/account",
    middlewares.jwtVerify,
    async (req: Request, res: Response) => {}
  );
  router.put("/emailmodify", (req: Request, res: Response) => {});
  router.put("/passwordmodify", (req: Request, res: Response) => {});
  router.put("/login/check", (req: Request, res: Response) => {});
  router.delete("/withdrawal", (req: Request, res: Response) => {});
};
