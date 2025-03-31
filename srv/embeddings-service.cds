using {cap.ai.demo as entities} from '../db/DocumentChunk';

service EmbeddingsService @(path: '/embeddings') {

  entity documentChunk as
    projection on entities.DocumentChunk
    excluding {
      embedding
    };

  action generate(content : String) returns String;
}
