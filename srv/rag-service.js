const gateway = require("./gateways/LLMGateway");

module.exports = function () {
    this.on("generate", async ({ data, _ }) => {
        try {
            const { prompt } = data;
            const { completion } = await gateway.getRAG({ query: prompt });
            _.res.status(201).json({
                senderRole: completion.choices[0].message.role,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error in /rag/generate:", error);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });
};
