import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import AnimatedMotion from "../common/AnimatedMotion";

function ProfilePostCard({ userCard }) {
  const percentageNumber = parseFloat(userCard?.likesPercentage).toFixed(0);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <div>
      <div className="w-72 bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg m-10">
        <div className="flex items-center justify-between pb-2">
          <p className="text-yellow-50">{formatDate(userCard?.createdAt)}</p>
          <div>
            {userCard?.likesPercentage === "NaN%" ||
            userCard?.likesPercentage === "0%" ? (
              ""
            ) : (
              <div className="flex justify-end items-center">
                <FaHeart className="text-red-600 mr-2 animate-pulse" />
                <span className="text-white"> {percentageNumber} %</span>
              </div>
            )}
          </div>
        </div>
        <img className="rounded-2xl h-60 w-60" src={userCard?.photo} alt="" />

        <div className="p-5">
          <h5 className="text-white font-bold text-2xl tracking-wide text-center">
            {userCard?.title}
          </h5>

          <div className="flex justify-center items-center pt-5">
            <AnimatedMotion animationName="buttonAnimation">
              <Link to={`/post/${userCard?.id}`} className="btn-dark">
                View
              </Link>
            </AnimatedMotion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePostCard;
