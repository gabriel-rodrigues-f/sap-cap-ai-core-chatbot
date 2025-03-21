using {cap.ai.demo as db} from '../db/DocumentChunk';

service EmbeddingService @(path: '/embeddings') {

  entity DocumentChunk as
    projection on db.DocumentChunk
    excluding {
      embedding
    };

  action generate(content : String) returns String;
}
