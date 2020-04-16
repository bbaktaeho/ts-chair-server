import * as moment from "moment";
import Posture from "../models/posture";
import sequelize from "../models/sequelize";
import * as Sequelize from "sequelize";
const op = Sequelize.Op;

export default class StatisticService {
  constructor() {}

  private StatisticServiceReturn(
    success: boolean,
    result: any,
    statusCode: number
  ) {
    return { success, result, statusCode };
  }

  private async postureExtract(userId: number, select: number, date?: Date) {
    let result;
    switch (select) {
      case 1:
        result = await Posture.findAll({
          attributes: ["p0", "p1", "p2", "p3", "p4", "p5"],
          where: {
            UserId: userId,
            createdAt: {
              [op.lt]: new Date(
                moment(date).add(1, "d").format("YYYY-MM-DD HH:mm:ss")
              ),
              [op.gt]: new Date(moment(date).format("YYYY-MM-DD HH:mm:ss")),
            },
          },
        });
        break;
      case 2:
        const sql = `select * from posture where UserId=${userId} and (createdAt between date(${moment(
          date
        ).format("YYYY-MM-DD")}) and last_day(${moment(date).format(
          "YYYY-MM-DD"
        )}))`;
        const [results, metadata] = await sequelize.query(sql);
        console.log(results);
        console.log(metadata);

        // result = await Posture.findAll({
        //   attributes: ["p1", "p2", "p3", "p4", "p5"],
        //   where: {
        //     UserId: userId,
        //     createdAt: {
        //       // 한 달 조건을 넣어야 함
        //     },
        //   },
        // });
        break;
      case 3:
        result = await Posture.findAll({
          attributes: ["p0", "p1", "p2", "p3", "p4", "p5"],
          where: {
            UserId: userId,
          },
        });
        break;

      default:
        break;
    }
    return result;
  }

  public async showStatistic(
    userId: number,
    select: number,
    date?: Date
  ): Promise<any> {
    let result;
    try {
      if (select !== 3 && !moment(date).isValid())
        result = this.StatisticServiceReturn(false, "data is invalid", 400);
      else {
        const extraction = await this.postureExtract(userId, select, date);
        let sumOfExtraction: number[] = new Array(6).fill(0);
        extraction!.forEach((e) => {
          sumOfExtraction[0] += e.getDataValue("p0");
          sumOfExtraction[1] += e.getDataValue("p1");
          sumOfExtraction[2] += e.getDataValue("p2");
          sumOfExtraction[3] += e.getDataValue("p3");
          sumOfExtraction[4] += e.getDataValue("p4");
          sumOfExtraction[5] += e.getDataValue("p5");
        });

        result = this.StatisticServiceReturn(true, sumOfExtraction, 200);
      }
    } catch (showError) {
      result = this.StatisticServiceReturn(false, showError.message, 500);
    } finally {
      return result;
    }
  }
}
