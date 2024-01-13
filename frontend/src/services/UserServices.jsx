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
        const response = await axios.get(import.meta.env.VITE_API_PROFILE, {
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

  allUser: async (access_token) => {
    try {
      if (access_token) {
        const response = await axios.get(import.meta.env.VITE_API_ALL_USER, {
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

  followUser: async (access_token, filteredUserId) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_FOLLOW_USER}${filteredUserId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },

  unfollowUser: async (access_token, filteredUserId) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_UNFOLLOW_USER}${filteredUserId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },

  blockUser: async (access_token, filteredUserId) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BLOCKED_USER}${filteredUserId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },

  unBlockUser: async (access_token, filteredUserId) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_UNBLOCKED_USER}${filteredUserId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },
  profileViewrs: async (access_token, viewUser) => {
    try {
      if (access_token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PROFILE_VIEWRS}${viewUser}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },

  userUpdateProfile: async (access_token, userData) => {
    try {
      if (access_token) {
        const response = await axios.put(
          import.meta.env.VITE_API_PROFILE_SETTINGS,
          userData, // új adatokat a felhasználói profil frissítéséhez
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  userUpdatePassword: async (access_token, userData) => {
    try {
      if (access_token) {
        const response = await axios.put(
          import.meta.env.VITE_API_PROFILE_PASSWORD_SETTINGS,
          userData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  deleteUser: async (access_token) => {
    try {
      if (access_token) {
        const response = await axios.delete(
          import.meta.env.VITE_API_DELETE_PROFILE,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
        throw error;
    }
  },


  followersArray: async (access_token) => {
    try {
      if (access_token) {
        const response = await axios.get(
          import.meta.env.VITE_API_FOLLOWERS_ARRAY,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },

  blocksArray: async (access_token) => {
    try {
      if (access_token) {
        const response = await axios.get(
          import.meta.env.VITE_API_USER_BLOCKED_ARRAY,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },
  profilePhotoUpdate: async (access_token,userData) => {
    try {
      if (access_token) {
        const response = await axios.put(
          import.meta.env.VITE_API_PROFILE_PHOTO_UPDATE,
          userData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error Following User:", error);
      throw error;
    }
  },

  
};

export default UserService;
