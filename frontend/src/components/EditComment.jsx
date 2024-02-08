import React from "react";
import InputBox from "./InputBox";

function EditComment({
  editedComment,
  setEditedComment,
  handleCommentUpdate,
  closeEditing,
}) {
    
  return (
    <div className="bg-white flex justify-center items-center mx-auto my-auto">
      <InputBox
        type="text"
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
       
      />
      <div className="flex justify-center items-center mr-5">
        <button
          onClick={handleCommentUpdate}
          className="editText focus:ring focus:ring-green-500 bg-green-400 text-white"
        >
          Save
        </button>
        <button onClick={closeEditing} className=" editText focus:ring focus:ring-red-500 bg-red-400 text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditComment;
