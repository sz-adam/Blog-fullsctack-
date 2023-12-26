import React, { useContext, useState } from "react";
import InputBox from "../components/InputBox";
import PostService from "../services/PostsServices";
import { UserContext } from "../context/userContext";
import CategoryService from "../services/CategoryServices";

function WritePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const { user, setUser } = useContext(UserContext);
  const access_token = user?.data?.token;

  const handleCategoryCreate = async (event) => {
    event.preventDefault();
  
    try {
      const categoryData = await CategoryService.createCategory(access_token, {
        title: title
      });    
      setCategory(categoryData)      
      
    } catch (error) {
      console.log(error);
    }
  };






 const handlePostCreate = async (event) => {
  event.preventDefault();
  try {
    await PostService.createPost(access_token, {
      title,
      description,
     // category,
      photo,
    });
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="flex justify-center items-center text-center">
       <form onSubmit={handleCategoryCreate}>
      <label>
        Category Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <button type="submit">Create Category</button>
    </form>
{/**
      <form className="w-2/3" onSubmit={handlePostCreate}>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text my-10">
          Write Post
        </h1>
        <InputBox
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required={true}
        />
        <InputBox
          type="text"
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required={true}
        />
        <InputBox
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
       
        />
        <InputBox
          type="text"
          placeholder="Photo"
          value={photo}
          onChange={(event) => setPhoto(event.target.value)}
          required={true}
        />

        <button type="submit" className="btn-dark">
          Sending
        </button>
      </form>
       */}
    </div>
  );
}

export default WritePost;
