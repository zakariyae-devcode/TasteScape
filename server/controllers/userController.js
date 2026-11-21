import { 
  getUserProfileService,
  updateProfileService,
  changePasswordService,
  getAllAccountService,
  deleteUserByAdminService,
  toggleSuspendUserService, 
} from "../service/userService.js";
import { updateProfileValidation,changePasswordValidation } from "../validation/uservalidation.js";

export const getUserProfile = async (req, res) => {
  try 
  {
    const userId = req.user?.userId || req.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized; please log in first." });
      }

    const { user, recipes } = await userService.getUserProfileService(userId);

    return res.status(200).json({
      success: true,
      user,
      recipes: userRecipes,
    });
  } 
  catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    }

    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const validationResult = updateProfileValidation.safeParse(req.body);
    if (!validationResult.success) {
      const errorsMessage = validationResult.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorsMessage });
    }

    const user = await updateProfileService(req.user.id, validationResult.data);
    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
    });
  } catch (err) {
    if (err.message === "USERNAME_ALREADY_EXISTS" || err.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({ error: "Username or email is already in use." });
    }
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found." });
    }

    console.error("Update profile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await deleteMyAccountService(userId);

    return res.status(200).json({
      message: "Account deleted successfully.",
      data: result,
    });
  } catch (err) {
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found." });
    }
    if (err.message === "ONLY_USER_CAN_DELETE_HERE") {
      return res.status(403).json({ error: "Only standard users can delete their account here." });
    }

    console.error("Delete account error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const changePassword = async (req, res) => {
  try {
    const validationResult = changePasswordValidation.safeParse(req.body);
    if (!validationResult.success) {
      const errorsMessage = validationResult.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorsMessage });
    }

    const { currentPassword, newPassword } = validationResult.data;
    const result = await changePasswordService(req.user.id, currentPassword, newPassword);

    return res.status(200).json(result);
  } catch (err) {
      if (err.message === "USER_NOT_FOUND") {
        return res.status(404).json({ error: "User not found." });
      }
      if (err.message === "ONLY_USER_CAN_CHANGE_PASSWORD_HERE") {
        return res.status(403).json({ error: "Only standard users can change their password here." });
      }
      if (err.message === "INVALID_CURRENT_PASSWORD") {
        return res.status(400).json({ error: "Current password is incorrect." });
      }

      console.error("Change password error:", err);
      return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllAccount = async (req, res) => {
  try {
    const data = await getAllAccountService(req.query);

    return res.status(200).json(data);
  } catch (err) {
    console.error("Get all accounts error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteUserByAdmin = async (req, res) => {
  try {
    const result = await deleteUserByAdminService(req.user.role, req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "ONLY_ADMIN_CAN_DELETE_USERS") {
      return res.status(403).json({ error: "Only admins can delete users." });
    }
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found." });
    }
    if (err.message === "CANNOT_DELETE_ADMIN") {
      return res.status(403).json({ error: "Admin accounts cannot be deleted." });
    }

    console.error("Delete user by admin error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleSuspendUser = async (req, res) => {
  try {
      const result = await toggleSuspendUserService(req.user.role, req.params.id, req.body);
      return res.status(200).json(result);
  } 
  catch (err) {
    if (err.message === "ONLY_ADMIN_CAN_MANAGE_USERS") {
      return res.status(403).json({ error: "Only admins can update user account status." });
    }
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found." });
    }
    if (err.message === "CANNOT_MODIFY_ADMIN") {
      return res.status(403).json({ error: "Admin accounts cannot be suspended." });
    }

    console.error("Toggle suspend user error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};