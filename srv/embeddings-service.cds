using {cap.ai.demo as entities} from '../db/DocumentChunk';

service embeddingsService @(path: '/embeddings') {

  entity documentChunk as
    projection on entities.DocumentChunk
    excluding {
      embedding
    };

  action generate(content : String) returns String;
}
