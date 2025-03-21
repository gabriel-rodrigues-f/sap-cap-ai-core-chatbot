namespace cap.ai.demo;

using {
    managed
} from '@sap/cds/common';

entity Conversation : managed {
    key id       : UUID;
        user     : String(50) @mandatory;
        title    : String(50) @mandatory;
        messages : Composition of many Message
                       on messages.conversation = $self;
}

entity Message : managed {
    key id           : UUID;
        conversation : Association to Conversation;
        role         : String(50)  @mandatory;
        content      : LargeString @mandatory;
}
