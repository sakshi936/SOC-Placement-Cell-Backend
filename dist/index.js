import express from "express";
const app = express();
app.get("/api/login", (req, res) => {
    res.send("Successfully Loggedin with TS");
});
app.listen(3000, () => {
    console.log("Sever at 3000");
});
