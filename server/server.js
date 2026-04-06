const cors = require("cors");
const express = require("express");
require("dotenv").config();

const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://adapt-learn-sand.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// Routes
app.use("/api", routes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
});