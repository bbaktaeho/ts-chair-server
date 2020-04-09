import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
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
  router.post("/signup", async (req: Request, res: Response) => {});
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
