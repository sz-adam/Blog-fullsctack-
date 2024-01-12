import React, { useState } from "react";
import InputBox from "./InputBox";
import { MdOutlineAddAPhoto } from "react-icons/md";

function UpdateProfilePhoto({ setUpdateProfilePhotos }) {
  const [newPhoto, setNewPhoto] = useState("");

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form className="bg-white p-8 rounded shadow-md w-full md:w-1/2">
        <InputBox
          type="text"
          icon={MdOutlineAddAPhoto}
          placeholder="Photo Url"
          value={newPhoto}
          onChange={(event) => setNewPhoto(event.target.value)}
          required={true}
        />
        <div className="flex justify-evenly mt-4">
          <button type="submit" className="editText focus:ring focus:ring-green-500 bg-green-400 text-white text-lg">
            Save
          </button>
          <button
            type="button"
            onClick={() => setUpdateProfilePhotos(false)}
            className="editText focus:ring focus:ring-red-500 bg-red-400 text-white text-lg"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfilePhoto;
