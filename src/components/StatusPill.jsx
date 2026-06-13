export function StatusPill({ status }) {
  const normalized = String(status || "planned").toLowerCase();
  const label = normalized === "active" ? "Ativo" : normalized === "paused" ? "Pausado" : "Planejado";
  return <span className={`status-pill status-${normalized}`}><i />{label}</span>;
}
