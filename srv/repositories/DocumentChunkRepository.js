const cds = require("@sap/cds");
const { INSERT } = cds.ql;

class DocumentChunkRepository {
    _DOCUMENT_CHUNK = cds.entities.DocumentChunk;

    async create(entries) {
        return await INSERT.into(this._DOCUMENT_CHUNK).entries(entries);
    };
}

module.exports = new DocumentChunkRepository()