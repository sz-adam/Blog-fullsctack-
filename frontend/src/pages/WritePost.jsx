import React, { useContext, useState } from "react";
import InputBox from "../components/InputBox";
import PostService from "../services/PostsServices";
import CategoryService from "../services/CategoryServices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../common/utils";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineSubtitles } from "react-icons/md";
import UserService from "../services/UserServices";
import { UserContext } from "../context/UserContext";
import { Toaster, toast } from "react-hot-toast";
import AnimatedMotion from "../common/AnimatedMotion";

function WritePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const access_token = getAccessToken();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handlePostCreate = async (event) => {
    event.preventDefault();
    try {
      // creating a category
      const categoryData = await CategoryService.createCategory(access_token, {
        title: category,
      });
      // category contains the data
      if (categoryData) {
        // create an entry
        await PostService.createPost(access_token, {
          title,
          description,
          category: categoryData,
          photo,
        });
        const userData = await UserService.userProfile(access_token);
        setUser(userData);
        toast.success("You have successfully created a post!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error("Admin has blocked the user, you cannot create a post!");
    }
  };

  return (
    <>
      <AnimatedMotion animationName="pageAnimation">
        <p className="text-gray-800 m-5 hover:text-gray-500">
          <Link to="/" className="flex items-center">
            <FaArrowLeft className="mr-1 " />
          </Link>
        </p>
        <div className="flex justify-center items-center text-center">
          <Toaster />
          <form className="w-2/3" onSubmit={handlePostCreate}>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text my-10">
              Write Post
            </h1>
            <InputBox
              type="text"
              icon={MdOutlineSubtitles}
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required={true}
            />
            <InputBox
              type="text"
              icon={TbFileDescription}
              placeholder="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required={true}
            />
            <InputBox
              type="text"
              icon={BiCategory}
              placeholder="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
            <InputBox
              type="text"
              icon={MdOutlineAddAPhoto}
              placeholder="Photo"
              value={photo}
              onChange={(event) => setPhoto(event.target.value)}
              required={true}
            />
            <AnimatedMotion animationName="buttonAnimation">
              <button type="submit" className="btn-dark">
                Sending
              </button>
            </AnimatedMotion>
          </form>
        </div>
      </AnimatedMotion>
    </>
  );
}

export default WritePost;
