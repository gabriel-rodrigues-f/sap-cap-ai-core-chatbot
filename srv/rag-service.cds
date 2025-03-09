service RAGService @(path: '/rag') {

    type AdditionalContent {
        score       : String;
        pageContent : String;
    }

    type RAGResponse {
        role               : String;
        content            : String;
        messageTime        : String;
        additionalContents : array of AdditionalContent;
    }

    action generate(prompt : String) returns RAGResponse;
}
