const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { getAnalysis } = require("../controllers/analysisController");
const { createUser } = require("../controllers/userController");
const { youtubeController } = require("../controllers/youtubeController");

router.post(
    "/get-analysis",
    upload.fields([
        { name: "resume", maxCount: 1 },
        { name: "jobDescription", maxCount: 1 }
    ]),
    getAnalysis
);

router.post("/create-user", createUser);

router.post("/get-youtube-links", youtubeController);

module.exports = router;
