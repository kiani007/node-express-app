import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import downloadRouter from "./downloadRouter.js";
import authCheckMiddleware from "../middleware/authMiddleware/authCheckMiddleware.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/download', downloadRouter);
// router.use('/download', authCheckMiddleware, require("./downloadRouter.js"));
router.get("/",authCheckMiddleware ,(req, res) => {
    res.render('index', { title: "Express home" });
});

export default router;