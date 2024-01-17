import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

function ProfilePostCard({ userCard }) {
  return (
    <div>
      <div className="w-72 bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg m-10">
        {userCard?.likesPercentage === "NaN%" ||
        userCard?.likesPercentage === "0%" ? (
          ""
        ) : (
          <div className="flex justify-end items-center pl-2 pb-2">
            <FaHeart className="text-red-600 mr-2 animate-pulse" />
            <span className="text-white"> {userCard?.likesPercentage}</span>
          </div>
        )}
        <img className="rounded-2xl h-60 w-60" src={userCard?.photo} alt="" />

        <div className="p-5">
      
            <h5 className="text-white font-bold text-2xl tracking-wide text-center">
              {userCard?.title}
            </h5>
        

          <div className="flex justify-center items-center pt-5">
            <Link
              to={`/post/${userCard?.id}`}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 mt-2 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePostCard;
