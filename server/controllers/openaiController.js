// server/controllers/openaiController.js
const OpenAI = require('openai');
const Content = require('../models/contentModel');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateContent = async (req, res) => {
    const { topic, niche } = req.body;

    if (!topic || !niche) {
        return res.status(400).json({ message: 'Topic and niche are required' });
    }

    try {
        const prompt = `You are a content strategist. Suggest one trending Instagram reel idea for a creator in the ${niche} niche on the topic of "${topic}". Include a short, punchy caption, 5 relevant hashtags, and a strong opening hook. Return the response as a JSON object with keys: "hook", "reelIdea", "caption", and "hashtags".`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106', 
            response_format: { "type": "json_object" },
            messages: [{ role: 'user', content: prompt }],
        });

        const generatedContent = JSON.parse(response.choices[0].message.content);

        const newContent = new Content({
            topic,
            niche,
            hook: generatedContent.hook,
            reelIdea: generatedContent.reelIdea,
            caption: generatedContent.caption,
            hashtags: generatedContent.hashtags
        });
        await newContent.save();

        res.status(200).json(generatedContent);
    } catch (error) {
        console.error('Error generating content from OpenAI:', error);
        res.status(500).json({ message: 'Failed to generate content' });
    }
};

module.exports = { generateContent };