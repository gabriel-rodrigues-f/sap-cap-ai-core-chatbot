using {cap.ai.demo as entities} from '../db/Conversation';

service ChatService @(path: '/chat') {

    entity Conversation as
        projection on entities.Conversation;

    entity Message      as
        projection on entities.Message;

    type ConversationType {
        id : UUID;
    }

    type MessateType {
        id : UUID;
    }

    type chatProperties {
        conversation : ConversationType;
        message      : MessateType;
        prompt       : String
    }

    type ChatResponse {
        timestamp : String;
        role      : String;
        content   : String;
    }

    action generate(conversation : ConversationType, message : MessateType, prompt : String) returns ChatResponse;
}
