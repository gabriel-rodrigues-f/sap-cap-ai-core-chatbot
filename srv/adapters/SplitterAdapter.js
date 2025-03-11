const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

class SplitterAdapter {
    async splitText(content) {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1500,
            chunkOverlap: 150,
            addStartIndex: true
        });
        return await splitter.splitText(content);
    };
};

module.exports = new SplitterAdapter();