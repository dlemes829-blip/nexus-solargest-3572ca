import { Icon } from "../components/Icon.jsx";
import { siteContent } from "../data/siteContent.js";

export function AboutPage() {
  const steps = [
    ["01", "Descoberta", "O pedido vira objetivos, publico, riscos e perguntas de pesquisa."],
    ["02", "Pesquisa externa", "Fontes atuais sao buscadas, lidas e salvas no projeto."],
    ["03", "Arquitetura", "Paginas, componentes, API, banco e deploy sao definidos antes do codigo."],
    ["04", "Construcao", "Frontend e backend sao gravados em arquivos reais e independentes."],
    ["05", "Validacao", "Dependencias, testes, build e smoke test da API rodam automaticamente."],
  ];
  return (
    <section className="app-page page-width about-page">
      <div className="about-hero">
        <div><span className="eyebrow">Como foi construido</span><h1>Engenharia com contexto, nao geracao aleatoria.</h1><p>{siteContent.name} combina pesquisa, produto, design e software para atender {siteContent.audience}.</p></div>
        <div className="architecture-card">
          <span className="arch-node node-client">React 19<small>Interface</small></span>
          <i className="arch-line line-one" />
          <span className="arch-node node-api">Express 5<small>API REST</small></span>
          <i className="arch-line line-two" />
          <span className="arch-node node-data">PostgreSQL<small>Persistencia</small></span>
          <span className="arch-core"><Icon name="spark" size={28} /><b>NEXUS</b></span>
        </div>
      </div>

      <section className="process-section">
        <div className="section-intro"><span className="eyebrow">Processo autonomo</span><h2>Cinco etapas antes de declarar o projeto pronto.</h2></div>
        <div className="process-list">
          {steps.map(step => <article key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div><Icon name="check" /></article>)}
        </div>
      </section>

      <section className="stack-section">
        <div><span className="eyebrow">Arquitetura entregue</span><h2>Codigo que pode ser aberto, editado, testado e publicado.</h2></div>
        <div className="stack-grid">
          <article><Icon name="layers" /><strong>Frontend</strong><p>React, Vite, componentes compartilhados, cinco paginas e design responsivo.</p></article>
          <article><Icon name="database" /><strong>Backend</strong><p>Express, endpoints CRUD, validacao, health check e PostgreSQL com modo local.</p></article>
          <article><Icon name="check" /><strong>Qualidade</strong><p>Smoke tests, build de producao, Docker e configuracao de deploy.</p></article>
        </div>
      </section>
    </section>
  );
}
