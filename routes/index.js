import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";

const router = Router();


router.use('/auth', authRouter);
router.use('/users', userRouter);
router.get("/", (req, res) => {
    res.render('index', { title: "Express home" });
});

export default router;