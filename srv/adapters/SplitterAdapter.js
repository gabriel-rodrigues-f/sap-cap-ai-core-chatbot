const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

class SplitterAdapter {
    async splitText(text) {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1500,
            chunkOverlap: 150,
            addStartIndex: true
        });
        return await splitter.splitText(text);
    };
};

module.exports = new SplitterAdapter();