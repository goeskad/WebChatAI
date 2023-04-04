const express = require("express");
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/getKbsQuestions", async (req, res) => {
    const userInput = req.body.input;
    try {
        console.log('get user input', req.body);
        const response = await axios.post("http://localhost:8000/getKbsQuestions", {text: userInput});
        res.send(response.data);
    } catch (error) {
        console.error(error.text);
        res.status(500).send("Error occurred");
    }
});

app.post("/chat", async (req, res) => {
    const userInput = req.body.input;
    const kbsQueries = req.body.kbsQueries;
    try {
        const response = await axios.post("http://localhost:8000/chat", {text: userInput, kbsQueries: kbsQueries});
        res.send(response.data);
    } catch (error) {
        console.error(error.text);
        res.status(500).send("Error occurred");
    }
});

app.listen(3000, () => console.log("Server started on port 3000"));
