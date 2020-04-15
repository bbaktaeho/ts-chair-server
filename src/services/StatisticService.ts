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

  private async dateFormat(userId: number, select: number, date: Date) {
    const realDate = moment(date).format("YYYY-MM-DD");

    let result;
    switch (select) {
      case 1:
        result = await Posture.findAll({
          where: { userId },
        });

        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }
    return result;
  }

  public async showStatistic(
    userId: number,
    select: number,
    date: Date
  ): Promise<any> {
    let result;
    try {
      if (!moment(date).isValid())
        result = this.StatisticServiceReturn(false, "data is invalid", 400);
      else {
        result = this.StatisticServiceReturn(
          true,
          await this.dateFormat(userId, select, date),
          200
        );
      }
    } catch (showError) {
      result = this.StatisticServiceReturn(false, showError.message, 500);
    } finally {
      return result;
    }
  }
}
