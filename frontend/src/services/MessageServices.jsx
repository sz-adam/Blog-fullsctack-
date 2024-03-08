import axios from "axios";

const MessageService = {
  createAdminMessage: async (access_token, messageData) => {
    try {
      if (access_token) {
        const response = await axios.post(
          import.meta.env.VITE_API_MESSAGE_ADMIN_CREATE,
          messageData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  singleAdminMessage: async (access_token, adminMessageId) => {
    try {
      if (access_token) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_SINGLE_ADMIN_MESSAGE}${adminMessageId}`,null,
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

  deleteMessage: async (access_token, messageID) => {
    try {
      if (access_token) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_DELETE_ADMIN_MESSAGE}${messageID}`,
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
};

export default MessageService;
