import React, { useEffect, useState } from "react";
import CategoryService from "../services/CategoryServices";

function AllCategory() {
  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCategories = await CategoryService.allCategory();
        setAllCategory(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex-col my-2">
      <p className="text-center">Categories</p>
      {allCategory.map((category) => (
        <div key={category._id} className="border p-2 px-12 m-2 rounded-full text-center font-bold bg-yellow-500">
          {category.title}
        </div>
      ))}
    </div>
  );
}

export default AllCategory;
