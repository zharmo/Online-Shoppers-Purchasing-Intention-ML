// Results copied from the notebook output and report (test set, 2,441 sessions).
const METRICS = ["Accuracy", "Precision", "Recall", "F1-Score", "ROC-AUC"];
const RESULTS = {
  "Logistic Regression": [0.8513, 0.5164, 0.7853, 0.6231, 0.9109],
  "Decision Tree":       [0.8603, 0.5385, 0.7513, 0.6273, 0.8551],
  "Random Forest":       [0.8984, 0.6782, 0.6675, 0.6728, 0.9272]
};
const ALGOS = [
  { name: "Logistic Regression", role: "Baseline",
    what: "A supervised classifier that estimates the probability that an observation belongs to a class.",
    used: "Predicts purchase vs. no purchase and provides the baseline for the other models. Settings: max_iter=2000, class_weight=balanced." },
  { name: "Decision Tree", role: "Rule-based",
    what: "Predicts using a tree of decision rules that split the data into branches by feature conditions.",
    used: "Classifies sessions into purchase and non-purchase categories. Settings: max_depth=10, class_weight=balanced." },
  { name: "Random Forest", role: "Ensemble · best model",
    what: "An ensemble that combines the predictions of many decision trees instead of relying on a single tree.",
    used: "Predicts purchasing intention and is compared with the other models. Settings: 200 trees, max_depth=15, class_weight=balanced_subsample." }
];
const best = (i) => Math.max(...Object.values(RESULTS).map(r => r[i]));
const f = (v) => v.toFixed(4);

// Algorithm cards
document.getElementById("algo-cards").innerHTML = ALGOS.map(a => {
  const r = RESULTS[a.name];
  return `<article class="card algo ${a.name === "Random Forest" ? "top" : ""}">
    <span class="badge">${a.role}</span><h3>${a.name}</h3>
    <p>${a.what}</p><p><b>In this project:</b> ${a.used}</p>
    <ul class="mini">${METRICS.map((m, i) => `<li><span>${m}</span><b>${f(r[i])}</b></li>`).join("")}</ul></article>`;
}).join("");

// Metric cards: best model per metric
document.getElementById("metric-cards").innerHTML = METRICS.map((m, i) => {
  const top = Object.keys(RESULTS).find(k => RESULTS[k][i] === best(i));
  return `<div class="kpi"><span>${m}</span><b>${f(best(i))}</b><span>Best: ${top}</span></div>`;
}).join("");

// Results table
document.querySelector("#results tbody").innerHTML = Object.entries(RESULTS).map(([n, r]) =>
  `<tr class="${n === "Random Forest" ? "hl" : ""}"><td>${n}</td>${r.map((v, i) =>
    `<td class="${v === best(i) ? "best" : ""}">${f(v)}</td>`).join("")}</tr>`).join("");

// Interactive bar chart (no external library, works offline)
const chips = document.getElementById("chips"), bars = document.getElementById("bars");
function draw(i) {
  chips.querySelectorAll("button").forEach((b, j) => b.classList.toggle("on", j === i));
  bars.innerHTML = Object.entries(RESULTS).map(([n, r]) => `
    <div class="bar-row"><span class="bl">${n}</span>
    <div class="track"><div class="fill ${r[i] === best(i) ? "win" : ""}" style="width:0"></div></div>
    <b>${f(r[i])}</b></div>`).join("");
  requestAnimationFrame(() => bars.querySelectorAll(".fill").forEach((el, k) =>
    el.style.width = (Object.values(RESULTS)[k][i] * 100) + "%"));
}
chips.innerHTML = METRICS.map((m, i) => `<button type="button" data-i="${i}">${m}</button>`).join("");
chips.addEventListener("click", e => { if (e.target.dataset.i) draw(+e.target.dataset.i); });
draw(0);

// Mobile menu + active link highlighting
const burger = document.getElementById("burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
const links = [...menu.querySelectorAll("a")];
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => io.observe(s));
