import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/PostsServices";
import CategoryService from "../services/CategoryServices";
import { getAccessToken } from "../common/utils";
import { UserContext } from "../context/UserContext";
import UserService from "../services/UserServices";
import { Toaster, toast } from "react-hot-toast";

const DeleteModal = ({ setDeleteModal, postId }) => {
  const [post, setPost] = useState(null);
  const [category, setCategory] = useState(null);
  const access_token = getAccessToken();
  const { user, setUser } = useContext(UserContext);

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
        const updatedUser = await UserService.userProfile(access_token);
        setUser(updatedUser);
        toast.success("You have successfully deleted the post !");
        setTimeout(() => {
          navigate("/");
        }, 1500);
       // window.location.reload(true);
      }
    } catch (error) {
      console.error("Hiba a törlés közben:", error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <Toaster />
        <div className="relative w-96 mx-auto max-w-full">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h2 className="text-3xl font-semibold">Delete post</h2>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setDeleteModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Are you sure you want to delete this post?
              </p>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="editText focus:ring focus:ring-red-500 bg-red-400 text-white text-lg"
                type="button"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="editText focus:ring focus:ring-green-500 bg-green-400 text-white text-lg"
                type="button"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default DeleteModal;
