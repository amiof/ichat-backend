import express from "express";
const router = express.Router();

router.use("/", (req, res, next) => {
  res.status(200).json({
    message: "every thing is ok",
  });
});

export { router as allroutes };
