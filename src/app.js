const express = require("express");
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser");
const app = express();



app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const feedRouter = require("./routes/feed");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", feedRouter);










connectDB().then(() => {
    console.log("DB connected");
    app.listen(3000,() => {
        console.log("Listening server 3000.....");
    })
}).catch((err) =>{
    console.error("DB could not connect...");
});
