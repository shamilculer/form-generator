import express from "express";
import "dotenv/config"
import cors from "cors";

import connectDb from "./config/db";
import formRoutes from "./routes/form.route"

const app = express()
app.use(cors({
    origin: process.env.APP_ORIGIN
}))
app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.use("/form", formRoutes)

const startServer = async () => {
    try {
        await connectDb();
        app.listen(3000, () => console.log(`Started server at port 3000`));
    } catch (error) {
        console.log("Error starting server", error);
    }
}

startServer()