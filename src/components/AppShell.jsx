import { useEffect, useState } from "react";
import { siteContent } from "../data/siteContent.js";
import { Icon } from "./Icon.jsx";

export function AppShell({ route, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function navigate(slug) {
    window.location.hash = slug;
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="brand" onClick={() => navigate("/")} aria-label="Ir para o inicio">
          <span className="brand-mark"><Icon name="spark" /></span>
          <span><strong>{siteContent.name}</strong><small>{siteContent.businessType}</small></span>
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegacao principal">
          {siteContent.pages.map(page => (
            <button
              key={page.slug}
              className={route === page.slug ? "is-active" : ""}
              onClick={() => navigate(page.slug)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="header-cta" onClick={() => navigate(siteContent.pages[2]?.slug || "/registros")}>
            Abrir workspace <Icon name="arrow" />
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(current => !current)}
            aria-expanded={menuOpen}
            aria-label="Alternar menu"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <span className="brand-mark"><Icon name="spark" /></span>
          <p>{siteContent.name}</p>
          <small>Produto full stack criado com pesquisa, codigo e validacao automatica.</small>
        </div>
        <div className="footer-links">
          {siteContent.pages.map(page => (
            <button key={page.slug} onClick={() => navigate(page.slug)}>{page.label}</button>
          ))}
        </div>
        <span className="footer-status"><i /> API e interface prontas</span>
      </footer>
    </div>
  );
}
