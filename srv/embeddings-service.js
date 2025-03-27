const gateway = require("./gateways/LLMGateway");
const repository = require("./repositories/DocumentChunkRepository");
const bufferAdapter = require("./adapters/BufferAdapter");
const splitterAdapter = require("./adapters/SplitterAdapter")

module.exports = function() {
  this.on("generate", async ({ data, _ }) => {
    try {
      const { content } = data;
      const textChunks = await splitterAdapter.splitText(content);
      const textChunkEntriesPromise = textChunks.map(async chunk => {
        const embeddingResult = await gateway.getEmbeddings({ chunk });
        const embedding = embeddingResult?.data[0]?.embedding;
        if (!embedding) throw new Error(`Embedding not found for chunk: ${chunk}`);

        return {
          text_chunk: chunk,
          embedding: bufferAdapter.parseArrayToVectorBuffer(embedding)
        };
      });

      const textChunkEntries = await Promise.all(textChunkEntriesPromise);
      await repository.create(textChunkEntries);
      _.res.status(201).json();
    } catch (error) {
      console.error("Error in /embeddings/generate:", error);
      _.res.status(500).json({ message: "Internal Server Error" });
    };
  });
};