const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
    .connect("mongodb+srv://moon_young:asdf1234@boiler-plate.rf54r.mongodb.net/<dbname>?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
