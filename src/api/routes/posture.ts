import { Router } from "express";
import middlewares from "../middlewares";
import PostureService from "../../services/PostureService";
import { PostureDTO } from "../../interface/PostureDTO";
const router = Router();

export default (app: Router) => {
  app.use("/posture", router);

  router.post("/save", middlewares.jwtVerify, async (req, res) => {
    if (!Array.isArray(req.body.postures))
      return res
        .status(400)
        .json({ success: false, message: "posture is not array" });
    const postures: PostureDTO = { ...req.body.postures };
    const result = await new PostureService().save(postures, req.user!);
  });
};
