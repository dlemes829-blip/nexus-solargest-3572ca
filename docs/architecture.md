# Arquitetura

## Frontend

- React 19 e Vite 8
- Cinco paginas reais em `src/pages/`
- Componentes compartilhados e roteamento por hash
- CSS responsivo sem dependencia visual
- Consumo da API em `/api/records` por `src/lib/api.js`

## Backend

- Express 5
- API REST com health check e CRUD
- PostgreSQL quando `DATABASE_URL` estiver configurada
- Fallback em memoria para desenvolvimento imediato

## Qualidade

- Smoke tests com Node
- Build de producao Vite
- Teste real do endpoint `/api/health`
- Dockerfile e Blueprint Render incluidos
