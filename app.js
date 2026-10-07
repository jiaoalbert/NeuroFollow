const $ = (s) => document.querySelector(s);
let active = null,
  tab = "recommendation",
  filter = "All findings",
  savedOnly = false,
  result = null;
let saved = [];
try {
  saved = JSON.parse(localStorage.getItem("neurofollow-saved") || "[]");
  if (!Array.isArray(saved)) saved = [];
  if (localStorage.getItem("neurofollow-theme") === "light")
    document.body.classList.add("light");
} catch {}
const safeStore = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};
const toast = (t) => {
  $("#toast").textContent = t;
  $("#toast").style.opacity = 1;
  setTimeout(() => ($("#toast").style.opacity = 0), 2400);
};
function render() {
  const q = $("#search").value.toLowerCase();
  const list = topics.filter(
    (t) =>
      (filter === "All findings" || t.category === filter) &&
      (!savedOnly || saved.includes(t.id)) &&
      (t.name + " " + t.desc).toLowerCase().includes(q),
  );
  $("#cards").innerHTML =
    list
      .map(
        (t) =>
          `<button class="card" data-topic="${t.id}" style="--color:${t.color}"><div class="card-top"><span class="topic-icon" aria-hidden="true">${t.icon}</span><span class="tag">${t.id === "pineal" ? "ACR 2026 algorithm" : t.refs.includes("acr") ? "ACR + society guidance" : t.category === "Vascular" ? "Vascular" : t.category === "Tumors" ? "Tumor" : "Incidental finding"}</span></div><h3>${t.name}</h3><p>${t.desc}</p><div class="card-bottom"><span>▤ ${t.refs.length} ${t.refs.length === 1 ? "source" : "sources"}</span><span>Explore topic ↗</span></div></button>`,
      )
      .join("") ||
    '<p class="notice">No topics found. Try another search or save a topic from its recommendation panel.</p>';
  $("#saved-count").textContent = saved.length;
  document
    .querySelectorAll("[data-topic]")
    .forEach((b) => (b.onclick = () => openTopic(b.dataset.topic)));
}
$("#topic-nav").innerHTML = topics
  .map(
    (t) =>
      `<button data-topic="${t.id}" style="--color:${t.color}"><span class="nav-dot"></span>${t.name}</button>`,
  )
  .join("");
$("#topic-nav")
  .querySelectorAll("button")
  .forEach((b) => (b.onclick = () => openTopic(b.dataset.topic)));
function openTopic(id) {
  active = topics.find((t) => t.id === id);
  tab = "recommendation";
  result = null;
  $("#detail-title").textContent = active.name;
  $("#detail-category").textContent = active.category.toUpperCase();
  renderDetail();
  $("#detail").showModal();
}
const caseDrafts = {};
function escapeHTML(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function fieldHTML(f, values) {
  const value = values[f.key] ?? "";
  const control =
    f.type === "number"
      ? `<input name="${f.key}" type="number" min="${f.min}" max="${f.max}" step="any" value="${escapeHTML(value)}" placeholder="Enter measured value" required>`
      : `<select name="${f.key}" required><option value="">Select an answer…</option>${f.options.map(([v, label]) => `<option value="${v}" ${value === v ? "selected" : ""}>${label}</option>`).join("")}</select>`;
  return `<label class="field">${f.label}${control}${f.help ? `<small>${f.help}</small>` : ""}</label>`;
}
function renderResult() {
  if (!result) return;
  const t = active;
  $("#result-area").innerHTML =
    `<section class="result result-${result.status}"><div class="eyebrow">${result.status === "incomplete" ? "INPUT REVIEW REQUIRED" : "SOURCE-BASED REFERENCE PATHWAY"}</div><h3 style="margin-top:13px">${escapeHTML(result.title)}</h3><div class="recommendation-section"><h4>Imaging / follow-up</h4><p>${escapeHTML(result.imaging)}</p></div><div class="recommendation-section"><h4>Clinical team considerations</h4><p>${escapeHTML(result.clinical)}</p></div><div class="recommendation-section rationale"><h4>Why this pathway?</h4><p>${escapeHTML(result.rationale)}</p></div><div class="branch-sources">${result.refs.map((k) => `<a href="${sources[k].url}" target="_blank" rel="noopener noreferrer">${escapeHTML(sources[k].type)} · ${escapeHTML(sources[k].title.split(".")[0])} ↗</a>`).join("")}</div><div class="result-actions"><button class="secondary" id="result-sources">Review cited evidence ↗</button><button class="secondary" id="copy">Copy recommendation</button><button class="secondary" id="save">${saved.includes(t.id) ? "★ Saved" : "☆ Save topic"}</button></div></section><p class="notice">Clinical decisions require review of original evidence and patient context. This reference does not select a procedure or replace specialist assessment.</p>`;
  $("#result-sources").onclick = () => {
    tab = "sources";
    renderDetail();
  };
  $("#copy").onclick = async () => {
    const inputs = fieldsFor(t.id)
      .map((f) => {
        const value = caseDrafts[t.id]?.[f.key];
        return (
          f.label +
          ": " +
          (f.type === "number"
            ? value
            : f.options.find((o) => o[0] === value)?.[1] || "Not entered")
        );
      })
      .join("\n");
    const text = `${t.name}\n${inputs}\n\n${result.title}\nImaging: ${result.imaging}\nClinical team: ${result.clinical}\nRationale: ${result.rationale}\n\nSources:\n${result.refs.map((k) => sources[k].title + " " + sources[k].url).join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      toast("Recommendation, context, and citations copied");
    } catch {
      toast("Clipboard unavailable in this browser");
    }
  };
  $("#save").onclick = () => {
    saved = saved.includes(t.id)
      ? saved.filter((id) => id !== t.id)
      : [...saved, t.id];
    safeStore("neurofollow-saved", JSON.stringify(saved));
    $("#save").textContent = saved.includes(t.id) ? "★ Saved" : "☆ Save topic";
    render();
  };
}
function renderDetail() {
  document
    .querySelectorAll("[data-tab]")
    .forEach((b) => b.classList.toggle("selected", b.dataset.tab === tab));
  const t = active;
  let html = "";
  if (tab === "sources")
    html =
      t.refs
        .map((k) => {
          const s = sources[k];
          return `<article class="source"><span class="tag">${s.type}</span><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title} ↗</a><p>${s.note}</p><small class="verification ${s.verified ? "verified" : ""}">${s.verified ? "✓ Full text + flowcharts reviewed from supplied PDF" : "External reference · full text not retrieved in this environment"}</small></article>`;
        })
        .join("") +
      '<p class="notice">The supplied 2026 ACR pineal article was reviewed directly. Other links identify published radiology reviews or specialty guidance; network restrictions prevented independent retrieval. Older guidelines are dated explicitly and should be checked against newer guidance. This is not a systematic literature review.</p>';
  else if (tab === "overview")
    html = `<div class="notes"><p>${t.notes}</p><h3>What changes management?</h3><ul>${schemas[t.id].map((f) => `<li>${f.label}${f.help ? " — " + f.help : ""}</li>`).join("")}</ul><p><strong>Scope:</strong> Adult educational reference. Imaging, symptoms, prior studies, patient fitness, and preferences can change the plan. The result separates surveillance from clinical team considerations and gives a source-linked rationale.</p><button class="secondary" id="view-sources">Review cited sources ↗</button></div>`;
  else
    html = `<div class="pathway-intro"><span class="tag">${t.id === "pineal" ? "ACR 2026 · Figures 1–2" : "Finding-specific assessment"}</span><p>Answer the criteria relevant to ${t.name.toLowerCase()}. Unknown answers are kept explicit; no normal findings are assumed.</p></div><form id="recommend-form"><div class="form-grid">${fieldsFor(
      t.id,
    )
      .map((f) => fieldHTML(f, caseDrafts[t.id] || {}))
      .join(
        "",
      )}</div><button class="primary" type="submit">Generate recommendation ↗</button><button class="secondary reset-case" type="button" id="reset-case">Reset case</button></form><div id="result-area" aria-live="polite"></div>`;
  $("#detail-body").innerHTML = html;
  $("#view-sources")?.addEventListener("click", () => {
    tab = "sources";
    renderDetail();
  });
  const form = $("#recommend-form");
  if (form) {
    form.addEventListener("input", () => {
      caseDrafts[t.id] = Object.fromEntries(new FormData(form));
      result = null;
      if (
        caseDrafts[t.id].emergency === "yes" ||
        (caseDrafts[t.id].age === "child" &&
          caseDrafts[t.id].emergency === "no")
      ) {
        result = recommend(t.id, caseDrafts[t.id]);
        renderResult();
      } else
        $("#result-area").innerHTML =
          '<p class="notice">Inputs changed. Generate a new recommendation to update the pathway.</p>';
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      caseDrafts[t.id] = Object.fromEntries(new FormData(form));
      result = recommend(t.id, caseDrafts[t.id]);
      renderResult();
      $("#result-area").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
    $("#reset-case").onclick = () => {
      delete caseDrafts[t.id];
      result = null;
      renderDetail();
    };
    renderResult();
  }
}
$("#close").onclick = () => $("#detail").close();
$("#detail").addEventListener("click", (e) => {
  if (e.target === $("#detail")) {
    const r = e.target.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      e.target.close();
  }
});
document.querySelectorAll("[data-tab]").forEach(
  (b) =>
    (b.onclick = () => {
      tab = b.dataset.tab;
      renderDetail();
    }),
);
$("#search").oninput = render;
document.querySelectorAll("[data-filter]").forEach(
  (b) =>
    (b.onclick = () => {
      filter = b.dataset.filter;
      document
        .querySelectorAll("[data-filter]")
        .forEach((x) => x.classList.toggle("selected", x === b));
      render();
    }),
);
$("#theme").onclick = () => {
  document.body.classList.toggle("light");
  safeStore(
    "neurofollow-theme",
    document.body.classList.contains("light") ? "light" : "dark",
  );
  $("#theme").setAttribute(
    "aria-label",
    document.body.classList.contains("light")
      ? "Toggle dark mode"
      : "Toggle light mode",
  );
};
$("#saved-nav").onclick = () => {
  savedOnly = true;
  $("#saved-nav").classList.add("active");
  $("#browse").classList.remove("active");
  render();
};
$("#browse").onclick = () => {
  savedOnly = false;
  $("#browse").classList.add("active");
  $("#saved-nav").classList.remove("active");
  render();
};
document.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !$("#detail").open &&
    !["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    e.preventDefault();
    $("#search").focus();
  }
});
$("#about").onclick = () => {
  $("#detail-title").textContent = "Evidence, connected.";
  $("#detail-category").textContent = "OUR APPROACH";
  $("#tabs").style.display = "none";
  $("#detail-body").innerHTML =
    '<div class="notes"><p>NeuroFollow brings published neuroimaging management guidance into one searchable reference. Sources include the supplied 2026 ACR pineal algorithm, an ACR pituitary white paper, specialty society guidelines, and radiology reviews. Each recommendation identifies its supporting source.</p><p>These are simplified educational pathways. They are not validated clinical algorithms, and this reference set is not a systematic or current literature review. Source publication dates and evidence type are available in each topic.</p><p>Review the original articles, current guidance, imaging, and patient context before acting. Case inputs stay in memory and are cleared on page reload. Only saved topic identifiers and the theme are stored in your browser.</p></div>';
  $("#detail").showModal();
};
$("#detail").addEventListener("close", () => ($("#tabs").style.display = ""));
render();
