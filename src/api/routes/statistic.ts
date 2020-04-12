import { Router } from "express";
import middlewares from "../middlewares";
import StatisticService from "../../services/StatisticService";
const router = Router();
export default (app: Router) => {
  app.use("/statistic", router);

  router.get("/date", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;
    await new StatisticService().show(1, date);
  });
  router.get("/month", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;
    await new StatisticService().show(2, date);
  });
  router.get("/all", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;
    await new StatisticService().show(3, date);
  });
};
