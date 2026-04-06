const pdf = require("pdf-parse");

/**
 * Attempts to extract text using pdf-parse.
 * Returns text if found, otherwise returns null to trigger fallback.
 */
const trySimpleExtraction = async (buffer) => {
    try {
        const data = await pdf(buffer);
        // If text is very short (e.g., < 100 chars), it's likely a scanned image
        if (data.text && data.text.trim().length > 100) {
            return data.text.trim();
        }
        return null;
    } catch (error) {
        return null;
    }
};

/**
 * Converts buffer to Gemini-compatible format
 */
const formatForGemini = (buffer, mimeType) => {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        }
    };
};

module.exports = { trySimpleExtraction, formatForGemini };
