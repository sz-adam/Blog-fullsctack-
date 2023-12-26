import React, { useState } from "react";
import InputBox from "../components/InputBox";

function WritePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  return (
    <div className="flex justify-center items-center text-center" >
      <form className="w-2/3 ">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text my-10">Write Post</h1>
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
          required={true}
        />
        <InputBox
          type="text"
          placeholder="Photo"
          value={photo}
          onChange={(event) => setPhoto(event.target.value)}
          required={true}
        />

        <button type="submit" className="btn-dark">Sending</button>
      </form>
    </div>
  );
}

export default WritePost;
