import { Router } from "express";
import AuthController from "../controller/authController.js";
import loggedInRedirect from "../middleware/authMiddleware/loggedInRedirect.js";
import errorHandler from "../middleware/errorHandler.js";


const authRouter = Router();

authRouter.post('/signup', errorHandler, AuthController.signupUser);
authRouter.post('/login', errorHandler, AuthController.loginUser);
authRouter.get('/login', loggedInRedirect,AuthController.login);
authRouter.get('/signup',loggedInRedirect ,AuthController.signup);


export default authRouter;
