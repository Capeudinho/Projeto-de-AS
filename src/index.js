const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const userRoutes = require ("./controllers/userController");

const app = express ();

mongoose.connect
(
    "mongodb+srv://Capeudinho:kenjin202530@cluster0-yh3ut.mongodb.net/project?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use (cors ());
app.use (express.json ());
app.use (userRoutes);

app.listen (3333);