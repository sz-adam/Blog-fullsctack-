// CategoryService.js

import axios from "axios";

const CategoryService = {
  createCategory: async (access_token, categoryData) => {
    try {
      if (access_token) {
        const response = await axios.post(
          import.meta.env.VITE_API_CREATE_CATEGORIES, 
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data.data;
      }
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  updateCategoryById: async (access_token, categoryId, updatedData) => {
    try {
      if (access_token) {
        const response = await axios.put(
          import.meta.env.VITE_API_UPDATE_CATEGORIES + `/${categoryId}`,
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
      console.error("Error updating category by ID:", error);
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

  allCategory: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_ALL_CATEGORIES);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
};

export default CategoryService;
