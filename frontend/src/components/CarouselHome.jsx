import { useContext, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { AuthUserContext } from "../context/AuthUserContext";
import { Link } from "react-router-dom";

function CarouselHome({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { authUser } = useContext(AuthUserContext);
  const filteredPosts = posts.filter((post) => post?.likesCount > 0);
  const sortedCarouselPosts = filteredPosts.sort((a, b) => b.likesCount - a.likesCount);
  const slicedCarouselPosts = sortedCarouselPosts.slice(0, 3);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slicedCarouselPosts.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slicedCarouselPosts.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex,slicedCarouselPosts.length]);




  return (
    <div className="max-w-full h-[580px] w-full m-auto pb-10 px-4 relative group mt-2">
      {slicedCarouselPosts.map((post, index) => (
        <div
          key={index}
          className={`w-full h-full rounded-2xl bg-center bg-cover duration-500 relative ${
            index === currentIndex ? "" : "hidden"
          }`}
        >
          <img
            src={post.photo}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="flex">
            <p className="absolute rounded-b-2xl bottom-0 w-full bg-white opacity-75 p-3 font-bold text-xl ">
              {post?.title}
            </p>
            {authUser?.status === "success" && (
              <Link
                to={`/post/${post.id}`}
                className="btn-dark px-10 absolute bottom-1 right-2"
              >
                View
              </Link>
            )}
          </div>
        </div>
      ))}
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
}

export default CarouselHome;
