import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import bcrypt from "bcrypt";

// get my profile
export const getUserProfileService = async(userId)=>{
    try{

       const user = await User.findById(userId).select("-password").populate("favorites");
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        const userRecipes = await Recipe.find({ author: userId }).sort({createdAt: -1});
        
        return{
            success: true,
            user,
            recipes:userRecipes,
        };
    }catch(error){
        console.error("Get profile error:", error);
        return res.status(500).json({ error: "Internal server error" });

    }
}

//update profile

export const updateProfileService = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

 

  const allowedUpdates = {};

  if (updates.first_name !== undefined) {
    allowedUpdates.first_name = updates.first_name.trim();
  }
  if (updates.last_name !== undefined) {
    allowedUpdates.last_name = updates.last_name.trim();
  }
  if (updates.username !== undefined) {
    const normalizedUsername = updates.username.trim();
    const existingUsername = await User.findOne({
      username: normalizedUsername,
      _id: { $ne: userId },
    });
    if (existingUsername) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    }
    allowedUpdates.username = normalizedUsername;
  }
  if (updates.email !== undefined) {
    const normalizedEmail = updates.email.toLowerCase().trim();
    const existingEmail = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: userId },
    });
    if (existingEmail) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    allowedUpdates.email = normalizedEmail;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: allowedUpdates },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new Error("USER_NOT_FOUND");
  }

  return {
    id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    first_name: updatedUser.first_name,
    last_name: updatedUser.last_name,
    role: updatedUser.role,
    is_active: updatedUser.is_active,
  };
};
// user delete account

export const deleteProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  

  await User.findByIdAndDelete(userId);

  return { deletedUserId: user._id };
};
//change password
export const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("INVALID_CURRENT_PASSWORD");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password updated successfully." };
};

//get all profile


const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getAllAccountService = async (queryParams = {}) => {
  const { search, page = 1, limit = 10 } = queryParams;
  const query = {};

  if (search && search.trim()) {
    const regex = new RegExp(escapeRegex(search.trim()), "i");
    query.$or = [
      { username: regex },
      { email: regex },
    ];
  }

  const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);
  const limitNumber = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 10));
  const skip = (pageNumber - 1) * limitNumber;

  const totalUsers = await User.countDocuments(query);

  const users = await User.find(query)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  return {
    users,
    pagination: {
      total: totalUsers,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalUsers / limitNumber),
    },
  };
};

//
export const deleteUserByAdminService = async (adminRole, targetUserId) => {
  if (adminRole !== "admin") {
    throw new Error("ONLY_ADMIN_CAN_DELETE_USERS");
  }

  const targetUser = await User.findById(targetUserId);
  if (!targetUser) {
    throw new Error("USER_NOT_FOUND");
  }

  if (targetUser.role === "admin") {
    throw new Error("CANNOT_DELETE_ADMIN");
  }

  await User.findByIdAndDelete(targetUserId);

  return {
    message: "User deleted successfully.",
    deletedUserId: targetUserId,
  };
};

export const toggleSuspendUserService = async (adminRole, targetUserId, { is_active, suspendUntil = null } = {}) => {
  if (adminRole !== "admin") {
    throw new Error("ONLY_ADMIN_CAN_MANAGE_USERS");
  }

  const targetUser = await User.findById(targetUserId);
  if (!targetUser) {
    throw new Error("USER_NOT_FOUND");
  }

  if (targetUser.role === "admin") {
    throw new Error("CANNOT_MODIFY_ADMIN");
  }

  const nextActiveState = typeof is_active === "boolean" ? is_active : !targetUser.is_active;

  targetUser.is_active = nextActiveState;
  targetUser.suspended_until = nextActiveState ? null : suspendUntil;

  await targetUser.save();

  return {
    message: nextActiveState ? "Account activated successfully." : "Account temporarily suspended.",
    user: {
      id: targetUser._id,
      username: targetUser.username,
      email: targetUser.email,
      role: targetUser.role,
      is_active: targetUser.is_active,
      suspended_until: targetUser.suspended_until,
    },
  };
};