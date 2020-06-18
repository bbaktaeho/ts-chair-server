import * as dotenv from "dotenv";
import dbConfig from "./db_config";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: process.env.PORT!,

  /**
   * That long string from mlab
   */
  dbConfig: dbConfig,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET as string,

  /**
   * Your service email
   */
  serviceEmail: process.env.CHAIR_EMAIL,
  servicePassword: process.env.CHAIR_PASSWORD,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
};
