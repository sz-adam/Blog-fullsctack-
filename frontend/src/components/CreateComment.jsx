import React from "react";
import InputBox from "./InputBox";
import { TfiWrite } from "react-icons/tfi";


function CreateComment({ fetchCreateComment, comment,setComment }) {
  

  return (
    <div className="flex w-full justify-center items-center" >
      <form onSubmit={fetchCreateComment }>
        <InputBox
          type="text"
          icon={TfiWrite}
          placeholder="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button
          type="submit"
          className="editText focus:ring focus:ring-green-500 bg-green-400 text-white text-lg "
        >
          Add Comment
        </button>        
      </form>
    </div>
  );
}

export default CreateComment;
