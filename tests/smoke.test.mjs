import assert from "node:assert/strict";
import fs from "node:fs";

const required = [
  "index.html",
  "src/main.jsx",
  "src/App.jsx",
  "src/components/AppShell.jsx",
  "src/data/siteContent.js",
  "src/lib/api.js",
  "src/pages/HomePage.jsx",
  "src/pages/DashboardPage.jsx",
  "src/pages/RecordsPage.jsx",
  "src/pages/InsightsPage.jsx",
  "src/pages/AboutPage.jsx",
  "src/styles.css",
  "server.js",
  "database/schema.sql",
];

for (const file of required) {
  assert.ok(fs.existsSync(file), `Arquivo ausente: ${file}`);
  assert.ok(fs.statSync(file).size > 0, `Arquivo vazio: ${file}`);
}

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert.equal(pkg.type, "module");
assert.ok(pkg.scripts.build);
assert.ok(pkg.scripts.start);

const app = fs.readFileSync("src/App.jsx", "utf8");
assert.match(app, /export default/);
assert.match(app, /HomePage/);
assert.match(app, /DashboardPage/);

const api = fs.readFileSync("src/lib/api.js", "utf8");
assert.match(api, /\/api\/records/);
assert.match(api, /createRecord/);

const server = fs.readFileSync("server.js", "utf8");
assert.match(server, /\/api\/health/);
assert.match(server, /DATABASE_URL/);

console.log("Smoke tests aprovados");
