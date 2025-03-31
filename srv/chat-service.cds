using {cap.ai.demo as entities} from '../db/Conversation';

service ChatService @(path: '/chat') {

    entity Conversation as projection on entities.Conversation;
    entity Message      as projection on entities.Message;

    type ChatResponse {
        conversationId : UUID;
        content        : String;
        createdAt      : String;
        role           : String;
    }

    action startConversation(content : String, user : String)   returns ChatResponse;
    action sendMessage(conversationId : UUID, content : String) returns ChatResponse;
}
