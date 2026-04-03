import cors from "cors"
require("dotenv").config()

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174", process.env.DEPLOYED_URL],
    methods: ["GET", "POST", "PUT", "DELETE"]
}

const corsMiddleware = cors(corsOptions)

module.exports = corsMiddleware