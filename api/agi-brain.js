const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // These lines allow the Face to talk to the Brain
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const { prompt } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        return res.status(500).json({ error: "Check your API Key in Vercel." });
    }
};
