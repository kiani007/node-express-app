import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UserService = {
  getAllUser: async () => {
    try {
		const user = await prisma.user.findMany({
		  select: {
				id: true,
				name: true,
				email: true,
				posts: true,
			},
		});
		console.log(user);
      return user;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  getAllPost: async () => {
    try {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        }
        
      });
    
      return posts;
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  },

  getPostById: async (userId) => {
    try {
      const posts = await prisma.post.findMany({ where: { userId } });
      return posts;
    } catch (error) {
      throw new Error(`Error fetching posts by user ID: ${error.message}`);
    }
  },

  createPost: async (post) => {
    try {
      const newPost = await prisma.post.create({ data: post });
      return newPost;
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  },

  deletePost: async (id) => {
    try {
      await prisma.post.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  },

  softDeletePost: async (id, isDeleted) => {
    try {
      await prisma.post.update({
        where: { id },
        data: { isDeleted }
      });
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  },

  updatePost: async (id, post) => {
    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: post
      });
      return updatedPost;
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  },

  restorePost: async (id) => {
    try {
      await prisma.post.update({
        where: { id },
        data: { isDeleted: false }
      });
    } catch (error) {
      throw new Error(`Error restoring post: ${error.message}`);
    }
  }
};

export default UserService;