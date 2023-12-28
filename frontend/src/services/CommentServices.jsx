import axios from "axios";

const CommentServices = {
  createComment: async (access_token, commentData) => {
    try {
      if (access_token) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_CREATE_COMMENT}/${commentData.postId}`,
          { description: commentData.description },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },
  

  allpostComment: async (access_token, postId) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_POST_COMMENT}/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  updateComments: async (access_token, editedCommentId, updatedData) => {
    try {
      if (access_token) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_UPDATE_COMMENT}/${editedCommentId}`,
          updatedData, 
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error updating comment by ID:", error);
      throw error;
    }
},

  singleCategory: async (access_token, categoryId) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SINGLE_CATEGORIES}/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  deleteCategory: async (access_token, categoryId) => {
    try {
      if (access_token) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_DELETE_CATEGORIES}/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        return response.data.data;
      }
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default CommentServices;
