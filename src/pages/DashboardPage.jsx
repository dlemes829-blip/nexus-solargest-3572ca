import { useEffect, useMemo, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { MetricCard } from "../components/MetricCard.jsx";
import { StatusPill } from "../components/StatusPill.jsx";
import { api } from "../lib/api.js";
import { siteContent } from "../data/siteContent.js";

export function DashboardPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      setRecords(await api.listRecords());
      setError("");
    } catch (reason) {
      setError(reason.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);
  const active = useMemo(() => records.filter(record => record.status === "active").length, [records]);
  const planned = Math.max(records.length - active, 0);

  return (
    <section className="app-page page-width">
      <div className="page-heading">
        <div><span className="eyebrow">Centro de comando</span><h1>Dashboard operacional</h1><p>Acompanhe os sinais mais importantes de {siteContent.entityPlural} e aja sem trocar de contexto.</p></div>
        <button className="secondary-action" onClick={load}><Icon name="refresh" /> Atualizar dados</button>
      </div>

      {error && <div className="alert error-alert">{error}</div>}
      <div className="metrics-grid">
        <MetricCard label={siteContent.entityPlural} value={loading ? "--" : records.length} detail="volume total na API" icon="database" tone="violet" />
        <MetricCard label="Ativos agora" value={loading ? "--" : active} detail="itens em operacao" icon="pulse" tone="cyan" />
        <MetricCard label="Planejados" value={loading ? "--" : planned} detail="proximas entregas" icon="layers" tone="amber" />
        <MetricCard label="Saude da API" value={error ? "Atencao" : "Online"} detail="monitoramento local" icon="check" tone="green" />
      </div>

      <div className="dashboard-grid">
        <article className="panel chart-large">
          <div className="panel-heading"><div><small>Ritmo de operacao</small><h2>Evolucao semanal</h2></div><span className="positive">+24.8%</span></div>
          <div className="area-chart">
            <svg viewBox="0 0 720 260" preserveAspectRatio="none" role="img" aria-label="Grafico de evolucao">
              <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity=".45"/><stop offset="1" stopColor="var(--primary)" stopOpacity="0"/></linearGradient></defs>
              <path className="grid-line" d="M0 50H720M0 120H720M0 190H720M0 250H720"/>
              <path className="area" d="M0 220 C80 205 90 160 160 174 S260 126 330 142 S430 72 500 98 S610 42 720 54 V260 H0Z"/>
              <path className="line" d="M0 220 C80 205 90 160 160 174 S260 126 330 142 S430 72 500 98 S610 42 720 54"/>
            </svg>
            <div className="chart-axis"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span><span>Dom</span></div>
          </div>
        </article>

        <article className="panel health-panel">
          <div className="panel-heading"><div><small>Qualidade</small><h2>Saude do produto</h2></div><Icon name="pulse" /></div>
          <div className="health-ring"><div><strong>96</strong><span>/100</span></div></div>
          <ul className="health-list">
            <li><span><i className="green" />Frontend</span><b>Estavel</b></li>
            <li><span><i className="cyan" />API</span><b>Respondendo</b></li>
            <li><span><i className="violet" />Dados</span><b>Sincronizados</b></li>
          </ul>
        </article>

        <article className="panel activity-panel">
          <div className="panel-heading"><div><small>Atividade recente</small><h2>Ultimos registros</h2></div><button onClick={() => { window.location.hash = siteContent.pages[2].slug; }}>Ver todos</button></div>
          <div className="activity-list">
            {loading ? <div className="skeleton-list" /> : records.slice(0, 5).map((record, index) => (
              <div className="activity-item" key={record.id}>
                <span className="activity-index">{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{record.title}</strong><small>{record.description || "Sem descricao adicional"}</small></div>
                <StatusPill status={record.status} />
              </div>
            ))}
            {!loading && records.length === 0 && <div className="empty-panel">Ainda nao existem dados. Crie o primeiro registro no workspace.</div>}
          </div>
        </article>

        <article className="panel next-actions">
          <div className="panel-heading"><div><small>Prioridades</small><h2>Proximas acoes</h2></div></div>
          {siteContent.features.slice(0, 4).map((feature, index) => (
            <div className="action-row" key={feature}><span>{index + 1}</span><div><strong>{feature}</strong><small>{index % 2 ? "Em avaliacao" : "Pronto para executar"}</small></div><Icon name="arrow" /></div>
          ))}
        </article>
      </div>
    </section>
  );
}
