import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../logger.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";

const prisma = new PrismaClient();

const AuthService = {
  loginUser: async ({ email, password }) => {
    try {
      if (!email || !password) {
        return {status:HTTP_STATUS.BAD_REQUEST,message:'Email and password are required'}
        // throw new Error("Email and password are required");
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return {status:HTTP_STATUS.NOT_FOUND,message:'User not found'}
        // throw new Error("User not found");
      }

      const passwordMatch = await bcrypt.compare(password, user.hash);
      if (!passwordMatch) {
        return {status:HTTP_STATUS.UNAUTHORIZED,message:'Incorrect password'}
        // throw new Error("Incorrect password");
      }
		  const token = AuthService.generateToken({ id: user.id, email: user.email, name: user.name });
		 
      return {
        token,
        user: { id: user.id, email: user.email, name: user.name },
        status: HTTP_STATUS.OK,
        message: 'Login successful'
      };
    } catch (error) {
      logger.error(error);
      return {status:HTTP_STATUS.INTERNAL_SERVER_ERROR,message:error.message}
      // throw new Error("Failed to login");
    }
  },

  signupUser: async ({ name, email, password }) => {
    try {
      if (!name || !email || !password) {
        return {status:HTTP_STATUS.BAD_REQUEST,message:'Name, email, and password are required'}
        // throw new Error("Name, email, and password are required");
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return {status:HTTP_STATUS.CONFLICT,message:'User already exists'}
        // throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({ data: { name, email, hash: hashedPassword } });

      const token = AuthService.generateToken({ id: newUser.id, email: newUser.email, name: newUser.name });
      return {
        token,
        user: ({ id: newUser.id, email: newUser.email, name: newUser.name }),
        status: HTTP_STATUS.CREATED, message: 'User created successfully'
      }
    } catch (error) {
      logger.error(error);
      return {status:HTTP_STATUS.INTERNAL_SERVER_ERROR,message:'Failed to signup'}
    }
  },

  generateToken: (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '12h' });
  },
};

export default AuthService;