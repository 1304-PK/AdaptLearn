const simpleExtraction = async (buffer) => {
    try {
        const data = await pdf(buffer);
        
        if (data.text && data.text.trim().length > 100) {
            return data.text.trim();
        }
        return null;
    } catch (error) {
        return null;
    }
}

module.exports = simpleExtraction