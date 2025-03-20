const gateway = require("./gateways/LLMGateway");
const repository = require("./repositories/ConversationRepository");
const { v4 } = require("uuid");

module.exports = cds => {
    cds.on("generate", async ({ data, _ }) => {
        try {
            const { conversationId, prompt } = data;
            const { Conversation, Message } = cds.entities;
            const { completion } = await gateway.getRAG({ query: prompt });

            const message = {
                conversationId: conversationId,
                id: v4(),
                role: completion.choices[0].message.role,
                content: completion.choices[0].message.content
            };
            await repository.insertMessage({
                entity: Message,
                message
            });
            await repository.updateConversation({
                entity: Conversation,
                id: conversationId,
                timestamp: new Date().toISOString()
            });
            _.res.status(201).json(message);
        } catch ({ message, stack }) {
            console.error(stack);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });

    cds.on("DELETE", "Conversation", async ({ data, _ }) => {
        try {
            const { ID } = data;
            const { Conversation, Message } = cds.entities;
            await cds.run(DELETE.from(Message).where({ CONVERSATION_ID: ID }));
            await cds.run(DELETE.from(Conversation).where({ ID }));
            return _.res.status(204).json();
        } catch ({ message, stack }) {
            console.error(stack);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });
};
