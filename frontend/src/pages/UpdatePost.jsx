import React, { useContext, useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import PostService from "../services/PostsServices";
import CategoryService from "../services/CategoryServices";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

function UpdatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;
  const { postId } = useParams();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if there is an access_token
        if (access_token) {
          // Fetch post details based on postId
          const postDetails = await PostService.singlePosts(
            access_token,
            postId
          );
          setPost(postDetails);
          // Set the title state with the category title of the post
          setTitle(postDetails?.category?.title);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchData();
  }, [access_token, postId]);
//categoria frissítés
  const handleUpdatePosts = async (event) => {
    event.preventDefault();
    try {
      if (access_token) {
        // Send the category update request to the server
        const updatedCategory = await CategoryService.updateCategoryById(
          access_token,
          post.category, // Use the identifier of the post's category
          { title } // Send the new title
        );
        console.log("Updated category:", updatedCategory);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };


  const handleUpdatePost = async (event) => {
    event.preventDefault();
    try {
      if (access_token) {
        // Elküldjük a poszt frissítési kérését a szervernek
        await PostService.updatePost(
          access_token,
          postId,
          {
            title,
            description,
            photo,
           // category,
          }
        );
        console.log("Post updated successfully!");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="flex justify-center items-center text-center">
      <form className="w-2/3" onSubmit={handleUpdatePost}>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text my-10">
          Update Post
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
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
