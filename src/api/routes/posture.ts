import { Router } from "express";
import middlewares from "../middlewares";
import PostureService from "../../services/PostureService";
import { PostureDTO } from "../../interface/PostureDTO";
const router = Router();

export default (app: Router) => {
  app.use("/postures", router);

  router.post("/save", middlewares.jwtVerify, async (req, res) => {
    const reqPostures = req.body.postures;

    if (!reqPostures && !Array.isArray(reqPostures))
      return res
        .status(400)
        .json({ success: false, message: "posture is not array" });
    if (Array.isArray(reqPostures)) {
      if (reqPostures.length < 9) {
        return res
          .status(400)
          .json({ success: false, message: "insufficient data" });
      }
    }
    const postures: PostureDTO = {
      p0: reqPostures[0],
      p1: reqPostures[1],
      p2: reqPostures[2],
      p3: reqPostures[3],
      p4: reqPostures[4],
      p5: reqPostures[5],
    };

    const { success, result, statusCode } = await new PostureService().save(
      postures,
      req.user!
    );
    res.status(statusCode).json({ success, message: result });
  });
};
