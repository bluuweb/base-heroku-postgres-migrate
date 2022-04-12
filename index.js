require("dotenv").config();
const express = require("express");
const { users } = require("./database/db");
const app = express();

app.get("/", async (req, res) => {
    try {
        const { rows } = await users();
        return res.json(rows);
    } catch (error) {
        console.log(error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("👏👏👏"));
