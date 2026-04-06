const youtubeController = async (req, res) => {
    const { skill } = req.body;

    if (!skill) return res.status(400).json({ error: "skill is required" });

    try {
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

        const searchRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(skill + " tutorial")}&type=video&maxResults=2&key=${YOUTUBE_API_KEY}`
        );

        const searchData = await searchRes.json();
        console.log("YouTube API response:", JSON.stringify(searchData, null, 2));

        const videos = searchData.items.map((item) => ({
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

        res.json({ videos });

    } catch (err) {
        console.error("YouTube fetch error:", err.message);
        res.status(500).json({ error: "Failed to fetch YouTube links" });
    }
};

module.exports = { youtubeController };
