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
    p0: {
      // 바른 자세
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p1: {
      // 걸터 앉은 자세
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p2: {
      // 둔부 앞 자세
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p3: {
      // 왼쪽으로 기울거나 오른 다리를 꼰 자세
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p4: {
      // 오른쪽으로 기울거나 왼 다리를 꼰 자세
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p5: {
      // 앞으로 숙인 자세
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
