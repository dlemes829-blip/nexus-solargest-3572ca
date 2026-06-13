import express from "express";
import cors from "cors";
import pg from "pg";
import path from "node:path";
import { existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL?.trim();
const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  : null;

let memoryRecords = [
  {
    "id": "sample-1",
    "title": "Usina Solar Alpha - Localização: SP - Capacidade: 2MW",
    "description": "Usina Solar de demonstracao",
    "status": "active",
    "createdAt": "2026-06-13T17:18:23.784Z"
  },
  {
    "id": "sample-2",
    "title": "Usina Solar Beta - Localização: MG - Capacidade: 1.5MW",
    "description": "Usina Solar de demonstracao",
    "status": "planned",
    "createdAt": "2026-06-12T17:18:23.784Z"
  },
  {
    "id": "sample-3",
    "title": "Usina Solar Gamma - Localização: RJ - Capacidade: 1MW",
    "description": "Usina Solar de demonstracao",
    "status": "planned",
    "createdAt": "2026-06-11T17:18:23.784Z"
  }
];

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "1mb" }));

async function initializeDatabase() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_records (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function listRecords() {
  if (!pool) return memoryRecords;
  const result = await pool.query(
    "SELECT id, data, created_at FROM app_records WHERE kind = $1 ORDER BY created_at DESC",
    ["Usina Solar"],
  );
  return result.rows.map(row => ({ id: row.id, ...row.data, createdAt: row.created_at }));
}

async function createRecord(data) {
  const record = {
    id: randomUUID(),
    title: String(data.title || data.name || "").trim(),
    description: String(data.description || "").trim(),
    status: String(data.status || "active").trim(),
    createdAt: new Date().toISOString(),
  };
  if (!record.title) {
    const error = new Error("O campo title e obrigatorio");
    error.status = 400;
    throw error;
  }
  if (!pool) {
    memoryRecords = [record, ...memoryRecords];
    return record;
  }
  await pool.query(
    "INSERT INTO app_records (id, kind, data) VALUES ($1, $2, $3::jsonb)",
    [record.id, "Usina Solar", JSON.stringify(record)],
  );
  return record;
}

async function updateRecord(id, data) {
  if (!pool) {
    const index = memoryRecords.findIndex(record => record.id === id);
    if (index < 0) return null;
    memoryRecords[index] = {
      ...memoryRecords[index],
      ...data,
      id,
      title: String(data.title ?? memoryRecords[index].title).trim(),
    };
    return memoryRecords[index];
  }
  const current = await pool.query(
    "SELECT data FROM app_records WHERE id = $1 AND kind = $2",
    [id, "Usina Solar"],
  );
  if (current.rowCount === 0) return null;
  const record = { ...current.rows[0].data, ...data, id };
  await pool.query(
    "UPDATE app_records SET data = $1::jsonb, updated_at = NOW() WHERE id = $2 AND kind = $3",
    [JSON.stringify(record), id, "Usina Solar"],
  );
  return record;
}

async function deleteRecord(id) {
  if (!pool) {
    const before = memoryRecords.length;
    memoryRecords = memoryRecords.filter(record => record.id !== id);
    return memoryRecords.length < before;
  }
  const result = await pool.query(
    "DELETE FROM app_records WHERE id = $1 AND kind = $2",
    [id, "Usina Solar"],
  );
  return result.rowCount > 0;
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "SolarGest",
    database: pool ? "postgresql" : "memory",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/info", (_req, res) => {
  res.json({
    name: "SolarGest",
    description: "Plataforma premium para gestão de usinas solares no Brasil, focada em eficiência operacional e insights acionáveis.",
    entityLabel: "Usina Solar",
    entityPlural: "Usinas Solares",
    features: ["Dashboard operacional em tempo real com métricas de desempenho","Cadastro e gerenciamento centralizado de usinas solares","Métricas de geração de energia e eficiência","Insights de manutenção preditiva e automação de processos","Relatórios analíticos personalizáveis para tomada de decisão"],
  });
});

app.get("/api/records", async (_req, res, next) => {
  try {
    res.json(await listRecords());
  } catch (error) {
    next(error);
  }
});

app.post("/api/records", async (req, res, next) => {
  try {
    res.status(201).json(await createRecord(req.body || {}));
  } catch (error) {
    next(error);
  }
});

app.put("/api/records/:id", async (req, res, next) => {
  try {
    const record = await updateRecord(req.params.id, req.body || {});
    if (!record) return res.status(404).json({ error: "Registro nao encontrado" });
    res.json(record);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/records/:id", async (req, res, next) => {
  try {
    const deleted = await deleteRecord(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Registro nao encontrado" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

const distDir = path.join(__dirname, "dist");
app.use(express.static(distDir));
app.use((req, res, next) => {
  const indexPath = path.join(distDir, "index.html");
  if (req.method === "GET" && !req.path.startsWith("/api") && existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Endpoint nao encontrado" });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const status = Number(error.status || 500);
  res.status(status).json({
    error: status >= 500 ? "Erro interno do servidor" : error.message,
  });
});

await initializeDatabase();
app.listen(port, "0.0.0.0", () => {
  console.log(`SolarGest rodando em http://localhost:${port}`);
});
