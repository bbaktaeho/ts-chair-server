import { Model } from "sequelize";

interface IUser extends Model {
  readonly id: number;
  email: string;
  name: string;
  password: string;
  login_check: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
