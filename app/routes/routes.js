import express from "express";
import { userRoutes } from "./admin/userRoutes.js";
const router = express.Router();

router.use("/test", (req, res, next) => {
  res.status(200).json({
    message: "every thing is ok",
  });
});
router.use("/user", userRoutes);
export { router as allroutes };
