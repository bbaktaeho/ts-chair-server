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

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
