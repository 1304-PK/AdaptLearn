const express = require("express")
const router = express.Router()
require("dotenv").config()

router.post("/api/employee/get-youtube-links", async (req, res) => {
    const { skill } = req.body

    if (!skill) return res.status(400).json({ error: "skill name is required" })

    try {
        

        res.json({ videos })

    } catch (err) {
        console.error("YouTube fetch error:", err.message)
        res.status(500).json({ error: "Failed to fetch YouTube links" })
    }
})