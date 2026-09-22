const facts = [
  "I built Ethereum and Chia mining rigs because apparently one kind of hardware tinkering wasn't enough.",
  "My favorite product decisions usually start with a constraint.",
  "I tend to trust a scrappy prototype more than a beautiful assumption.",
  "I like products where software and physical behavior have to agree.",
  "A good roadmap should explain what you're not building yet."
];

const factEl = document.querySelector("#fact");
document.querySelector("#randomFact").addEventListener("click", () => {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  factEl.textContent = "✦ " + fact;
});

const orbitCaption = document.querySelector("#orbitCaption");
document.querySelectorAll(".orbit-node").forEach(node => {
  node.addEventListener("mouseenter", () => {
    orbitCaption.textContent = node.dataset.label;
  });
  node.addEventListener("mouseleave", () => {
    orbitCaption.textContent = "Hover a node";
  });
  node.addEventListener("click", () => {
    orbitCaption.textContent = `${node.dataset.label} → part of the product`;
  });
});

const thinkData = {
  discovery: {
    number: "01",
    title: "Start with the problem, not the feature.",
    text: "Understand who is struggling, what they are actually trying to accomplish, and what evidence exists before jumping into a solution.",
    principle: "Question → context → evidence → opportunity"
  },
  validate: {
    number: "02",
    title: "Make the riskiest assumption cheap to test.",
    text: "Prototype the part that could make the whole idea wrong. Put it in front of users early enough that changing direction is still inexpensive.",
    principle: "Risk → prototype → feedback → decision"
  },
  build: {
    number: "03",
    title: "Get close enough to the implementation to know what matters.",
    text: "I don't need to write every line of code, but I want enough technical depth to understand constraints, tradeoffs, dependencies, and failure modes.",
    principle: "Intent → constraint → tradeoff → execution"
  },
  learn: {
    number: "04",
    title: "Launch is a data point, not a graduation ceremony.",
    text: "A shipped product gives you better questions. Usage, support tickets, beta feedback, and weird edge cases all become inputs to the next iteration.",
    principle: "Ship → observe → learn → iterate"
  }
};

document.querySelectorAll(".think-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".think-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const data = thinkData[tab.dataset.think];
    document.querySelector("#thinkNumber").textContent = data.number;
    document.querySelector("#thinkTitle").textContent = data.title;
    document.querySelector("#thinkText").textContent = data.text;
    document.querySelector("#thinkPrinciple").textContent = data.principle;
  });
});

const projects = {
  totem: {
    eyebrow: "TOTEM / PRODUCT CASE STUDY",
    title: "Designing a product that had to disappear into the experience.",
    sections: [
      ["The challenge", "Totem was built around helping people find friends in crowded environments without turning the experience into another phone screen."],
      ["What changed", "Real users wanted more information and flexibility than the original screen-free concept provided. That feedback pushed the product toward a small OLED path while preserving a future route to a larger display."],
      ["The engineering reality", "Range, firmware behavior, ESP-NOW constraints, battery life, app behavior, compliance, and manufacturing all had to work together. The product couldn't be considered 'done' from only one layer."],
      ["What I owned", "Product direction, application engineering, beta feedback loops, feature definition, roadmap tradeoffs, firmware coordination, supplier communication, and customer-driven iteration."]
    ]
  },
  cloud: {
    eyebrow: "ENTERPRISE / PRODUCT LESSON",
    title: "Good technology doesn't rescue a poorly framed problem.",
    sections: [
      ["The lesson", "Enterprise cloud and data-center work taught me to challenge assumptions early, especially when a solution starts to look like a preselected technology rather than a response to a validated need."],
      ["How I work now", "Start with the use case, identify stakeholders, make assumptions visible, and use pilots or smaller experiments before committing a large organization to a big program."]
    ]
  },
  deployment: {
    eyebrow: "K–12 / SCALE",
    title: "At scale, the boring details become the product.",
    sections: [
      ["The scale", "I worked on device programs involving more than 300,000 devices across 150+ schools."],
      ["The lesson", "Rollout plans, logistics, support, communication, inventory, configuration, and recovery processes are not administrative side quests. They determine whether a technically good product succeeds in the field."]
    ]
  }
};

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalEyebrow = document.querySelector("#modalEyebrow");
const modalBody = document.querySelector("#modalBody");

function openProject(key) {
  const project = projects[key];
  modalEyebrow.textContent = project.eyebrow;
  modalTitle.textContent = project.title;
  modalBody.innerHTML = project.sections.map(([h, p]) => `
    <div class="modal-section">
      <h3>${h}</h3>
      <p>${p}</p>
    </div>
  `).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});
document.querySelector("#modalClose").addEventListener("click", closeProject);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeProject();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProject();
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
});

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("pointermove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * .08}px, ${y * .08}px)`;
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector(".scroll-progress").style.width = `${(window.scrollY / max) * 100}%`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
