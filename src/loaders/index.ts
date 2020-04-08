import expressLoader from "./express";
import { Application } from "express";
// import dependencyInjectorLoader from "./dependencyInjector";
// import jobsLoader from "./jobs";
import Logger from "./logger";
import { sequelize } from "../models";

export default async ({ expressApp }: { expressApp: Application }) => {
  sequelize
    .sync({ force: false })
    .then(() => {
      Logger.info("✌️ DB loaded and connected!");
    })
    .catch((err: Error) => {
      console.error(err.message);

      Logger.error("DB loaded and error!");
    });

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  //   await jobsLoader({ agenda });
  // Logger.info("✌️ Jobs loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
