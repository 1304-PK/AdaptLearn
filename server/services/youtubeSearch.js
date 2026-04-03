require("dotenv").config()

const youtubeSearch = async () => {
    try{const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

    const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(skill + " tutorial")}&type=video&maxResults=2&key=${YOUTUBE_API_KEY}`
    );

    const searchData = await searchRes.json()

    const videos = searchData.items.map((item) => ({
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }))

    return videos}
    catch(error){
        throw error
    }
}