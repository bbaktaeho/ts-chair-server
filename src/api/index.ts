import { Router } from "express";
import user from "./routes/user";
import posture from "./routes/posture";
import statistic from "./routes/statistic";

// guaranteed to get dependencies
export default () => {
  const app = Router();

  // 라우터 등록
  user(app);
  posture(app);
  statistic(app);

  return app;
};
