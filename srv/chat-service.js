const gateway = require("./gateways/LLMGateway");
const repository = require("./repositories/ConversationRepository");

module.exports = cds => {
    cds.on("generate", async ({ data, _ }) => {
        try {
            const timestamp = new Date().toISOString();
            const { conversation, prompt } = data;
            await repository.insertMessage({
                conversationId: conversation.id,
                role: "user",
                content: prompt
            })
            const { completion } = await gateway.getRAG({ query: prompt });
            await repository.insertMessage({
                conversationId: conversation.id,
                role: "assistant",
                content: completion.choices[0].message.content
            });
            await repository.updateConversation({ id: conversation.id, data: { modifiedAt: timestamp } });
            _.res.status(201).json({
                timestamp,
                role: "assistant",
                content: completion.choices[0].message.content
            });
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
