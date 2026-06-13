import { useEffect, useMemo, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { StatusPill } from "../components/StatusPill.jsx";
import { api } from "../lib/api.js";
import { siteContent } from "../data/siteContent.js";

const emptyForm = { title: "", description: "", status: "active" };

export function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const filtered = useMemo(() => records.filter(record => {
    const text = `${record.title} ${record.description || ""}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }), [records, query]);

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const saved = editingId
        ? await api.updateRecord(editingId, form)
        : await api.createRecord(form);
      setRecords(current => editingId
        ? current.map(record => record.id === editingId ? saved : record)
        : [saved, ...current]);
      setForm(emptyForm);
      setEditingId(null);
      setError("");
    } catch (reason) {
      setError(reason.message);
    } finally {
      setSaving(false);
    }
  }

  function edit(record) {
    setEditingId(record.id);
    setForm({ title: record.title, description: record.description || "", status: record.status || "active" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id) {
    if (!window.confirm("Remover este registro permanentemente?")) return;
    try {
      await api.deleteRecord(id);
      setRecords(current => current.filter(record => record.id !== id));
    } catch (reason) {
      setError(reason.message);
    }
  }

  return (
    <section className="app-page page-width">
      <div className="page-heading">
        <div><span className="eyebrow">Workspace conectado</span><h1>Gestao de {siteContent.entityPlural}</h1><p>Crie, edite, pesquise e remova dados usando a API real do projeto.</p></div>
        <span className="api-badge"><i /> API conectada</span>
      </div>

      {error && <div className="alert error-alert">{error}<button onClick={() => setError("")}>Fechar</button></div>}
      <div className="records-layout">
        <form className="record-form panel" onSubmit={submit}>
          <div className="panel-heading"><div><small>{editingId ? "Edicao" : "Novo cadastro"}</small><h2>{editingId ? "Atualizar" : "Adicionar"} {siteContent.entityLabel}</h2></div><span className="form-step">01</span></div>
          <label><span>Titulo</span><input required value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder={`Nome do ${siteContent.entityLabel}`} /></label>
          <label><span>Descricao</span><textarea value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} placeholder="Contexto, objetivo e detalhes importantes" /></label>
          <label><span>Status</span><select value={form.status} onChange={event => setForm({ ...form, status: event.target.value })}><option value="active">Ativo</option><option value="planned">Planejado</option><option value="paused">Pausado</option></select></label>
          <div className="form-actions">
            {editingId && <button type="button" className="secondary-action" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancelar</button>}
            <button className="primary-action" disabled={saving}>{saving ? "Salvando..." : <><Icon name={editingId ? "check" : "plus"} /> {editingId ? "Salvar alteracoes" : "Criar registro"}</>}</button>
          </div>
        </form>

        <div className="records-panel panel">
          <div className="records-toolbar">
            <div><small>Base de dados</small><h2>{records.length} {siteContent.entityPlural}</h2></div>
            <div className="search-box"><span>⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Pesquisar..." /></div>
          </div>

          <div className="records-table">
            <div className="table-head"><span>Registro</span><span>Status</span><span>Atualizacao</span><span>Acoes</span></div>
            {loading ? <div className="skeleton-list tall" /> : filtered.map(record => (
              <div className="table-row" key={record.id}>
                <div className="record-identity"><span>{record.title.slice(0, 2).toUpperCase()}</span><div><strong>{record.title}</strong><small>{record.description || "Sem descricao"}</small></div></div>
                <StatusPill status={record.status} />
                <time>{record.createdAt ? new Date(record.createdAt).toLocaleDateString("pt-BR") : "Agora"}</time>
                <div className="row-actions"><button onClick={() => edit(record)}>Editar</button><button className="danger-button" onClick={() => remove(record.id)} aria-label="Remover"><Icon name="trash" size={16} /></button></div>
              </div>
            ))}
            {!loading && filtered.length === 0 && <div className="empty-panel">{query ? "Nenhum resultado para esta busca." : `Crie o primeiro ${siteContent.entityLabel} usando o formulario.`}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
