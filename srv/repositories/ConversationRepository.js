const cds = require("@sap/cds");
const { INSERT, SELECT, UPDATE, DELETE } = cds.ql;

class ConversationRepository {
    _CONVERSATION = cds.entities.Conversation;
    _MESSAGE = cds.entities.Message;

    async insertConversation(data) {
        return await INSERT
            .into(this._CONVERSATION)
            .entries([data]);
    }

    async updateConversation({ data, id }) {
        return await UPDATE(this._CONVERSATION)
            .set(data)
            .where({ id });
    };

    async deleteConversation(id) {
        return await cds.run(DELETE
            .from(this._CONVERSATION)
            .where({ id }));
    }

    async loadMessages(id) {
        return await SELECT(this._MESSAGE)
            .where({ conversation_id: id })
            .orderBy("updatedAt");
    };

    async insertMessage({ conversationId, role, content }) {
        const message = {
            conversation_id: conversationId,
            role,
            content
        }
        return await INSERT
            .into(this._MESSAGE)
            .entries([message])
    };

    async deleteMessage(id) {
        return await cds.run(DELETE
            .from(this._MESSAGE)
            .where({ conversation_id: id }));
    }
};

module.exports = new ConversationRepository()