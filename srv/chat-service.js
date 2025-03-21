const gateway = require("./gateways/LLMGateway");
const repository = require("./repositories/ConversationRepository");

module.exports = cds => {
    cds.on("generate", async ({ data, _ }) => {
        try {
            const { conversationId, prompt } = data;
            await repository.insertMessage({
                conversationId,
                role: "user",
                content: prompt
            })
            const { completion } = await gateway.getRAG({ query: prompt });
            const response = {
                conversationId,
                role: completion.choices[0].message.role,
                content: completion.choices[0].message.content
            };
            await repository.insertMessage(response);
            await repository.updateConversation({ id: conversationId, data: { modifiedAt: new Date().toISOString() } });
            _.res.status(201).json(response);
        } catch ({ message, stack }) {
            console.error(stack);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });

    cds.on("DELETE", "Conversation", async ({ data, _ }) => {
        try {
            const { ID } = data;
            await repository.deleteMessage(ID);
            await repository.deleteConversation(ID);
            return _.res.status(204).json();
        } catch ({ message, stack }) {
            console.error(stack);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });
};
