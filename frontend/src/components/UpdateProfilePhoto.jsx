import React, { useContext, useState } from "react";
import InputBox from "./InputBox";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { getAccessToken } from "../common/utils";
import UserService from "../services/UserServices";
import AnimatedMotion from "../common/AnimatedMotion";

function UpdateProfilePhoto({ setUpdateProfilePhotos }) {
  const [newPhoto, setNewPhoto] = useState("");
  const { user, setUser } = useContext(UserContext);
  const access_token = getAccessToken();  

  const profilePhotoUpdate = async (event) => {
    event.preventDefault();
    try {
      if (access_token) {
        await UserService.profilePhotoUpdate(access_token, {
          profilePhoto: newPhoto,
        });
        const updatedUser = await UserService.userProfile(access_token);
        setUser(updatedUser);

        setUpdateProfilePhotos(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <AnimatedMotion animationName="pageAnimation">

    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full md:w-1/2"
        onSubmit={profilePhotoUpdate}
      >
        <p className="text-center text-2xl mb-10 font-medium">
          Profile photo update
        </p>
        <InputBox
          type="text"
          icon={MdOutlineAddAPhoto}
          placeholder="Photo Url"
          value={newPhoto}
          onChange={(event) => setNewPhoto(event.target.value)}
          required={true}
         
        />
        <div className="flex justify-evenly mt-4">
        <AnimatedMotion animationName="buttonAnimation">
          <button
            type="submit"
            className="editText focus:ring focus:ring-green-500 bg-green-400 text-white text-lg"
          >
            Save
          </button>
          </AnimatedMotion>
          <AnimatedMotion animationName="buttonAnimation">
          <button
            type="button"
            onClick={() => setUpdateProfilePhotos(false)}
            className="editText focus:ring focus:ring-red-500 bg-red-400 text-white text-lg"
          >
            Close
          </button>
          </AnimatedMotion>
        </div>
      </form>
    </div>
    </AnimatedMotion>
  );
}

export default UpdateProfilePhoto;
