import { Sequelize } from "sequelize";
import config from "../config";

const env =
  (process.env.NODE_ENV as "production" | "test" | "development") ||
  "development";

// 데이터베이스 계정 정보를 가져옴
const { database, username, password } = config.dbConfig[env];
const sequelize = new Sequelize(database, username, password, {
  logging: false,
  ...config.dbConfig[env],
  dialectOptions: {
    charset: "utf8mb4",
    dateStrings: true,
    typeCast: true,
  },
  define: { timestamps: true },
});

export { sequelize };
export default sequelize;
