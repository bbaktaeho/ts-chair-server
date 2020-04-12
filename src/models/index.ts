import User, { associate as associateUser } from "./user";
import Posture, { associate as associatePosture } from "./posture";
export * from "./sequelize"; // 임포트 함과 동시에 수출

export const db = {
  User,
  Posture,
};

export type dbType = typeof db;

associateUser(db);
associatePosture(db);
