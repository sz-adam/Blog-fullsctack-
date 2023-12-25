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
      console.log(error);
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
};

export default UserService;
