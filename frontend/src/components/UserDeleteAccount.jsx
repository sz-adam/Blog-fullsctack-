import { useContext } from "react";
import UserService from "../services/UserServices";
import { AuthUserContext } from "../context/AuthUserContext";
import { getAccessToken } from "../common/utils";
import { useNavigate } from "react-router-dom";
import { removeFormSession } from "../common/session";
import AnimatedMotion from "../common/AnimatedMotion";

function UserDeleteAccount() {
  const { setAuthUser } = useContext(AuthUserContext);
  const access_token = getAccessToken();
  const navigate = useNavigate();
  //deleteProfil
  const handleProfileDelete = async () => {
    try {
      if (access_token) {
        await UserService.deleteUser(access_token);
        removeFormSession("user");
        setAuthUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <AnimatedMotion animationName="pageAnimation">

    <div className="flex justify-center items-center w-full h-full md:h-[85vh] text-center">
      <div>
        <h1 className="text-2xl font-semibold mb-6">
          Are you sure you want to delete the registration?
        </h1>
        <AnimatedMotion animationName="buttonAnimation">
        <button
          className="bg-red-500 py-2 px-10 text-white font-semibold text-xl rounded-full hover:bg-red-800"
          onClick={handleProfileDelete}
        >
          Yes
        </button>
        </AnimatedMotion>
      </div>
    </div>
    </AnimatedMotion>
  );
}

export default UserDeleteAccount;
