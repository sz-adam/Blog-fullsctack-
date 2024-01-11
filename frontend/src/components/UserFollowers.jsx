import React, { useEffect } from 'react'
import { getAccessToken } from '../common/utils';
import UserService from '../services/UserServices';

function UserFollowers() {

  const access_token = getAccessToken();

  useEffect(() => {
    const followUserData = async () => {
      try {
        if (access_token) {
          const followuser = await UserService.followersArray(access_token);
          console.log(followuser);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    followUserData();
  }, [access_token]);

  return (
    <div>UserFollowers</div>
  )
}

export default UserFollowers