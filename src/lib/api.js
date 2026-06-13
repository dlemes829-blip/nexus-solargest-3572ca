async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "A API nao conseguiu concluir a operacao.");
  return data;
}

export const api = {
  listRecords: () => request("/api/records"),
  createRecord: data => request("/api/records", { method: "POST", body: JSON.stringify(data) }),
  updateRecord: (id, data) => request(`/api/records/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteRecord: id => request(`/api/records/${id}`, { method: "DELETE" }),
  health: () => request("/api/health"),
};
