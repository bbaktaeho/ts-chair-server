import { Router } from "express";
const router = Router();

export default (app: Router) => {
  app.use("/posture", router);

  router.post("/save", async (req, res) => {});
};
