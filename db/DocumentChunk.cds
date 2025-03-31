namespace cap.ai.demo;

entity DocumentChunk {
    key id: UUID;
    text_chunk: LargeString @mandatory;
    embedding: Vector(1536) @mandatory;
}
