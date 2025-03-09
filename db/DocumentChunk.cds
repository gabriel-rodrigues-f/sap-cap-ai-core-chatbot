namespace cap.ai.demo;

using { cuid } from '@sap/cds/common';

entity DocumentChunk : cuid {
    TEXT_CHUNK: LargeString;
    EMBEDDING: Vector(1536);
}
