import { Icon } from "../components/Icon.jsx";
import { siteContent } from "../data/siteContent.js";

export function InsightsPage() {
  return (
    <section className="app-page page-width">
      <div className="page-heading insight-heading">
        <div><span className="eyebrow">Inteligencia aplicada</span><h1>Pesquisa que vira decisao de produto.</h1><p>O Nexus consultou fontes externas em tempo real antes de escrever o codigo e preservou a rastreabilidade abaixo.</p></div>
        <div className="research-date"><Icon name="pulse" /><span><small>Pesquisa executada</small><b>{new Date(siteContent.researchedAt).toLocaleDateString("pt-BR")}</b></span></div>
      </div>

      <div className="insight-summary">
        <article><small>Fontes lidas</small><strong>{siteContent.researchHighlights.length}</strong><span>referencias registradas</span></article>
        <article><small>Paginas planejadas</small><strong>{siteContent.pages.length}</strong><span>jornadas independentes</span></article>
        <article><small>Capacidades</small><strong>{siteContent.features.length}</strong><span>recursos priorizados</span></article>
      </div>

      <div className="insights-layout">
        <article className="panel radar-panel">
          <div className="panel-heading"><div><small>Mapa de valor</small><h2>Equilibrio do produto</h2></div><span className="positive">Pesquisa + UX</span></div>
          <div className="radar-wrap">
            <svg viewBox="0 0 420 360" role="img" aria-label="Radar de capacidades">
              <g className="radar-grid"><polygon points="210,30 365,120 330,300 90,300 55,120"/><polygon points="210,75 320,138 295,265 125,265 100,138"/><polygon points="210,120 275,157 260,230 160,230 145,157"/><path d="M210 30V300M55 120l310 180M365 120 90 300M55 120h310M90 300l275-180"/></g>
              <polygon className="radar-value" points="210,55 335,135 300,275 118,260 82,135"/>
              <g className="radar-points"><circle cx="210" cy="55" r="5"/><circle cx="335" cy="135" r="5"/><circle cx="300" cy="275" r="5"/><circle cx="118" cy="260" r="5"/><circle cx="82" cy="135" r="5"/></g>
              <g className="radar-labels"><text x="210" y="18">Experiencia</text><text x="372" y="118">Dados</text><text x="326" y="326">Escala</text><text x="48" y="326">Conversao</text><text x="8" y="118">Confianca</text></g>
            </svg>
          </div>
        </article>

        <article className="panel research-panel">
          <div className="panel-heading"><div><small>Leitura externa</small><h2>Principais referencias</h2></div><Icon name="external" /></div>
          <div className="research-list">
            {siteContent.researchHighlights.map((source, index) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{source.title}</strong><p>{source.summary}</p></div>
                <Icon name="external" size={16} />
              </a>
            ))}
            {siteContent.researchHighlights.length === 0 && <div className="empty-panel">As fontes externas estao documentadas em docs/research.md.</div>}
          </div>
        </article>
      </div>

      <section className="decision-section">
        <div className="section-intro"><span className="eyebrow">Decisoes rastreaveis</span><h2>O que a pesquisa mudou no produto</h2></div>
        <div className="decision-grid">
          {siteContent.pages.map((page, index) => (
            <article key={page.slug}><span>0{index + 1}</span><h3>{page.label}</h3><p>{page.purpose}</p></article>
          ))}
        </div>
      </section>
    </section>
  );
}
