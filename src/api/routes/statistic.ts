import { Router } from "express";
import middlewares from "../middlewares";
import StatisticService from "../../services/StatisticService";
const router = Router();
export default (app: Router) => {
  app.use("/statistic", router);

  router.get("/date", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;

    if (typeof date == "undefined")
      res.status(400).json({ success: false, message: "data is null" });
    else {
      let message = "";
      const {
        success,
        result,
        statusCode,
      } = await new StatisticService().showStatistic(req.user!.id, 1, date);
      if (result == null) message = "의자를 사용하지 않았어요!";
      else message = "성공";
      res.status(statusCode).json({ success, message, statistics: result });
    }
  });
  router.get("/month", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;
    await new StatisticService().showStatistic(req.user!.id, 2, date);
  });
  router.get("/all", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;
    await new StatisticService().showStatistic(req.user!.id, 3, date);
  });
};
