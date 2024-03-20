const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const { appErr, AppErr } = require("../../utils/appErr");
const Post = require("../../model/Post/Post");
const Category = require("../../model/Category/Category");
const Comment = require("../../model/Comment/Comment");
require("dotenv").config();

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

//Register
const userRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User already exist", 500));
    }
    if (!emailRegex.test(email)) {
      return next(appErr("Email is invalid"));
    }
    if (!passwordRegex.test(password)) {
      return next(
        appErr(
          "Password should be 6 to 20 character long with a numeric m lowercase and 1 uppercase constters"
        )
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//login
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //CHeck if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("Invalid login credentials"));
    }
    //verify password
    const isPasswordMatxhed = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordMatxhed) {
      return next(appErr("Invalid login credentials"));
    }

    userFound.lastLoginDate = new Date();
    await userFound.save();

    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
        profilePhoto: `${process.env.BACKEND_URL_PROFIEL_PHOTO}${userFound.profilePhoto}`,
      },
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//who view my profile
const whoViewedMyProfileCtrl = async (req, res, next) => {
  try {
    //1.Find the original
    const user = await User.findById(req.params.id);
    //2. Find the user who views the original user
    const userWhoViewed = await User.findById(req.userAuth);

    //3.CHeck is original and who viewd are found
    if (user && userWhoViewed) {
      //4.Check if userWhoViewed is already in the users viewes array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (isUserAlreadyViewed) {
        return next(appErr("You already viewed this profile"));
      } else {
        //5. Push the userWhoViewed to the user's viewers array
        user.viewers.push(userWhoViewed._id);
        //6. Save the user
        await user.save();
        res.json({
          status: "success",
          data: "You have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const followingCtrl = async (req, res, next) => {
  try {
    // 1. Find the user to follow
    const userToFollow = await User.findById(req.params.id);
    // 2. Find the user who is following
    const userWhoFollowed = await User.findById(req.userAuth);
    // 3. Check if user and userWhoFollowed are found
    if (userToFollow && userWhoFollowed) {
      // 4. Check if userWhoFollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToFollow.followers.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        // If userWhoFollowed is already in the followers array, remove the follow relationship
        userToFollow.followers = userToFollow.followers.filter(
          (follower) => follower.toString() !== userWhoFollowed._id.toString()
        );
        userWhoFollowed.following = userWhoFollowed.following.filter(
          (following) => following.toString() !== userToFollow._id.toString()
        );
        // Save the changes
        await userWhoFollowed.save();
        await userToFollow.save();
        res.json({
          status: "success",
          data: "You have unfollowed this user",
        });
      } else {
        // 5. Push userWhoFollowed to the user's followers array
        userToFollow.followers.push(userWhoFollowed._id);
        // 6. Push userToFollow to the userWhoFollowed's following array
        userWhoFollowed.following.push(userToFollow._id);

        // Save the changes
        await userWhoFollowed.save();
        await userToFollow.save();
        res.json({
          status: "success",
          data: "You have successfully followed this user",
        });
      }
    } else {
      // Handle case when user or userWhoFollowed is not found
      return next(appErr("User not found"));
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//unfollowing
const unfollowCtrl = async (req, res, next) => {
  try {
    //1. Find the user to unfolloW
    const userToBeUnfollowed = await User.findById(req.params.id);
    //2. Find the user who is unfollowing
    const userWhoUnFollowed = await User.findById(req.userAuth);
    //3. Check if user and userWhoUnFollowed are found
    if (userToBeUnfollowed && userWhoUnFollowed) {
      //4. Check if userWhoUnfollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
        (follower) => follower.toString() === userWhoUnFollowed._id.toString()
      );
      if (!isUserAlreadyFollowed) {
        return next(appErr("You have not followed this user"));
      } else {
        //5. Remove userWhoUnFollowed from the user's followers array
        userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
          (follower) => follower.toString() !== userWhoUnFollowed._id.toString()
        );
        //save the user
        await userToBeUnfollowed.save();
        //7. Remove userToBeInfollowed from the userWhoUnfollowed's following array
        userWhoUnFollowed.following = userWhoUnFollowed.following.filter(
          (following) =>
            following.toString() !== userToBeUnfollowed._id.toString()
        );

        //8. save the user
        await userWhoUnFollowed.save();
        res.json({
          status: "success",
          data: "You have successfully unfollowed this user",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//all
const usersCtrl = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//block
const blockUsersCtrl = async (req, res, next) => {
  try {
    //1. Find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);
    //2. Find the user who is blocking
    const userWhoBlocked = await User.findById(req.userAuth);
    //3. Check if userToBeBlocked and userWhoBlocked are found
    if (userWhoBlocked && userToBeBlocked) {
      //4. Check if userWhoBlocked is already in the user's blocked array
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appErr("You already blocked this user"));
      }
      //7. Push userTobBlocked to the userWhoBlocked's blocked array
      userWhoBlocked.blocked.push(userToBeBlocked._id);
      //8. save
      await userWhoBlocked.save();
      res.json({
        status: "success",
        data: "You have successfully blocked this user",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//unblock
const unBlockUsersCtrl = async (req, res, next) => {
  try {
    //1. find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params.id);
    //2. find the user who is unblocking
    const userWhoUnBlocked = await User.findById(req.userAuth);
    //3. check if userToBeUnBlocked and userWhoUnblocked are found
    if (userToBeUnBlocked && userWhoUnBlocked) {
      //4. Check if userToBeUnBlocked is already in the arrays's of userWhoUnBlocked
      const isUserAlreadyBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );
      if (!isUserAlreadyBlocked) {
        return next(appErr("You have not blocked this user"));
      }
      //Remove the userToBeUnblocked from the main user
      userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
        (blocked) => blocked.toString() !== userToBeUnBlocked._id.toString()
      );
      //Save
      await userWhoUnBlocked.save();
      res.json({
        status: "success",
        data: "You have successfully unblocked this user",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//admin-block
const adminBlockUserCtrl = async (req, res, next) => {
  try {
    //1. find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);
    //2. Check if user found
    if (!userToBeBlocked) {
      return next(appErr("User not Found"));
    }
    //Change the isBlocked to true
    userToBeBlocked.isBlocked = true;
    //4.save
    await userToBeBlocked.save();
    res.json({
      status: "success",
      data: "You have successfully blocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//admin-unblock
const adminUnblockUserCtrl = async (req, res, next) => {
  try {
    //1. find the user to be unblocked
    const userToBeunblocked = await User.findById(req.params.id);
    //2. Check if user found
    if (!userToBeunblocked) {
      return next(appErr("User not Found"));
    }
    //Change the isBlocked to false
    userToBeunblocked.isBlocked = false;
    //4.save
    await userToBeunblocked.save();
    res.json({
      status: "success",
      data: "You have successfully unblocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//profile
const userProfileCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//deleteUser
const deleteUserCtrl = async (req, res, next) => {
  try {
    //1. Find the user to be deleted
    const userTodelete = await User.findById(req.userAuth);
    //2. find all posts to be deleted
    await Post.deleteMany({ user: req.userAuth });
    //3. Delete all comments of the user
    await Comment.deleteMany({ user: req.userAuth });
    //4. Delete all category of the user
    await Category.deleteMany({ user: req.userAuth });
    //5. delete
    await userTodelete.deleteOne();
    //send response
    return res.json({
      status: "success",
      data: "Your account has been deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//update
const updateUserCtrl = async (req, res, next) => {
  const { email, lastname, firstname } = req.body;
  try {
    //check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("Email is taken", 400));
      }
    }

    //update user
    const user = await User.findByIdAndUpdate(
      req.userAuth,
      {
        lastname,
        firstname,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    //send response
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//update password
const updateUserpasswordCtrl = async (req, res, next) => {
  const { password } = req.body;
  try {
    //Check if user is updating the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //update user
      await User.findByIdAndUpdate(
        req.userAuth,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({
        status: "success",
        data: "Password has been changed successfully",
      });
    } else {
      return next(appErr("Please provide password field"));
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const userFollowingArrayCtrl = async (req, res, next) => {
  try {
    // 1. bejelentkezett felhasználót
    const loggedInUser = await User.findById(req.userAuth);
    // 2. Bejelentkezett felhasználó megtalálhatóe
    if (loggedInUser) {
      // 3. Követők id lekérése
      const followingIds = loggedInUser.following;
      // 4. id alapján a felhasználók lekérése
      const following = await User.find({ _id: { $in: followingIds } });

      // 5. követők mentése
      res.json({
        status: "success",
        data: following,
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const userFollowersgArrayCtrl = async (req, res, next) => {
  try {
    // 1. bejelentkezett felhasználót
    const loggedInUser = await User.findById(req.userAuth);
    // 2. Bejelentkezett felhasználó megtalálhatóe
    if (loggedInUser) {
      // 3. Követők id lekérése
      const followersIds = loggedInUser.followers;
      // 4. id alapján a felhasználók lekérése
      const follower = await User.find({ _id: { $in: followersIds } });

      // 5. követők mentése
      res.json({
        status: "success",
        data: follower,
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const userBlockedArrayCtrl = async (req, res, next) => {
  try {
    // 1. bejelentkezett felhasználót
    const loggedInUser = await User.findById(req.userAuth);
    // 2. Bejelentkezett felhasználó megtalálhatóe
    if (loggedInUser) {
      // 3. Blokkolt id lekérése
      const blockedIds = loggedInUser.blocked;
      // 4. id alapján a felhasználók lekérése
      const blocked = await User.find({ _id: { $in: blockedIds } });

      // 5. Bklokkolt felhasználók mentése
      res.json({
        status: "success",
        data: blocked,
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};
const userViewedArrayCtrl = async (req, res, next) => {
  try {
    // 1. bejelentkezett felhasználót
    const loggedInUser = await User.findById(req.userAuth);
    // 2. Bejelentkezett felhasználó megtalálhatóe
    if (loggedInUser) {
      // 3. Megnézett id lekérése
      const viewersIds = loggedInUser.viewers;
      // 4. id alapján a felhasználók lekérése
      const viewers = await User.find({ _id: { $in: viewersIds } });

      // 5. Megnézett felhasználók mentése
      res.json({
        status: "success",
        data: viewers,
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const profilePhotoUpdatectrl = async (req, res, next) => {
  try {
    // Felhasználó megkeresése
    const userToUpdate = await User.findById(req.userAuth);
    // Felhasználó ellenőrzése
    if (!userToUpdate) {
      return next(appErr("User not found", 403));
    }
    // Felhasználó tiltva van-e
    if (userToUpdate.isBlocked) {
      return next(appErr("Action not allowed, your account is blocked", 403));
    }
    // URL ellenőrzése és profilkép frissítése
    const newProfilePhoto = req.body.profilePhoto;
    if (!newProfilePhoto) {
      return next(appErr("Missing profilePhotoUrl in request body", 400));
    }
    // Profilkép frissítése
    userToUpdate.profilePhoto = newProfilePhoto;
    await userToUpdate.save();

    res.json({ success: true, message: "Profile photo updated successfully" });
  } catch (error) {
    next(error);
  }
};

const darkModeCtrl = async (req, res, next) => {
  try {
    //1. Find the user
    const darkModeUser = await User.findById(req.userAuth);

    if (darkModeUser.darkMode) {     
      darkModeUser.darkMode = false;
    } else {   
      darkModeUser.darkMode = true;
    }
    await darkModeUser.save();

    res.json({
      status: "success",
      data: "Dark mode is active",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl,
  unfollowCtrl,
  blockUsersCtrl,
  unBlockUsersCtrl,
  adminBlockUserCtrl,
  adminUnblockUserCtrl,
  updateUserpasswordCtrl,
  userFollowingArrayCtrl,
  profilePhotoUpdatectrl,
  userBlockedArrayCtrl,
  userFollowersgArrayCtrl,
  userViewedArrayCtrl,
  darkModeCtrl,
};
