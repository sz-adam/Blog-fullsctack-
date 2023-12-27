import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import PostService from "../services/PostsServices";
import CategoryService from "../services/CategoryServices";

function DeletePost() {
  const [post, setPost] = useState(null);
  const [category, setCategory] = useState(null);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;
  const { postId } = useParams();
  const navigate = useNavigate();
  console.log("Categoria id", post?.category);

  const categoryId = post?.category;
  console.log("Category id", categoryId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ellenőrizzük, van-e access_token
        if (access_token) {
          // Lekérjük a kategória részleteit a categoryId alapján
          const categoryDetails = await CategoryService.singleCategory(
            access_token,
            categoryId
          );
          setCategory(categoryDetails);
          console.log("Kategória részletei:", categoryDetails);
        }
      } catch (error) {
        console.error("Hiba a kategória részleteinek lekérésekor:", error);
      }
    };
    fetchData();
  }, [access_token, categoryId]);

  // categoria törlése
  const handleDeleteCategory = async () => {
    try {
      // Ellenőrizzük, van-e access_token, a post elérhető-e, és az ID-k egyeznek-e
      if (access_token && category && category._id === categoryId) {
        // Hívjuk meg a service metódust a poszt törléséhez
        await CategoryService.deleteCategory(access_token, categoryId);
        // Sikeres törlés után átirányítjuk a felhasználót a "/posts" útvonalra
        navigate("/");
      }
    } catch (error) {
      console.error("Hiba a poszt törlésekor:", error);
    }
  };

  // Log mindkét azonosítót a konzolra
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

          // Ellenőrizzük, hogy a postDetails objektumban található id egyezik-e a postId-vel
          if (postDetails && postDetails.id === postId) {
            // console.log("A postId megegyezik a postDetails objektum id-jével!");
            //console.log("postId:", postId);
            // console.log("postDetails.id:", postDetails.id);
          }
        }
      } catch (error) {
        console.error("Hiba a poszt részleteinek lekérésekor:", error);
      }
    };
    fetchData();
  }, [access_token, postId]);

  {
    /** 
  // Poszt törlése
  const handleDelete = async () => {
    try {
      // Ellenőrizzük, van-e access_token, a post elérhető-e, és az ID-k egyeznek-e
      if (access_token && post && post.id === postId) {
        // Hívjuk meg a service metódust a poszt törléséhez
        await PostService.deletePost(access_token, postId);
        // Sikeres törlés után átirányítjuk a felhasználót a "/posts" útvonalra
        navigate("/");
      }
    } catch (error) {
      console.error("Hiba a poszt törlésekor:", error);
    }
  };

  */
  }

  return (
    <div>
      <h2>Poszt Törlése</h2>
      {post && (
        <div>
          <p>Cím: {post.title}</p>
          <p>Tartalom: {post.content}</p>
        </div>
      )}
      <button onClick={handleDeleteCategory}>Törlés</button>
    </div>
  );
}

export default DeletePost;
