import { Icon } from "./Icon.jsx";

export function MetricCard({ label, value, detail, icon = "chart", tone = "violet" }) {
  return (
    <article className={`metric-card tone-${tone}`}>
      <div className="metric-icon"><Icon name={icon} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
