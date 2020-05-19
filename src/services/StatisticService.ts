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

  private async postureExtract(
    userId: number,
    select: number,
    date?: Date
  ): Promise<any> {
    let result: any;
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
        const sql = `select p0,p1,p2,p3,p4,p5 from posture where UserId=${userId} and (createdAt between date("${moment(
          date
        ).format("YYYY-MM-DD")}") and last_day("${moment(date).format(
          "YYYY-MM-DD"
        )}"))`;

        result = await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
        });
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
        if (select == 2) {
          const extraction: Array<{
            p0: number;
            p1: number;
            p2: number;
            p3: number;
            p4: number;
            p5: number;
          }> = await this.postureExtract(userId, select, date);
          let sumOfExtraction: number[] = new Array(6).fill(0);
          extraction!.forEach((e, i) => {
            sumOfExtraction[0] += e.p0;
            sumOfExtraction[1] += e.p1;
            sumOfExtraction[2] += e.p2;
            sumOfExtraction[3] += e.p3;
            sumOfExtraction[4] += e.p4;
            sumOfExtraction[5] += e.p5;
          });
          result = this.StatisticServiceReturn(true, sumOfExtraction, 200);
        } else {
          const extraction: Array<Posture> = await this.postureExtract(
            userId,
            select,
            date
          );
          let sumOfExtraction: number[] = new Array(6).fill(0);
          extraction!.forEach((e) => {
            if (!(e instanceof Posture)) return;
            sumOfExtraction[0] += e.getDataValue("p0");
            sumOfExtraction[1] += e.getDataValue("p1");
            sumOfExtraction[2] += e.getDataValue("p2");
            sumOfExtraction[3] += e.getDataValue("p3");
            sumOfExtraction[4] += e.getDataValue("p4");
            sumOfExtraction[5] += e.getDataValue("p5");
          });

          result = this.StatisticServiceReturn(true, sumOfExtraction, 200);
        }
      }
    } catch (showError) {
      result = this.StatisticServiceReturn(false, showError.message, 500);
    } finally {
      return result;
    }
  }

  public async showComparison(userId: number): Promise<any> {
    let result: any;
    try {
      const list = await Posture.findAll({
        attributes: ["p0", "p1", "p2", "p3", "p4", "p5", "createdAt"],
        where: { UserId: userId },
      });
      result = this.StatisticServiceReturn(true, list, 200);
    } catch (err) {
      result = this.StatisticServiceReturn(false, err.message, 500);
    } finally {
      return result!;
    }
  }
}
