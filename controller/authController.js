import { render } from 'ejs';
import logger from '../logger.js';
import AuthService from '../service/authService.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

const AuthController = {

	loginUser: async (req, res) => {
		try {
			const login = await AuthService.loginUser(req.body);
			console.log(login)
			if (login.status !== HTTP_STATUS.OK) {
				req.flash('error', login.message);
				return res.render('login', { messages: login });
			}
			req.flash('success', login.message);
			// res.render('login', { messages: req.flash() });
			//store cookie jwt
			const token = login.token;
			res.cookie('token', token, { expiresIn: '12h', httpOnly: true })
			res.redirect('/');
	
			// return res.status(HTTP_STATUS.OK).json(login);
			
		} catch (error) {
			logger.error(error);
			req.flash('error', error.message);
			return res.render('login', { messages: req.flash() });
			// return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
		}
	},
	signupUser: async (req, res) => {
		try {
			const signup = await AuthService.signupUser(req.body);
			if (signup.status !== HTTP_STATUS.CREATED) {
				req.flash('error', signup.message);
				return res.render('signup', { messages: req.flash() });
			}
			req.flash('success', signup.message);
			return res.render('login',{messages: req.flash()});
		} catch (error) {
			logger.error(error);
			req.flash('error', error.message);
			return res.render('signup', { messages: req.flash() });
			// return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
		}
	},
	login: (req, res) => {
		try {
			return res.render('login');
			
		} catch (error) {
			logger.error(error);
			return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
		}
	},
	signup: (req, res) => {
		try {
			return res.render('signup');
		} catch (error) {
			logger.error(error);
			return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
		}
	}
}

export default AuthController;