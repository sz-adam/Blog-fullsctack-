import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

function ProfilePostCard({ userCard }) {
  return (
    <div className="p-5">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg h-60 w-60" src={userCard?.photo} alt="" />

        <div className="p-5">
          <div className="flex justify-between">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              {userCard?.title}
            </h5>
            {userCard?.likesPercentage === "NaN%" ||
            userCard?.likesPercentage === "0%" ? (
              ""
            ) : (
              <div className="flex justify-end items-center">
                <FaHeart className="text-red-600 mr-2 animate-pulse" />
                {userCard?.likesPercentage}
              </div>
            )}
          </div>

          <Link
            to={`/post/${userCard?.id}`}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 mt-2 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePostCard;
