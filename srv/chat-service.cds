using {cap.ai.demo as entities} from '../db/Conversation';

service ChatService @(path: '/chat') {

    entity Conversation as projection on entities.Conversation;
    entity Message      as projection on entities.Message;

    type ChatResponse {
        conversationId : UUID;
        messageId      : UUID;
        title          : String;
        content        : String;
        timestamp      : String;
    }

    action generate(content : String, user : String) returns ChatResponse;
}
