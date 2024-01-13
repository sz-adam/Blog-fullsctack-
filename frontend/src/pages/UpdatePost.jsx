import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import PostService from "../services/PostsServices";
import CategoryService from "../services/CategoryServices";
import { useNavigate, useParams } from "react-router-dom";
import { getAccessToken } from "../common/utils";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineSubtitles } from "react-icons/md";


function UpdatePost() {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [post, setPost] = useState("");
  const { postId } = useParams();
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const navigate = useNavigate();
  const access_token = getAccessToken();


useEffect(() => {
  const fetchData = async () => {
    try {
      // Check if there is an access_token / Ellenőrizze, hogy létezik-e access_token
      if (access_token,postId) {
        // Fetch post details based on postId / Lekérje a bejegyzés részleteit postId alapján
        const postDetails = await PostService.singlePosts(
          access_token,
          postId
        );
        // Set the post state with the fetched post details / Állítsa be a post state-t a lekért bejegyzés részleteivel
        setPost(postDetails);
        // Set the postTitle state with the category title of the post / Állítsa be a postTitle state-t a bejegyzés kategóriájának címével
        setPostTitle(postDetails?.category?.title);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
      // Handle error if fetching post details fails / Kezelje a hibát, ha a bejegyzés részleteinek lekérése nem sikerül
    }
  };
  fetchData();
}, [access_token, postId]);

const handleUpdatePost = async (event) => {
  event.preventDefault();
  try {
    // Check if there is an access_token / Ellenőrizze, hogy létezik-e access_token
    if (access_token) {
      // Update the category on the server / Frissítse a kategóriát a szerveren
      const updatedCategory = await CategoryService.updateCategoryById(
        access_token,
        post.category, // Use the identifier of the post's category / Használja a bejegyzés kategóriájának azonosítóját
        { title: categoryTitle } // Send the new title / Küldje el az új címet
      );
      // Prepare the updated post data / Készítse elő a frissített bejegyzés adatait
      const updatedPostData = {
        title: postTitle,
        description,
        photo,
        category: updatedCategory,
      };
      // Send the updated post data to the server for updating the post / Küldje el a frissített bejegyzés adatait a szervernek a bejegyzés frissítéséhez
      await PostService.updatePost(access_token, postId, updatedPostData);
      // Navigate to the home page after a successful update / Navigáljon a kezdőoldalra sikeres frissítés után
      navigate("/");
    }
  } catch (error) {
    console.error("Error updating category or post:", error);
    // Handle error if updating category or post fails / Kezelje a hibát, ha a kategória vagy a bejegyzés frissítése nem sikerül
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
          icon={MdOutlineSubtitles}
        
          defaultValue={postTitle}
          onChange={(event) => setPostTitle(event.target.value)}
          required={true}
        />
        <InputBox
          type="text"
          placeholder="description"
          icon={TbFileDescription}
          defaultValuee={description}
          onChange={(event) => setDescription(event.target.value)}
          required={true}
        />
        <InputBox
          type="text"
          placeholder="Category"
          icon={BiCategory}
          defaultValue={categoryTitle}
          onChange={(event) => setCategoryTitle(event.target.value)}
        />
        <InputBox
          type="text"
          placeholder="Photo"
          icon={MdOutlineAddAPhoto}
          defaultValue={photo}
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
