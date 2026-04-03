// Converts file buffer to format which can be read by gemini api

const geminiFileFormat = (buffer, mimeType) => {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        }
    }
}

module.exports = geminiFileFormat