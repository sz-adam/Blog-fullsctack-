const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const { appErr, AppErr } = require("../../utils/appErr");

//Register
const userRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User already exist", 500));
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      profilePhoto,
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
const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    //CHeck if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        message: "invalid login credentials",
      });
    }
    //verify password
    const isPasswordMatxhed = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordMatxhed) {
      return res.json({
        message: "invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
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
    res.json(error.message);
  }
};

//following profile
const followingCtrl = async (req, res, next) => {
  try {
    //1. Find the user to follow
    const userToFollow = await User.findById(req.params.id);
    //2. Find the user who is following
    const userWhoFollowed = await User.findById(req.userAuth);
    //3.Check if user and userWhoFollowed are found
    if (userToFollow && userWhoFollowed) {
      //4.Check if userWhoFollowed is alredy in the user's followers array
      const isUserAlreadyFollowed = userToFollow.following.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appErr("You already followed this user"));
      } else {
        //5. Push userWhoFolloed not the user's followers array
        userToFollow.followers.push(userWhoFollowed._id);
        //6. push userToFollow to the userWhoFollowed's following array
        userWhoFollowed.following.push(userToFollow._id);

        //save
        await userWhoFollowed.save();
        await userToFollow.save();
        res.json({
          status: "success",
          data: "You have succesfully this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
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
const usersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.json(error.message);
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
    res.json(error.message);
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
    res.json(error.message);
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
    res.json(error.message);
  }
};

//deleteUser
const deleteUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user Route",
    });
  } catch (error) {
    res.json(error.message);
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
    res.json(error.message);
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
};
