const express = require("express");
const app = express();
const axios = require("axios");

aiHost = process.env.AI_HOST;
aiToken = process.env.AI_TOKEN;

header = {
    'Authorization': `Bearer ${aiToken}`
}

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
        const response = await axios.post(aiHost + "/getKbsQuestions", {text: userInput},
            {headers: header});
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
        const response = await axios.post(aiHost + "/chat", 
            {text: userInput, kbsQueries: kbsQueries},
            {headers: header});
        res.send(response.data);
    } catch (error) {
        console.error(error.text);
        res.status(500).send("Error occurred");
    }
});

app.listen(8080, () => console.log("Server started on port 3000"));
