using {cap.ai.demo as entities} from '../db/Conversation';

service ChatService @(path: '/chat') {

    entity Conversation as
        projection on entities.Conversation;

    entity Message      as
        projection on entities.Message;

    type ConversationType {
        id : UUID;
    }

    type MessageType {
        id : UUID;
    }

    type ChatProperties {
        conversation : ConversationType;
        message      : MessageType;
        prompt       : String
    }

    type ChatResponse {
        timestamp : String;
        role      : String;
        content   : String;
    }

    action generate(conversation : ConversationType, message : MessageType, prompt : String) returns ChatResponse;
}
