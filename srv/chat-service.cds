using {cap.ai.demo as entities} from '../db/Conversation';

service ChatService @(path: '/chat') {

    entity Conversation as projection on entities.Conversation;
    entity Message      as projection on entities.Message;

    type AdditionalContent {
        score       : String;
        pageContent : String;
    }

    type ChatResponse {
        role               : String;
        content            : String;
        messageTime        : String;
        additionalContents : array of AdditionalContent;
    }

    type ChatProperties {
        conversationId   : String;
        messageId        : String;
        messageCreatedAt : Timestamp;
        userId           : String;
        prompt           : String
    }

    action generate(conversationId : String, prompt : String) returns ChatResponse;
    action delete(conversationId : String)                    returns String;
}
