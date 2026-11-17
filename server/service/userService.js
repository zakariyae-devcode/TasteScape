import User from "../models/User";


export const getUserProfileService = async(userId)=>{
    try{

       const user = await User.findById(userId).select("-password").populate("favorites");
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        const userRecipes = await Recipe.find({ author: userId }).sort({createdAt: -1});
        
        return res.status(200).json({
            success: true,
            user,
            recipes: userRecipes,
        });
    }catch(error){
        console.error("Get profile error:", error);
        return res.status(500).json({ error: "Internal server error" });

    }
}