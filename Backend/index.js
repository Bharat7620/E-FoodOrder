const express = require('express');
const app = express();
const port = 5000;
const mongodb = require("./db");
mongodb();


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next(); // Pass the request to the next middleware/route handler
});
 
// Middleware to parse JSON requests
app.use(express.json());

// Route to handle root requests
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Import and use the user creation routes
app.use('/api', require("./Routes/Createuser"));
app.use('/api',require("./Routes/displaydata"));
app.use('/api',require("./Routes/orderdata"));

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
