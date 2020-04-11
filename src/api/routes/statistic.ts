import { Router } from "express";
const router = Router();
export default (app: Router) => {
  app.use("/statistic", router);

  router.get("/date", async (req, res) => {});
  router.get("/month", async (req, res) => {});
  router.get("/all", async (req, res) => {});
};
