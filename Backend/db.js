const mongoose = require('mongoose');

// Ensure the username and password are properly placed
const mongourl = 'mongodb+srv://bsakhare25bs:%40Bharat.1@gofoodmern.se19m.mongodb.net/goFoodMern?retryWrites=true&w=majority&appName=goFoodMern';

const mongodb = async () => {
    try {
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Fetch data from the "food_items" collection
        const fetchedFoodItems = mongoose.connection.db.collection("food_items");
        const foodItemsData = await fetchedFoodItems.find({}).toArray();

        // Fetch data from the "foodCategory" collection
        const fetchedFoodCategory = mongoose.connection.db.collection("food_category");
        const foodCategoryData = await fetchedFoodCategory.find({}).toArray();

        // Set global variables for the fetched data
        global.food_items = foodItemsData;
        global.foodCategory = foodCategoryData;

        console.log("Data fetched successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = mongodb;