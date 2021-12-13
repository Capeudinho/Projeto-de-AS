const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const userRoutes = require ("./controllers/userController");

const app = express ();

mongoose.connect
(
    "<connectionString>",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use (cors ());
app.use (express.json ());
app.use (userRoutes);

app.listen (3333);
