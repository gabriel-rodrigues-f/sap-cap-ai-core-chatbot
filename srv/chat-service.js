const gateway = require("./gateways/LLMGateway");
const repository = require("./repositories/ConversationRepository");
const prompts = require("./config/prompts");
const cds = require('@sap/cds');

module.exports = function() {
    this.on("generate", async ({ data, _ }) => {
        try {
            const timestamp = new Date().toISOString();
            const { conversation, prompt } = data;
           const r = await repository.insertMessage({
                conversationId: conversation.id,
                role: "user",
                content: prompt
            });
            const chatRAGResponseQuery = await gateway.getRAG({
                query: prompt,
                promptContext: prompts.request
            });
            const generatedQuery = chatRAGResponseQuery.completion.choices[0].message.content.replace(/(```sql|```$)/gm, '');
            const result = await cds.run(generatedQuery);
            const chatRAGResponseResult = await gateway.getRAG({
                query:  `${prompt}: \n\n ${JSON.stringify(result, null, 2)}`,
                promptContext: prompts.response
            });
            await repository.insertMessage({
                conversationId: conversation.id,
                role: "assistant",
                content: chatRAGResponseResult.completion.choices[0].message.content
            });
            await repository.updateConversation({ id: conversation.id, data: { modifiedAt: timestamp } });
            _.res.status(201).json({
                timestamp,
                role: "assistant",
                content: chatRAGResponseResult.completion.choices[0].message.content
            });
        } catch ({ message, stack }) {
            console.error(stack);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });

    this.on("DELETE", "Conversation", async ({ data, _ }) => {
        try {
            const { id } = data;
            console.log(id)
            await repository.deleteMessage(id);
            await repository.deleteConversation(id);
            return _.res.status(204).json();
        } catch ({ message, stack }) {
            console.error(stack);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });
};
