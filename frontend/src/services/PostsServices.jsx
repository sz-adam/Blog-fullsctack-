import axios from "axios";

const PostService = {
  createPost: async (access_token, postData) => {
    try {
      if (access_token) {
        const response = await axios.post(
          import.meta.env.VITE_API_CREATE_POSTS,
          postData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  getAllPosts: async (access_token) => {
    try {
      if (access_token) {
        const response = await axios.get(import.meta.env.VITE_API_ALLPOSTS, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        return response.data.data;
      } else {
        const response = await axios.get(import.meta.env.VITE_API_NOLOGINPOSTS);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  singlePosts: async (access_token, postId) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SINGLE_POSTS}/${postId}`,
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

  updatePost: async (access_token, postId, updatedData) => {
    try {
      if (access_token) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_UPDATE_POSTS}/${postId}`,
          updatedData, // Új adatokat küldjük el a szervernek
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  },
};

export default PostService;
