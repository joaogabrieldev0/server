# NLW Agents - Server 🚀

## Descrição
Servidor backend para o projeto NLW Agents, desenvolvido durante o NLW Agents #20, utilizando Node.js, Fastify e banco de dados PostgreSQL com manipulação via Drizzle ORM. O projeto está preparado para desenvolvimento moderno, com validação de tipos, ambiente dockerizado e boas práticas de organização de código.

## Informações Técnicas 🛠️
- **Linguagem:** TypeScript
- **Framework HTTP:** Fastify
- **Banco de Dados:** PostgreSQL (com extensão PGVector para buscas por similaridade)
- **ORM:** Drizzle ORM
- **Validação:** Zod (via fastify-type-provider-zod)
- **Ambiente:** Docker (docker-compose para banco de dados)
- **Variáveis de Ambiente:** Dotenv
- **Formatação e Lint:** BiomeJS (com preset Ultracite)

## Padrões de Projeto e Arquitetura 🏗️
- **Barrel File:** Utilização de arquivos index.ts para reexportação de módulos (ex: schema do banco).
- **Separação de responsabilidades:**
  - `src/server.ts`: inicialização do servidor e registro de rotas/middlewares.
  - `src/db/`: conexão, schema, seed e migrações do banco de dados.
  - `http/routes/`: definição das rotas da API.
- **Validação de ambiente:** Uso de Zod para garantir variáveis de ambiente válidas.
- **Migrations e Seed:** Estrutura pronta para versionamento e popularização do banco.

## Bibliotecas Utilizadas 📦
- [fastify](https://www.fastify.io/): Framework web rápido e eficiente
- [@fastify/cors](https://github.com/fastify/fastify-cors): Suporte a CORS
- [fastify-type-provider-zod](https://github.com/fastify/fastify-type-provider-zod): Integração de validação de tipos com Zod
- [zod](https://zod.dev/): Validação de dados
- [drizzle-orm](https://orm.drizzle.team/): ORM para TypeScript
- [drizzle-kit](https://orm.drizzle.team/docs/overview): Ferramentas de migração Drizzle
- [drizzle-seed](https://github.com/pmndrs/drizzle-seed): Seed de dados para Drizzle
- [postgres](https://github.com/porsager/postgres): Driver PostgreSQL
- [dotenv](https://github.com/motdotla/dotenv): Variáveis de ambiente
- [@biomejs/biome](https://biomejs.dev/): Lint e formatação
- [ultracite](https://github.com/biomejs/ultracite): Preset de configuração para Biome
- [typescript](https://www.typescriptlang.org/): Tipagem estática

## Como rodar ▶️
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Suba o banco de dados com Docker:
   ```bash
   docker compose up -d
   ```
3. Configure o arquivo `.env` com a URL do banco de dados e a porta do servidor:
   ```bash
   # Crie um arquivo .env na raiz do projeto
   touch .env
   
   # Adicione as seguintes variáveis:
   DATABASE_URL="postgresql://docker:docker@localhost:5432/agents"
   PORT=3333
   ```
4. Rode as migrações:
   ```bash
   npx drizzle-kit migrate
   ```
5. Popule o banco (opcional):
   ```bash
   npm run db:seed
   ```
6. Inicie o servidor:
   ```bash
   npm run dev
   ```

O backend estará disponível em: [http://localhost:3333](http://localhost:3333) (ou na porta definida na variável `PORT`).

## Edição
Desenvolvido durante o evento **NLW Agents #20** da Rocketseat.

## Autor
João Gabriel 💡 