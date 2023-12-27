import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useParams,  useNavigate } from "react-router-dom";
import PostService from "../services/PostsServices";

function DeletePost() {
  const [post, setPost] = useState(null);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;
  const { postId } = useParams();
  const navigate = useNavigate();

  // Log mindkét azonosítót a konzolra
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ellenőrizzük, van-e access_token
        if (access_token) {
          // Lekérjük a poszt részleteit a postId alapján
          const postDetails = await PostService.singlePosts(access_token, postId);
          setPost(postDetails);

          // Ellenőrizzük, hogy a postDetails objektumban található id egyezik-e a postId-vel
          if (postDetails && postDetails.id === postId) {
            console.log("A postId megegyezik a postDetails objektum id-jével!");
            console.log("postId:", postId);
            console.log("postDetails.id:", postDetails.id);
          }
        }
      } catch (error) {
        console.error("Hiba a poszt részleteinek lekérésekor:", error);
      }
    };
    fetchData();
  }, [access_token, postId]);

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

  return (
    <div>
      <h2>Poszt Törlése</h2>
      {post && (
        <div>
          <p>Cím: {post.title}</p>
          <p>Tartalom: {post.content}</p>
        </div>
      )}
      <button onClick={handleDelete}>Törlés</button>
    </div>
  );
}

export default DeletePost;
