import React, { useState } from 'react';
import CommentServices from '../services/CommentServices';
import { AiTwotoneDelete } from "react-icons/ai";
import { getAccessToken } from '../common/utils';

function DeleteComment({ postId, comment, postData, setPostData }) {
  const access_token = getAccessToken();
  const commentId = comment?._id;


  const [deleting, setDeleting] = useState(false);

  const deleteComment = async (commentId) => {
    try {
      if (access_token) {
        // Kezdd el a törlési folyamatot
        setDeleting(true);

        // Komment törlése a szolgáltatásban
        await CommentServices.deleteComment(access_token, commentId);
        console.log("Comment deleted successfully", commentId);

        // Frissítsd a Post objektumot
        if (postData) {
          // Távolítsuk el az adott komment id-t a comments tömbből
          const updatedComments = postData.comments?.filter(
            (commentIdInArray) => commentIdInArray !== commentId
          );

          // Log a frissítés előtt és után
          console.log("Before update:", postData.comments);
          console.log("After update:", updatedComments);

        
          // Frissítsd a Post objektumot is, ne csak a comments tömböt
          setPostData((prevPostData) => ({
            ...prevPostData,
            comments: updatedComments, // Itt állítsd be az új kommenteket
            // ...other properties
          }));
        }
        // Oldal újratöltése
    
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      // Végezd el a törlési folyamatot
      setDeleting(false);
    }
  };

  return (
    <div onClick={() => {
      // Ne indítsd el a törlést, ha már zajlik egy másik törlési folyamat
      if (!deleting) {
        deleteComment(commentId);
      }
    }}>
      {deleting ? 'Deleting...' : 'Delete Comment'}
    </div>
  );
}

export default DeleteComment;
