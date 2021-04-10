const express = require("express");

const app = express();

const connectDB = require("./config/db");

connectDB();

// add the body parser middleware
app.use(express.json({ extended: false }));


const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const contactsRoute = require("./routes/contacts");

// setting up the routes middleware
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/contacts", contactsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});