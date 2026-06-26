import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
   
    let image_filename = `${req.file.filename}`; // get the filename from the uploaded file

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename, // use the filename from the uploaded file
    })
    try {
        await food.save(); // save the food item to the database
        res.json({ success: true, message: "Food item added successfully" }); // send success response
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food item" }); // send error response
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}); // find all food items in the database
        res.json({ success: true, data:foods }); // send success response with food items
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food items" }); // send error response
        
    }

}

//  remove food item

const removeFood = async (req, res) => {
    // const foodId = req.params.id;
   // get the food item id from the request parameters

     try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food item removed successfully"}); 
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error removing food item"}); 
     }
}

// update food item



export const updateFood = async (req, res) => {
  try {
    const { id, name, category, price, description } = req.body;
    const updated = await foodModel.findByIdAndUpdate(
      id,
      { name, category, price, description },
      { new: true }
    );
    if (updated) {
      res.json({ success: true, data: updated });
    } else {
      res.json({ success: false, message: "Food not found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error updating food", error: error.message });
  }
};

export { addFood, listFood , removeFood};