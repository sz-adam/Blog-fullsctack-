import { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { AuthUserContext } from "../context/AuthUserContext";
import AnimatedMotion from "../common/AnimatedMotion";

function postCard({ post }) {
  const { authUser } = useContext(AuthUserContext);

  return (
    <>
      <div className="p-1 w-full md:w-3/4 mx-auto my-auto mb-10">
        <div className="h-full border-4 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
          <img
            className="h-64 md:h-64 w-full object-cover object-center"
            src={post.photo}
            alt="blog"
          />
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                CATEGORY: {post?.category?.title}
              </h2>

              <div className="flex flex-col-reverse items-center justify-center">
                <div className="tracking-widest text-xs title-font font-medium text-gray-400  mt-2">
                <p> {post?.user?.fullname}</p>
                </div>
                {authUser?.status === "success" ? (
                  <Link to={`/profile/${post?.user?.id}`}>
                    <img
                      src={post?.user?.profilePhoto}
                      alt={post?.user?.fullname}
                      className="w-8 h-8 rounded-full "
                    />
                  </Link>
                ) : (
                  <Link to="/">
                    <img
                      src={post?.user?.profilePhoto}
                      alt={post?.user?.fullname}
                      className="w-8 h-8 rounded-full "
                    />
                  </Link>
                )}
              </div>
            </div>

            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {post.title}
            </h1>

            <div className="flex items-center flex-wrap py-3">
              {authUser?.status === "success" && (
                 <AnimatedMotion animationName="buttonAnimation">
                <Link to={`/post/${post.id}`} className="btn-dark px-10">
                  View
                </Link>
                </AnimatedMotion>
              )}
              <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none  pr-3 border-r-2 border-gray-200">
                <FaEye />
                <p className="ml-1">{post.viewsCount}</p>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none  border-r-2 border-gray-200 mr-3 py-1 pr-3">
                <AiOutlineLike />
                <p className="ml-1">{post.likesCount}</p>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none  border-r-2 border-gray-200 mr-3 py-1 pr-3">
                <AiOutlineDislike />
                <p className="ml-1">{post.disLikesCount}</p>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none  ">
                <FaComment />
                <p className="ml-1">{post.comments.length}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default postCard;
