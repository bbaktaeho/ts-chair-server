import User from "../models/user";
export interface UserServiceReturn {
  user: User;
  success: boolean;
  message: string;
}
