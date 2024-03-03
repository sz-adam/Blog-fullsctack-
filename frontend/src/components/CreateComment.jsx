import React from "react";
import InputBox from "./InputBox";
import { TfiWrite } from "react-icons/tfi";
import AnimatedMotion from "../common/AnimatedMotion";


function CreateComment({ fetchCreateComment, comment,setComment }) {
  

  return (
    <div className="flex w-full justify-center items-center" >
      <form onSubmit={fetchCreateComment } className="xl:flex  justify-center items-center ">
        <InputBox
          type="text"
          icon={TfiWrite}
          placeholder="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
           <AnimatedMotion animationName="buttonAnimation">
        <button
          type="submit"
          className="editText focus:ring focus:ring-green-500 bg-green-400 text-white text-lg mx-10"
        >
          Add Comment
        </button>        
        </AnimatedMotion>
      </form>
    </div>
  );
}

export default CreateComment;
