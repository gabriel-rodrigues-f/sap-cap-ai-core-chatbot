const llmGateway = require("./gateways/LLMGateway");

module.exports = function () {
    this.on("generate", async ({ data, _ }) => {
        try {
            const { prompt } = data;
            const { completion, additionalContents } = await llmGateway.getRAG({ query: prompt });
            _.res.status(201).json({
                senderRole: completion.choices[0].message.role,
                content: completion.choices[0].message.content,
                additionalContents,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error in /rag/generate:", error);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });
};
