import { Link } from "react-router-dom";

function ProfilePostCard({ userCard }) {
  console.log(userCard);
 
  return (
    <div className="flex flex-wrap p-5">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg h-60 w-60" src={userCard.photo} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              {userCard?.title}
            </h5>
          </a>

          <Link
            to={`/post/${userCard.id}`}
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
