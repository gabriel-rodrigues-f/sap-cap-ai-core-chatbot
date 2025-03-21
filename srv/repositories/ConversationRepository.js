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
            .where({ ID: id });
    };

    async deleteConversation(id) {
        return await cds.run(DELETE
            .from(this._CONVERSATION)
            .where({ ID: id }));
    }

    async loadMessages(id) {
        return await SELECT(this._MESSAGE)
            .where({ CONVERSATION_ID: id })
            .orderBy("updatedAt");
    };

    async insertMessage({ conversationId, role, content }) {
        const message = {
            CONVERSATION_ID: conversationId,
            ROLE: role,
            CONTENT: content
        }
        return await INSERT
            .into(this._MESSAGE)
            .entries([message]);
    };

    async deleteMessage(id) {
        return await cds.run(DELETE
            .from(this._MESSAGE)
            .where({ CONVERSATION_ID: id }));
    }
};

module.exports = new ConversationRepository()