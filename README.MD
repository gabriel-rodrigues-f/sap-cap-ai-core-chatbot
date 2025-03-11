# CAP AI Demo

Este projeto é uma API baseada no SAP Cloud Application Programming Model (CAP) integrada com SAP HANA Cloud e SAP AI Core.

## 🚀 Tecnologias Utilizadas

- **SAP CAP** (Cloud Application Programming Model)
- **SAP HANA Cloud**
- **Node.js**
- **Express**
- **OData V4**
- **Swagger UI**
- **Helmet e CORS** para segurança

##  Estrutura do Projeto

```plaintext
cap-ai-gabriel-marangoni
│-- .github/
│   ├── workflows/             # Configurações para CI/CD
│-- collection/                # Arquivos de requisição HTTP para testes
│   ├── embeddings.http
│   ├── rag.http
│-- db/                        # Definições do banco de dados (HANA Cloud)
│   ├── src/
│   │   ├── DocumentChunk.cds  # Definição da entidade DocumentChunk
│-- gen/                       # Arquivos gerados pelo CAP
│-- mta_archives/              # Arquivos de deployment MTA
│-- node_modules/              # Dependências Node.js
│-- srv/                       # Lógica de serviço e negócios
│   ├── adapters/              # Adaptadores de dados
│   │   ├── BufferAdapter.js
│   │   ├── SplitterAdapter.js
│   ├── api/                   # Middlewares para segurança
│   │   ├── cors.js
│   │   ├── helmet.js
│   ├── gateways/              # Integração com sistemas externos
│   │   ├── LLMGateway.js
│   ├── repositories/          # Camada de acesso a dados
│   │   ├── DocumentChunkRepository.js
│   ├── embeddings-service.cds  # Definição do serviço OData para embeddings
│   ├── embeddings-service.js   # Implementação do serviço de embeddings
│   ├── rag-service.cds         # Definição do serviço OData para RAG
│   ├── rag-service.js          # Implementação do serviço RAG
│-- .cdsrc.json                 # Configuração do projeto CAP
│-- mta.yaml                    # Configuração do SAP Cloud Foundry MTA
│-- package.json                # Configuração do Node.js
│-- xs-security.json            # Configuração de segurança do SAP BTP
```


## 🔧 Como Executar o Projeto

### 1️⃣ Pré-requisitos

- Node.js e npm instalados
- Instalar a CLI do CAP:  
```sh
npm install -g @sap/cds-dk
```

### Login no Cloud Foundry

```bash
cf login
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Executar o Projeto Localmente

```bash
cds watch
```

O servidor estará disponível em `http://localhost:4004`.

### 4️⃣ Deploy no Cloud Foundry

Gerar o artefato `.mtar`

```bash
mbt build
```

Executar deploy no SAP BTP:

```bash
cf deploy mta_archives/<nome_do_artefato>.mtar
```

##  📌 Endpoints

- `GET /embeddings/DocumentChunk` → Retorna os documentos cadastrados
- `POST /embeddings/createEmbeddings` → Cria embeddings para um texto
- `GET /rag/DocumentChunk` → Retorna os documentos no contexto RAG

##  🔒 Segurança

O projeto utiliza:

- Helmet.js para proteção HTTP headers
- CORS para controle de acessos
- Autenticação via xsuaa