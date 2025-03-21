namespace cap.ai.demo;

entity Logs {
    key id      : UUID;
        content : LargeString @mandatory;
}
