import { Router } from "express";
import UserController from "../controller/userConroller.js";
import authCheckMiddleware from "../middleware/authMiddleware/authCheckMiddleware.js";
const userRouter = Router();



userRouter.post('/createPost',authCheckMiddleware, UserController.createPost);
userRouter.put('/updatePost/:id',authCheckMiddleware, UserController.updatePost);
userRouter.post('/restorePost',authCheckMiddleware, UserController.restorePost);
userRouter.post('/softDeletePost/:id',authCheckMiddleware, UserController.softDeletePost);
userRouter.delete('/deletePost/:id',authCheckMiddleware, UserController.deletePost);
userRouter.get('/logout', UserController.logout);
userRouter.get("/getAllUsers",authCheckMiddleware, UserController.getAllUser);
userRouter.get("/getPost/:id", authCheckMiddleware, UserController.getPost);
userRouter.get("/getAllPosts",authCheckMiddleware, UserController.getAllPost);


export default userRouter;
