const cds = require("@sap/cds");
const { INSERT, SELECT, UPDATE } = cds.ql;

class ConversationRepository {
    async updateConversation({ entity, id, timestamp }) {
        console.log({ entity, id, timestamp })
        return await UPDATE(entity).set({ updatedAt: timestamp }).where({ ID: id });
    };

    async loadMessages({ entity, id }) {
        console.log({ entity, id })
        return await SELECT(entity).where({ CONVERSATION_ID: id }).orderBy("updatedAt");
    };

    async insertMessage({ entity, message }) {
        console.log({ entity, message })
        return await INSERT.into(entity).entries([message]);
    };
};

module.exports = new ConversationRepository()