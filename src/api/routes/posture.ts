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
      p1: reqPostures[0],
      p2: reqPostures[1],
      p3: reqPostures[2],
      p4: reqPostures[3],
      p5: reqPostures[4],
      p6: reqPostures[5],
      p7: reqPostures[6],
      p8: reqPostures[7],
      p9: reqPostures[8],
      nonP: reqPostures[9],
    };

    const { success, result, statusCode } = await new PostureService().save(
      postures,
      req.user!
    );
    res.status(statusCode).json({ success, message: result });
  });
};
