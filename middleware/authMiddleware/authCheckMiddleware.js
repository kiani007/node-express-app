import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../../utils/httpStatus.js';

const authCheckMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    //clear cookie
    res.clearCookie('token');
    //redirect to login
    res.redirect('auth/login');
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        res.clearCookie('token');
        res.redirect('auth/login');
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

export default authCheckMiddleware;