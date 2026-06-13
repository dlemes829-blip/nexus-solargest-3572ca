# SolarGest

Plataforma premium para gestão de usinas solares no Brasil, focada em eficiência operacional e insights acionáveis.

## Stack

- React 19 + Vite 8
- Node.js + Express 5
- PostgreSQL com fallback local em memoria
- Testes, build de producao, Docker e Render

## Rodar

```bash
npm install
npm run build
npm start
```

Abra http://localhost:3000.

## Desenvolvimento

Em dois terminais:

```bash
npm run dev:api
npm run dev
```

## Banco

Configure `DATABASE_URL` usando o exemplo de `.env.example`.
O schema inicial esta em `database/schema.sql`.

## Validar

```bash
npm run check
```

As fontes de pesquisa usadas no produto estao em `docs/research.md`.
