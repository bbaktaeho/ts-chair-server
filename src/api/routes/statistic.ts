import { Router } from "express";
import middlewares from "../middlewares";
import StatisticService from "../../services/StatisticService";
import * as moment from "moment";

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
  router.get("/all/comparison", middlewares.jwtVerify, async (req, res) => {
    const {
      success,
      result,
      statusCode,
    } = await new StatisticService().showComparison(req.user!.id);
    let realResult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (Array.isArray(result))
      result.forEach((e, i) => {
        let date = moment(e.createdAt).month();
        switch (date) {
          case 0:
            realResult[date] += e.p0;
            break;
          case 1:
            realResult[date] += e.p0;
            break;
          case 2:
            realResult[date] += e.p0;
            break;
          case 3:
            realResult[date] += e.p0;
            break;
          case 4:
            realResult[date] += e.p0;
            break;
          case 5:
            realResult[date] += e.p0;
            break;
          case 6:
            realResult[date] += e.p0;
            break;
          case 7:
            realResult[date] += e.p0;
            break;
          case 8:
            realResult[date] += e.p0;
            break;
          case 9:
            realResult[date] += e.p0;
            break;
          case 10:
            realResult[date] += e.p0;
            break;
          case 11:
            realResult[date] += e.p0;
            break;
        }
      });
    res
      .status(statusCode)
      .json({ success, message: "test", statistics: realResult });
  });
};
