import { Router } from "express";
import middlewares from "../middlewares";
import StatisticService from "../../services/StatisticService";
const router = Router();
export default (app: Router) => {
  app.use("/statistic", router);

  router.get("/date", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;
    let time: string = "";
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
      else {
        message = "성공";
        if (Array.isArray(result)) {
          let times: number = result.reduce((a, b) => a + b);
          let hour = Math.floor(times / 3600);
          let minute = Math.floor((times % 3600) / 60);
          time = `${hour} 시간 ${minute} 분`;
        }
      }
      res
        .status(statusCode)
        .json({ success, message, statistics: result, time });
    }
  });

  router.get("/month", middlewares.jwtVerify, async (req, res) => {
    const date = req.query.date;
    let time: string = "";
    if (typeof date == "undefined")
      res.status(400).json({ success: false, message: "data is null" });
    else {
      let message = "";
      const {
        success,
        result,
        statusCode,
      } = await new StatisticService().showStatistic(req.user!.id, 2, date);
      if (result == null) message = "의자를 사용하지 않았어요!";
      else {
        message = "성공";
        if (Array.isArray(result)) {
          let times: number = result.reduce((a, b) => a + b);
          let hour = Math.floor(times / 3600);
          let minute = Math.floor((times % 3600) / 60);
          time = `${hour} 시간 ${minute} 분`;
        }
      }
      res
        .status(statusCode)
        .json({ success, message, statistics: result, time });
    }
  });
  router.get("/all", middlewares.jwtVerify, async (req, res) => {
    let message = "";
    let time: string = "";
    const {
      success,
      result,
      statusCode,
    } = await new StatisticService().showStatistic(req.user!.id, 3, new Date());
    if (result == null) message = "의자를 사용하지 않았어요!";
    else {
      message = "성공";
      if (Array.isArray(result)) {
        let times: number = result.reduce((a, b) => a + b);
        let hour = Math.floor(times / 3600);
        let minute = Math.floor((times % 3600) / 60);
        time = `${hour} 시간 ${minute} 분`;
      }
    }
    res.status(statusCode).json({ success, message, statistics: result, time });
  });
};
