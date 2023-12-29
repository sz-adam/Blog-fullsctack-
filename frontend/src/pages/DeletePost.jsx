import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostService from "../services/PostsServices";
import CategoryService from "../services/CategoryServices";
import { AuthUserContext } from "../context/AuthUserContext";

function DeletePost() {
  const [post, setPost] = useState(null);
  const [category, setCategory] = useState(null);
  const { authUser, setAuthUser } = useContext(AuthUserContext);
  const access_token = authUser?.data?.token;
  const { postId } = useParams();
  const navigate = useNavigate();
  const categoryId = post?.category;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ellenőrizzük, van-e access_token és categoryId
        if (access_token && categoryId) {
          // Lekérjük a kategória részleteit a categoryId alapján
          const categoryDetails = await CategoryService.singleCategory(
            access_token,
            categoryId
          );
          setCategory(categoryDetails);
        }
      } catch (error) {
        console.error("Hiba a kategória részleteinek lekérésekor:", error);
      }
    };
    fetchData();
  }, [access_token, categoryId]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ellenőrizzük, van-e access_token
        if (access_token) {
          // Lekérjük a poszt részleteit a postId alapján
          const postDetails = await PostService.singlePosts(
            access_token,
            postId
          );
          setPost(postDetails);
        }
      } catch (error) {
        console.error("Hiba a poszt részleteinek lekérésekor:", error);
      }
    };
    fetchData();
  }, [access_token, postId]);

  // categoria törlése
  const handleDeletePost = async () => {
    try {
      // Ellenőrizzük, van-e access_token, a post és a kategória elérhető-e, és az ID-k egyeznek-e
      if (
        access_token &&
        post &&
        category &&
        post.id === postId &&
        category._id === categoryId
      ) {
        // Hívjuk meg a service metódust a kategória törléséhez
        await CategoryService.deleteCategory(access_token, categoryId);
        // Hívjuk meg a service metódust a post törléséhez
        await PostService.deletePost(access_token, postId);
        // Sikeres törlés után átirányítjuk a felhasználót a "/posts" útvonalra
        navigate("/");
      }
    } catch (error) {
      console.error("Hiba a törlés közben:", error);
    }
  };

  return (
    <div>
      <h2>Poszt Törlése</h2>
      {post && (
        <div>
          <p>Cím: {post.title}</p>
          <p>Tartalom: {post.content}</p>
        </div>
      )}
      <button onClick={handleDeletePost}>Törlés</button>
    </div>
  );
}

export default DeletePost;
