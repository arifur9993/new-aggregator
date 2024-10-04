import OpenAI from "openai";

const openai = new OpenAI({
    // Make sure this key is properly set in your environment variables
    apiKey: process.env.OPENAI_API_KEY, 
});

/**
 * Extracts main topics from the given text using OpenAI API.
 *
 * @param {string} text - The text from which to extract topics.
 * @returns {Promise<string[]>} - A promise that resolves to an array of topics.
 */
export const extractTopics = async (text: string): Promise<string[]> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant that extracts main topics from text." },
                { role: "user", content: `Extract the main topics from the following text:\n\n${text}\n\nTopics:` }
            ],
            max_tokens: 60,
            temperature: 0.3,
        });
        console.log("After extracting topics:", response.choices[0]);
        // Extracting and splitting the topics from the response
        return response.choices[0].message.content?.trim().split('\n')
            .map(topic => topic.replace(/^\d+\.\s*|- /g, '')) || [];
    } catch (error) {
        console.error("Error extracting topics:", error);
        return [];
    }
};

/**
 * Recognizes named entities from the given text using OpenAI API.
 *
 * @param {string} text - The text from which to recognize named entities.
 * @returns {Promise<Array<{ name: string, type: string }>>} - A promise that resolves to an array of named entities.
 */
export const extractNamedEntities = async (text: string): Promise<Array<{ name: string, type: string }>> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that recognizes and categorizes named entities. If no named entity is found, use 'undefined' for both name and type."
                },
                {
                    role: "user",
                    content: `Recognize and categorize named entities as 'people', 'locations', or 'organizations' in the following text:\n\n${text}\n\nEntities:`
                }
            ],
            max_tokens: 60,
            temperature: 0.3,
        });

        const content = response.choices[0].message.content || '';
        // Filter out undefined name/type and remove the extra character
        return content.trim().split('\n').map(entity => {
            const [name = 'undefined', type = 'undefined'] = entity.split(':').map(part => part ? part.trim().replace(/^- /, '') : 'undefined');
            return {
                name,
                type,
            };
        }).filter(entity => entity.name !== 'undefined' && entity.type !== 'undefined'); 
    } catch (error) {
        console.error("Error recognizing entities:", error);
        // Return an empty array in case of error
        return []; 
    }
};
