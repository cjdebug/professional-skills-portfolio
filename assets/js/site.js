/* ==========================================================
   SITE.JS - runs on every page.
   It builds the parts that repeat, so each HTML page only holds
   its own content:  menu bar, footer, week strip, previous/next
   buttons, the week cards on the home page, photo placeholders.

   TO RENAME A WEEK OR CHANGE ITS SKILLS: edit the PAGES list below.
   ========================================================== */

const OWNER = "Chanuka Jayasundara";
const COURSE = "Professional Skills (IT1215) · SCU · Year 2 Semester 2 · 2026";

/* One line per page, in reading order. */
const PAGES = [
  {
    file: "week1.html",
    label: "Week 1",
    title: "Introduction to Professional Skills",
    skills: ["Foundation for all six skills"],
  },
  {
    file: "week2.html",
    label: "Week 2",
    title: "Portfolio Writing and the Paper Craft Challenge",
    skills: ["Teamwork", "Personal branding"],
  },
  {
    file: "week3.html",
    label: "Week 3",
    title: "Interview Skills",
    skills: ["Career readiness", "Communication & etiquette"],
  },
  {
    file: "week4.html",
    label: "Week 4",
    title: "CV Writing",
    skills: ["Career readiness", "Personal branding"],
  },
  {
    file: "week5.html",
    label: "Week 5",
    title: "Emotional Intelligence",
    skills: ["Self-awareness"],
  },
  {
    file: "week6.html",
    label: "Week 6",
    title: "Building a Personal Brand",
    skills: ["Personal branding"],
  },
  {
    file: "week7.html",
    label: "Week 7",
    title: "Professional Etiquette in Communication",
    skills: ["Communication & etiquette"],
  },
  {
    file: "week8.html",
    label: "Week 8",
    title: "The Office Survival Challenge",
    skills: ["Activity"],
  },
  {
    file: "week9.html",
    label: "Week 9",
    title: "Negotiation Skills",
    skills: ["Negotiation"],
  },
  {
    file: "project.html",
    label: "Project",
    title: "Zoo Awareness Program",
    skills: ["Group project"],
    isProject: true,
  },
];

const here = location.pathname.split("/").pop() || "index.html";
const current = PAGES.findIndex((p) => p.file === here);
const $ = (selector) => document.querySelector(selector);

/* ---------- Menu bar ---------- */
function buildHeader() {
  const aria = (isHere) => (isHere ? ' aria-current="page"' : "");
  const onWeek = current >= 0 && !PAGES[current].isProject;
  $("#site-header").innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <div class="nav-bar"><div class="wrap">
      <nav class="nav" aria-label="Main">
        <a class="logo" href="index.html">${OWNER}</a>
        <button class="menu-btn" type="button" aria-expanded="false">Menu</button>
        <div class="nav-links">
          <a href="index.html"${aria(here === "index.html" || here === "")}>Home</a>
          <a href="index.html#weeks"${aria(onWeek)}>Weekly notes</a>
          <a href="project.html"${aria(here === "project.html")}>Group project</a>
          <a class="btn" href="week1.html">Start reading</a>
        </div>
      </nav>
    </div></div>`;

  const button = $(".menu-btn");
  const links = $(".nav-links");
  button.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    button.setAttribute("aria-expanded", open);
  });
}

/* ---------- Footer ---------- */
function buildFooter() {
  $("#site-footer").innerHTML = `
    <footer class="footer"><div class="wrap">
      <span><b>${OWNER}</b> · ${COURSE}</span>
      <span>Professional Skills portfolio</span>
    </div></footer>`;
}

/* ---------- Week strip (1 2 3 ... Project) ---------- */
function buildStrip() {
  const strip = $("#strip");
  if (!strip) return;
  strip.innerHTML = PAGES.map((p, i) => {
    const text = p.isProject ? "Project" : i + 1;
    const now = i === current ? ' aria-current="page"' : "";
    return `<a href="${p.file}" title="${p.label}: ${p.title}"${now}>${text}</a>`;
  }).join("");
}

/* ---------- Previous / next buttons ---------- */
function buildPager() {
  const pager = $("#pager");
  if (!pager || current < 0) return;
  const prev = PAGES[current - 1];
  const next = PAGES[current + 1];
  pager.innerHTML =
    (prev
      ? `<a class="btn btn-back" href="${prev.file}">${prev.label}: ${prev.title}</a>`
      : `<span></span>`) +
    (next
      ? `<a class="btn" href="${next.file}">${next.label}: ${next.title}</a>`
      : `<a class="btn" href="index.html">Back to home</a>`);
}

/* ---------- Week cards on the home page ---------- */
function buildWeekGrid() {
  const grid = $("#week-grid");
  if (!grid) return;
  grid.innerHTML = PAGES.map(
    (p, i) => `
    <a class="week-card${p.isProject ? " project" : ""}" href="${p.file}">
      <b>${p.isProject ? "Group" : String(i + 1).padStart(2, "0")}</b>
      <h3>${p.title}</h3>
      <span class="tags">${p.skills.map((s) => `<span class="tag">${s}</span>`).join("")}</span>
    </a>`,
  ).join("");
}

/* ---------- Photos ----------
   Every photo is written in the HTML as:
     <figure class="photo"><img src="assets/img/NAME.jpg" alt="..."><figcaption>...</figcaption></figure>
   If NAME.jpg has not been added yet, a green box shows the file name to use. */
function setupPhotos() {
  document.querySelectorAll(".photo").forEach((figure) => {
    const img = figure.querySelector("img");
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.innerHTML = `<span>Add your photo here<code>${img.getAttribute("src").split("/").pop()}</code></span>`;
    figure.prepend(slot);

    const markMissing = () => figure.classList.add("missing");
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  /* click a photo to see it bigger */
  const box = document.createElement("dialog");
  box.innerHTML = '<img alt="">';
  document.body.append(box);
  box.addEventListener("click", () => box.close());
  document.addEventListener("click", (event) => {
    const img = event.target.closest(".photo:not(.missing) img");
    if (!img) return;
    box.querySelector("img").src = img.src;
    box.querySelector("img").alt = img.alt;
    box.showModal();
  });
}

buildHeader();
buildFooter();
buildStrip();
buildPager();
buildWeekGrid();
setupPhotos();
