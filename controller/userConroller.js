import UserService from "../service/userService.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";

const UserController = {

  getAllUser: async (req, res) => {
    try {
    const users = await UserService.getAllUser();
		return res.status(HTTP_STATUS.OK).json(users);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(`Error fetching users: ${error.message}`);
    }
  },
  
  getAllPost: async (req, res) => {
    try {
      const post = await UserService.getAllPost();
      return res.status(HTTP_STATUS.OK).json(post);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(`Error fetching posts: ${error.message}`);
    } 
  },
  
  getPost: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(typeof id);
      if (!id) {
        throw new Error('Post ID is required');
      }
      const post = await UserService.getPostById(Number(id));
      console.log(post);
      // res.render('posts', { post });
      return res.status(HTTP_STATUS.OK).json(post);
    } catch (error) {
      res.status(400).send(`Error fetching post: ${error.message}`);
    }
  },
  
  createPost: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { title, content } = req.body;
      if (!userId || !title || !content) {
        throw new Error('User ID, title, and content are required');
      }
      await UserService.createPost({authorId: userId, title, content});
    } catch (error) {
      return res.status(400).send(`Error creating post: ${error.message}`);
    }
  },
  
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Post ID is required');
      }
      const delelted = await UserService.deletePost(Number(id));
      return res.status(200).json(delelted);
    } catch (error) {
      res.status(400).send(`Error deleting post: ${error.message}`);
    }
  },
  
  softDeletePost: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        throw new Error('Post ID is required');
      }
      const delelted = await UserService.softDeletePost(id, true);
      return res.status(200).json(delelted);
    } catch (error) {
      res.status(400).send(`Error soft deleting post: ${error.message}`);
    }
  },
  
  updatePost: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const { title, content } = req.body;
      
     
      if (!title || !content || !userId || !id) {
        throw new Error('Post ID, title, and content are required');
      }
      const post = await UserService.updatePost(Number(userId), Number(id), title, content);
      console.log(post);
      return res.status(200).json(post);
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).send(`Error updating post: ${error.message}`);
    }
  },
  
  restorePost: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        throw new Error('Post ID is required');
      }
      await UserService.restorePost(id);
      res.redirect('/posts');
    } catch (error) {
      res.status(400).send(`Error restoring post: ${error.message}`);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('token');
      res.redirect('/login');
    } catch (error) {
      return res.status(400).json(`Error logging out: ${error.message}`);  
    }
  }
};

export default UserController;