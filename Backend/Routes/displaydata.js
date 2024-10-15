const express = require("express");
const { route } = require("./Createuser");
const router = express.Router();

router.post("/fooddata", (req, res) => {
  try {
    

    const result = {
      food_items: global.food_items,
      food_categories: global.foodCategory,
    };
    console.log(result);
    res.send(result);

    // res.send(global.food_items);
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
});
module.exports = router;
