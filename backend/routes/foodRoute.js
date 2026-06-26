import express from 'express';
import { addFood,listFood,removeFood ,updateFood} from '../controllers/foodController.js';
import multer from 'multer';     // multer for image upload


const foodRouter = express.Router();   // create a new router 

// image storage Engine  

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {                      // specify the destination and filename for uploaded files.cb is a callback function that multer calls when it has finished processing the file.
       return cb(null, `${Date.now()}${file.originalname}`);  // save file with timestamp to avoid conflicts. originalname is the name of the file as it was uploaded by the user.
    }
})


const upload = multer({ storage: storage });  // create a new multer instance with the storage engine




foodRouter.post("/add",upload.single("image"),addFood) 

foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);
foodRouter.post('/update', updateFood);


export default foodRouter;