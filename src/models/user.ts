import {
  Model,
  DataTypes,
  BelongsToMany,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyAddAssociationMixin,
} from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";
// import Post from "./post";

class User extends Model {
  public readonly id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public login_check!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    nickname: {
      type: DataTypes.STRING(20),
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    login_check: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize, // 실제 디비랑 연결하려면 해야함
    modelName: "User",
    tableName: "user",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글저장
  }
);

export const associate = (db: dbType) => {};
export default User;
