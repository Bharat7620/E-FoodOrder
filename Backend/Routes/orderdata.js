const express = require('express');
const router = express.Router();
const order = require('../Models/orders');

router.post('/orderdata', async (req, res) => {
  let data = req.body.order_data;

  // Insert the order date at the beginning of the data array
  await data.splice(0, 0, { order_date: new Date().toISOString() });

  // Check if the email already exists
  let eid = await order.findOne({ email: req.body.email });
  console.log(eid);

  if (eid === null) {
    // If no existing order for the email, create a new order
    try {
      await order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: " + error.message);
    }
  } else {
    // If the email exists, update the order with new data
    try {
      await order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: " + error.message);
    }
  }
});

router.post('/myorderdata', async (req,res) => {
try {
    let mydata = await order.findOne({'email':req.body.email})
    res.json({orderdata:mydata})
} catch (error) {
    res.send(error.message)
}
})

module.exports = router;
