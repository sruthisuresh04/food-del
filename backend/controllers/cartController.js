import userModel from '../models/UserModel.js'

// add item to user cart

const addToCart = async(req,res) =>{
      try {
        let userData = await userModel.findById(req.userId)
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.userId,{cartData});
        res.json({success:true,message:"Added to Cart"})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
      }
}

//  remove item from user cart

const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
             cartData[req.body.itemId] -=1;
        } 
        await userModel.findByIdAndUpdate(req.userId,{cartData});
         res.json({success:true,message:"Removed from Cart"})

    } catch (error) {
         console.log(error);
        res.json({success:false,message:"error"})
    }
}

// fetch user cart data

const getCart = async (req, res) => {
  try {
    console.log("User ID:", req.userId);

    const userData = await userModel.findById(req.userId);

    console.log("User:", userData);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartData: userData.cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {addToCart,removeFromCart,getCart}