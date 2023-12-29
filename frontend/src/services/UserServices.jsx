import axios from "axios";

const UserService = {
  register: async function (firstname, lastname, email, password) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_REGISTER,
        { firstname, lastname, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data.message || "Registration failed";
    }
  },

  login: async function (email, password) {
    try {
      const response = await axios.post(import.meta.env.VITE_API_LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data.message || "Login failed";
    }
  },

  userProfile: async (access_token) => {
    try {
      if (access_token) {
        const response = await axios.get(
          import.meta.env.VITE_API_PROFILE,
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

export default UserService;
