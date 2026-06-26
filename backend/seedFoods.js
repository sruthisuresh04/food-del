import { connectDB } from "./config/db.js";
import foodModel from "./models/foodModel.js";

const seedFoods = async () => {
  try {
    await connectDB();

    const items = [
      {
        name: "Margherita Pizza",
        description: "Classic cheese and tomato pizza",
        price: 8.99,
        category: "Pizza",
        image: "placeholder.jpg",
      },
      {
        name: "Veggie Burger",
        description: "Plant-based burger with fresh veggies",
        price: 7.5,
        category: "Burgers",
        image: "placeholder.jpg",
      },
      {
        name: "Caesar Salad",
        description: "Crisp romaine with Caesar dressing",
        price: 6.0,
        category: "Salads",
        image: "placeholder.jpg",
      },
    ];

    const existing = await foodModel.find({
      name: { $in: items.map((i) => i.name) },
    });
    if (existing.length > 0) {
      console.log(
        "Some or all seed items already exist. Skipping inserts for existing items.",
      );
    }

    const toInsert = items.filter(
      (i) => !existing.find((e) => e.name === i.name),
    );
    if (toInsert.length > 0) {
      const res = await foodModel.insertMany(toInsert);
      console.log(`Inserted ${res.length} food items.`);
    } else {
      console.log("No new items to insert.");
    }

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedFoods();
