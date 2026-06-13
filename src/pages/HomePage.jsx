import { Icon } from "../components/Icon.jsx";
import { siteContent } from "../data/siteContent.js";

function go(slug) {
  window.location.hash = slug;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function HomePage() {
  return (
    <>
      <section className="hero-section page-width">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-copy reveal">
          <span className="eyebrow"><i /> Pesquisa aplicada. Produto real.</span>
          <h1>{siteContent.description}</h1>
          <p>
            Uma plataforma criada para {siteContent.audience}, com experiencia multipagina,
            operacao conectada a API e arquitetura pronta para producao.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => go(siteContent.pages[2].slug)}>
              Explorar produto <Icon name="arrow" />
            </button>
            <button className="secondary-action" onClick={() => go(siteContent.pages[1].slug)}>
              Ver dashboard
            </button>
          </div>
          <div className="trust-row">
            <span><Icon name="check" /> Frontend multipagina</span>
            <span><Icon name="check" /> API com persistencia</span>
            <span><Icon name="check" /> Build validado</span>
          </div>
        </div>

        <div className="hero-product">
          <div className="product-window">
            <div className="window-bar"><i /><i /><i /><span>workspace / visao geral</span></div>
            <div className="window-body">
              <aside>
                <span className="mini-brand">N</span>
                <i className="active" /><i /><i /><i />
              </aside>
              <div className="window-content">
                <div className="product-heading"><div><small>Performance</small><strong>Visao operacional</strong></div><span>Tempo real</span></div>
                <div className="mini-metrics">
                  <article><small>Fluxos ativos</small><strong>12</strong><em>+18%</em></article>
                  <article><small>Qualidade</small><strong>98%</strong><em>estavel</em></article>
                  <article><small>Automacoes</small><strong>24</strong><em>online</em></article>
                </div>
                <div className="chart-panel">
                  <div className="chart-bars">{[42, 58, 48, 76, 66, 88, 82, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                  <div className="chart-copy"><small>Crescimento composto</small><strong>+36.4%</strong></div>
                </div>
                <div className="activity-strip"><span><i /> Ultima sincronizacao</span><b>agora</b></div>
              </div>
            </div>
          </div>
          <div className="floating-card floating-card-a"><Icon name="pulse" /><span><small>Sistema</small><b>Operacional</b></span></div>
          <div className="floating-card floating-card-b"><Icon name="database" /><span><small>Dados</small><b>Sincronizados</b></span></div>
        </div>
      </section>

      <section className="signal-strip">
        <div className="page-width">
          <span>ESTRATEGIA</span><i /><span>DESIGN SYSTEM</span><i /><span>REACT</span><i /><span>EXPRESS</span><i /><span>POSTGRESQL</span><i /><span>DEPLOY</span>
        </div>
      </section>

      <section className="feature-section page-width section-space">
        <div className="section-intro">
          <span className="eyebrow">Produto completo</span>
          <h2>Mais profundidade em cada fluxo, sem perder clareza.</h2>
          <p>{siteContent.designDirection}. Cada pagina tem um objetivo e cada acao conversa com a camada de dados.</p>
        </div>
        <div className="feature-bento">
          {siteContent.features.slice(0, 6).map((feature, index) => (
            <article key={feature} className={index === 0 || index === 3 ? "feature-wide" : ""}>
              <span className="feature-number">0{index + 1}</span>
              <div className="feature-symbol"><Icon name={["layers", "chart", "database", "pulse", "check", "spark"][index]} /></div>
              <h3>{feature}</h3>
              <p>Fluxo desenhado para reduzir atrito, dar contexto e manter a operacao mensuravel.</p>
              <button onClick={() => go(siteContent.pages[Math.min(index + 1, 4)].slug)}>Explorar <Icon name="arrow" size={15} /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section page-width">
        <div>
          <span className="eyebrow">Pronto para operar</span>
          <h2>Da ideia ao produto navegavel, testado e publicavel.</h2>
        </div>
        <button className="primary-action" onClick={() => go(siteContent.pages[2].slug)}>Abrir workspace <Icon name="arrow" /></button>
      </section>
    </>
  );
}
