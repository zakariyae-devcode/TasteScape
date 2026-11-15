import Recipe  from "../models/Recipe.js";
import {recipeValidation, updateRecipeValidation} from "../validation/recipeValidation.js";


export const createRecipe = async (req,res)=>{

    try{
        const validationResult=recipeValidation.safeParse(req.body);

        


        if (!validationResult.success) {
            const errorMessages = validationResult.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessages });
        }

        const recipeData=validationResult.data;


        const authorId=req.user?.userId || req.userId;
     


        if (!authorId) {
            return res.status(401).json({ error: "Unauthorized; please log in first." });
        }

        const userRole = req.user?.role;
        if (userRole !== "admin") {
            return res.status(403).json({ error: "Access denied. Only admins can create recipes." });
        }

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        const newRecipe =new Recipe({
            ...recipeData,
            author:authorId
        });

        await newRecipe.save();

        return res.status(201).json({
            message: "The recipe has been created successfully! 🍲",
            recipe: newRecipe,
        });
    }

    catch(error){
        console.error("Create recipe error:", error);
        return res.status(500).json({ error: "Internal server error" })
    }

}

export const updateRecipe= async (req,res)=>{
    try{

       const recipeId=req.params.id;
       const userId = req.user?.userId || req.userId;
       const userRole = req.user?.role;


       const validationResult = updateRecipeValidation.safeParse(req.body);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessages });
        }
        
        const recipe= await Recipe.findById(recipeId);


        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        const isAuthor = recipe.author.toString() === userId;
        const isAdmin = userRole === "admin";

        if (!isAuthor && !isAdmin) {
           return res.status(403).json({ error: "You are not authorized to modify this recipe."});
        }

        let imageUrl = recipe.imageUrl; 

   
        if (req.file) {
            if (recipe.imageUrl) {
       
                const oldImagePath = path.join(process.cwd(), recipe.imageUrl);
                try {
                await fs.unlink(oldImagePath);
                } catch (err) {
                console.error("Failed to delete old image file:", err);
                }
            }
        
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const updateRecipe= await Recipe.findByIdAndUpdate(
            recipeId,

            { $set : validationResult.data,imageUrl},

            {new:true,runValidators:true}
        )

        return res.status(200).json({
            message: "The recipe has been updated successfully! ✏️",
            recipe: updatedRecipe,
        });



    }catch(error){
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        console.error("Update recipe error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}



export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user?.userId || req.userId;


    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    const isAuthor = recipe.author.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ error: "You are not authorized to delete this recipe" });
    }

    
    await Recipe.findByIdAndDelete(recipeId);

    return res.status(200).json({
      message: "The recipe has been deleted successfully 🗑️",
    });

  } catch (error) {
    console.error("Delete recipe error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const getAllRecipes = async (req, res) => {
    try 
    {
        const { search, category,page=1,limit=10 } = req.query;
        let query = {};


        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }
        if (category) {
            query.category = category;
        }

        const pageNumber=parseInt(page,10);
        const limitNumber=parseInt(limit,10);
        const skip =(pageNumber-1) * limitNumber;

        const totalRecipes = await Recipe.countDocuments(query);

        const recipes = await Recipe.find({query})
        .populate("author", "username email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)

        return res.status(200).json({
            success:true,
            currentPage:pageNumber,
            totalPages:Math.ceil(totalRecipes/limitNumber),
            totalRecipes,
            count: recipes.length,
            recipes,
        });
    } 
    catch (error) 
    {
        console.error("Get all recipes error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId).populate("author", "username email");

    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json({
      recipe,
    });
  } catch (error) {
    console.error("Get recipe by id error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const getMyRecipes = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // جلب الوصفات التي تطابق معرف المستخدم الحالي كـ author
    const recipes = await Recipe.find({ author: userId })
      .sort({ createdAt: -1 }); // ترتبيها من الأحدث للأقدم

    return res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });

  } catch (error) {
    console.error("Get my recipes error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};