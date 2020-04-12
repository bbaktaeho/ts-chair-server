import User from "../../models/user";
import Posture from "../../models/posture";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    posture?: Posture;
  }
  interface Response {}
}
