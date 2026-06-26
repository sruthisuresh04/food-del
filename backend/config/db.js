// import mongoose from "mongoose";

// export const connectDB = async () => {
//     (await mongoose.connect('mongodb+srv://sruthisuresh:04082002@cluster0.nmjsuqy.mongodb.net/food-del').then(()=>console.log("DB Connected Successfully"))
// )}



// import mongoose from "mongoose"

// const connectDB = async () => {
//     mongoose.connection.on('connected',()=>{
//         console.log("DB connected");
        
//     })
//     await mongoose.connect(`${process.env.MONGODB_URL}/food-del`)
// }

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "food-del",
    });

    console.log("✅ DB connected");
  } catch (err) {
    console.log("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;