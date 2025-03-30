const gateway = require("./gateways/LLMGateway");
const repository = require("./repositories/ConversationRepository");
const llmContext = require("./config/llmContext");
const cds = require('@sap/cds');

module.exports = function () {

    ROLES_ENUM = {
        USER: "user",
        ASSISTANT: "assistant"
    }

    this.on("generate", async ({ data, _ }) => {
        try {
            const timestamp = new Date().toISOString();
            const { content, user } = data;
            const chatRAGResponseChatTitle = await gateway.getRAG({
                query: content,
                promptContext: llmContext.messageTitle
            });
            const conversation = await repository.insertConversation({
                user,
                title: chatRAGResponseChatTitle.completion.choices[0].message.content
            });
            const conversationId = conversation.results[0].values[6];
            await repository.insertMessage({
                conversation_id: conversationId,
                role: ROLES_ENUM.USER,
                content
            });
            const chatRAGResponseQuery = await gateway.getRAG({
                query: content,
                promptContext: llmContext.sql
            });
            const generatedQuery = chatRAGResponseQuery.completion.choices[0].message.content.replace(/(```sql|```$)/gm, '');
            const result = await cds.run(generatedQuery);
            const chatRAGResponseResult = await gateway.getRAG({
                query: `${content}: \n\n ${JSON.stringify(result, null, 2)}`,
                promptContext: llmContext.prompt
            });
            const assistantResponse = await repository.insertMessage({
                conversation_id: conversationId,
                role: ROLES_ENUM.ASSISTANT,
                content: chatRAGResponseResult.completion.choices[0].message.content
            });
            await repository.updateConversation({ id: conversationId, data: { modifiedAt: timestamp } });
            _.res.status(201).json({
                conversationId,
                messageId: assistantResponse.results[0].values[6],
                createdAt: assistantResponse.results[0].values[3],
                role: ROLES_ENUM.ASSISTANT,
                content: chatRAGResponseResult.completion.choices[0].message.content
            });
        } catch (error) {
            console.error(error);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });

    this.on("DELETE", "Conversation", async ({ data, _ }) => {
        try {
            const { id } = data;
            await repository.deleteMessage(id);
            await repository.deleteConversation(id);
            return _.res.status(204).json();
        } catch (error) {
            console.error(error);
            _.res.status(500).json({ message: "Internal Server Error" });
        };
    });
};
