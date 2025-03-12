namespace cap.ai.demo;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Conversation : cuid, managed {
    USER     : String(50);
    TITLE    : String(50);
    MESSAGES : Composition of many Message
                   on MESSAGES.CONVERSATION = $self;
}

entity Message : cuid, managed {
    CONVERSATION : Association to Conversation;
    ROLE         : String(50);
    CONTENT      : LargeString;
}
