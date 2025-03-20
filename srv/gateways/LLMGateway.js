const cds = require("@sap/cds");

class LLMGateway {
    _PLUGIN_NAME = "cap-llm-plugin";
    _SYSTEM_PROMPT = "Você é um chatbot. Responda à pergunta do usuário com base apenas no contexto.";
    _EMBEDDING_MODEL_NAME = "text-embedding-ada-002";
    _EMBEDDING_MODEL_CONFIG = cds.env.requires["gen-ai-hub"][this._EMBEDDING_MODEL_NAME];
    _CHAT_MODEL_NAME = "gpt-4-gabriel";
    _CHAT_MODEL_CONFIG = cds.env.requires["gen-ai-hub"][this._CHAT_MODEL_NAME];
    _TABLE_NAME = "CAP_AI_DEMO_DOCUMENTCHUNK";
    _EMBEDDING_COLUMN = "EMBEDDING";
    _CONTENT_COLUMN = "TEXT_CHUNK";

    async _connect() {
        return await cds.connect.to(this._PLUGIN_NAME);
    };

    async getRAG({ query }) {
        const connection = await this._connect();
        return await connection.getRagResponseWithConfig(
            query,
            this._TABLE_NAME,
            this._EMBEDDING_COLUMN,
            this._CONTENT_COLUMN,
            this._SYSTEM_PROMPT,
            this._EMBEDDING_MODEL_CONFIG,
            this._CHAT_MODEL_CONFIG,
            undefined,
            5
        );
    };

    async getEmbeddings({ chunk }) {
        const connection = await this._connect();
        return await connection.getEmbeddingWithConfig(this._EMBEDDING_MODEL_CONFIG, chunk)
    }
};

module.exports = new LLMGateway();