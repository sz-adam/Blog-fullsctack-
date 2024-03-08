import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
import AnimatedMotion from "../common/AnimatedMotion";
import MessageService from "../services/MessageServices";

function AdminBlockButton({ user, setFullUser, buttonStyle,messageID }) {
  const access_token = getAccessToken();
  
  const handleAdminUserBlockUnblock = async (blockedUserId, isBlocked) => {
    try {
      if (access_token && blockedUserId) {
        
        if (isBlocked) {
          await MessageService.deleteMessage(access_token, messageID);
          await UserService.adminUnBlockUser(access_token, blockedUserId);
        
        } else {
          await UserService.adminBlockUser(access_token, blockedUserId);
        }

        setFullUser((prevUsers) =>
          prevUsers.map((user) =>
            user.id === blockedUserId
              ? { ...user, isBlocked: !isBlocked }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <AnimatedMotion
      animationName="buttonAnimation"
      className={`px-4 py-3 text-sm cursor-pointer ${buttonStyle}`}
      onClick={() => handleAdminUserBlockUnblock(user?.id, user?.isBlocked)}
    >
      {user?.isBlocked ? "Unblock" : "Block"}
    </AnimatedMotion>
  );
}

export default AdminBlockButton;
