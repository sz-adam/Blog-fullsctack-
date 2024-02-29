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
};

export default MessageService;
