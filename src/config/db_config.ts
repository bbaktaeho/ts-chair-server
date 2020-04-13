import * as dotenv from "dotenv";
dotenv.config();

type Config = {
  username: string;
  password: string;
  database: string;
  host: string;
  [key: string]: string | any;
};
interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}
const dbConfig: IConfigGroup = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD!,
    database: "real_chair_database",
    host: process.env.DB_HOST!,
    dialect: "mysql",
    timezone: "+9:00",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD!,
    database: "real_chair_database",
    host: process.env.DB_HOST!,
    dialect: "mysql",
    timezone: "+9:00",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD!,
    database: "real_chair_database",
    host: process.env.DB_HOST!,
    dialect: "mysql",
    timezone: "+9:00",
  },
};

export default dbConfig;
