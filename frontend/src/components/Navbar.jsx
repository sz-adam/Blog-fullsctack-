import { Link } from "react-router-dom";
import UserNavigationMenu from "./UserNavigationMenu";
import { getAccessToken } from "../common/utils";
import PostSearch from "./PostSearch";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function Navbar({ searchPost, setSearchPost, darkMode, setDarkMode }) {
  const access_token = getAccessToken();
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Ha igaz,  sötét módot
    if (user?.darkMode) {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      // Ha  hamis, visszaváltunk
      setDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, [user?.darkMode]);

  return (
    <div className="navbar justify-between p-4 bg-DeepGray text-TextWhite font-semibold">
      <div>
        <Link to="/">
          <p className="text-xl md:text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text">
            MERN Blogs
          </p>
        </Link>
      </div>
      {access_token ? (
        <div className="flex items-center">
          <div className="pr-4">
            <PostSearch searchPost={searchPost} setSearchPost={setSearchPost} />
          </div>
          <Link to="/write" className="mr-10 hover:text-blue-500">
            {" "}
            Write{" "}
          </Link>
          <UserNavigationMenu darkMode={darkMode} setDarkMode={setDarkMode} setSearchPost={setSearchPost}/>
        </div>
      ) : (
        <div className="flex space-x-4 items-center">
          <Link to="/login" className="btn-dark">
            Login
          </Link>
          <Link to="/register" className="btn-white hover:text-black">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
