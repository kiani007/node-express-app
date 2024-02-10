import { Router } from "express";
import UserController from "../controller/userConroller.js";
import authCheckMiddleware from "../middleware/authMiddleware/authCheckMiddleware.js";
const userRouter = Router();
//admin functionality

userRouter.get("/getAllUsers",authCheckMiddleware, UserController.getAllUser);
userRouter.get("/post/:Id", authCheckMiddleware, UserController.getPost);
userRouter.get("/getAllPost",authCheckMiddleware, UserController.getAllPost);
userRouter.post('/createPost',authCheckMiddleware, UserController.createPost);
userRouter.delete('/deletePost',authCheckMiddleware, UserController.deletePost);
userRouter.post('/restorePost',authCheckMiddleware, UserController.restorePost);
userRouter.post('/softDeletePost',authCheckMiddleware, UserController.softDeletePost);
userRouter.put('/post/:Id',authCheckMiddleware, UserController.updatePost);


export default userRouter;
