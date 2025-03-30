const cds = require("@sap/cds");
const { INSERT, SELECT, UPDATE, DELETE } = cds.ql;

class ConversationRepository {
    _CONVERSATION = cds.entities.Conversation;
    _MESSAGE = cds.entities.Message;

    async insertConversation({ user, title }) {
        return await INSERT
            .into(this._CONVERSATION)
            .entries([{ user, title }]);
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

    async loadMessages(conversation_id) {
        return await SELECT(this._MESSAGE)
            .where({ conversation_id })
            .orderBy("updatedAt");
    };

    async insertMessage({ conversation_id, role, content }) {
        return await INSERT
            .into(this._MESSAGE)
            .entries([{ conversation_id, role, content }])
    };

    async deleteMessage(conversation_id) {
        return await cds.run(DELETE
            .from(this._MESSAGE)
            .where({ conversation_id }));
    }
};

module.exports = new ConversationRepository()