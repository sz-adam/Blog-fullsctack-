import axios from "axios";

const AuthService = {
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
};

export default AuthService;
