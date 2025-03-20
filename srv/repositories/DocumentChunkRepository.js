const cds = require("@sap/cds");
const { INSERT } = cds.ql;

class DocumentChunkRepository {
    _TABLE_NAME = "CAP_AI_DEMO_DOCUMENTCHUNK"
    _EMBEDDING_COLUMN = "EMBEDDING"
    _CONTENT_COLUMN = "TEXT_CHUNK"
    _EMBEDDING_MODEL_NAME = "text-embedding-ada-002"
    _CHAT_MODEL_NAME = "gpt-4-gabriel"

    async create(entity, entries) {
        return await INSERT.into(entity).entries(entries);
    };
}

module.exports = new DocumentChunkRepository()