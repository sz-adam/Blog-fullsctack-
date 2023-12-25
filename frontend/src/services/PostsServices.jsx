import axios from "axios";

const PostService = {

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
        const response = await axios.get (`${import.meta.env.VITE_API_SINGLE_POSTS}/${postId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
};

export default PostService;
