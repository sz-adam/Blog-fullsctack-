import React, { useEffect, useState } from "react";
import CategoryService from "../services/CategoryServices";

function AllCategory() {
  const [allCategory, setAllCategory] = useState([]);
  console.log(allCategory);
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
    <div>
      <ul>
        {allCategory.map((category) => (
          <li key={category._id}>
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCategory;
