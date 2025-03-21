namespace cap.ai.demo;

entity ErrorLogs {
    key id: UUID;
    content : LargeString @mandatory;
}
