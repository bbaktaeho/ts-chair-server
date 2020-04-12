import {
  Model,
  DataTypes,
  BelongsTo,
  BelongsToMany,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyAddAssociationMixin,
} from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class Posture extends Model {
  public readonly id!: number;
  public UserId!: number;
  public p1!: number;
  public p2!: number;
  public p3!: number;
  public p4!: number;
  public p5!: number;
  public p6!: number;
  public p7!: number;
  public p8!: number;
  public p9!: number;
  public noneP!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Posture.init(
  {
    p1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p4: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p5: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p6: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p7: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p8: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p9: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nonP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Posture",
    tableName: "posture",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글저장
  }
);

export const associate = (db: dbType) => {
  db.Posture.belongsTo(db.User);
};
export default Posture;
