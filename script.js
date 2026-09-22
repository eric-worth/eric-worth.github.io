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

const nodeData = {
  customer: {
    label: "Customer",
    kicker: "START HERE",
    title: "The problem exists before the roadmap does.",
    text: "Listen for the job, the friction, the workaround, and the thing people keep asking for. That becomes better product input than a pile of feature requests.",
    next: ["product", "software"]
  },
  product: {
    label: "Product",
    kicker: "TRANSLATE",
    title: "Turn signals into a deliberate decision.",
    text: "Define the problem, shape the opportunity, make the tradeoffs visible, and give the team enough clarity to move without pretending uncertainty doesn't exist.",
    next: ["customer", "software", "hardware", "business"]
  },
  software: {
    label: "Software",
    kicker: "SYSTEM BEHAVIOR",
    title: "Make the experience work beyond the mockup.",
    text: "App behavior, data, firmware, edge cases, releases, and user-facing flows are all part of the product experience.",
    next: ["product", "hardware"]
  },
  hardware: {
    label: "Hardware",
    kicker: "PHYSICAL REALITY",
    title: "A physical constraint is still a product requirement.",
    text: "Size, power, connectivity, manufacturing, materials, and real-world use can reshape the experience. Good product decisions account for that early.",
    next: ["product", "software", "business"]
  },
  business: {
    label: "Business",
    kicker: "THE SYSTEM AROUND IT",
    title: "A product has to survive outside the prototype.",
    text: "Suppliers, compliance, cost, commercial goals, operations, and the people selling or supporting the product all affect what can actually ship.",
    next: ["product", "hardware"]
  }
};

const connections = {
  "customer-product": ["Customer", "Product", "Turn friction into a product decision."],
  "product-customer": ["Product", "Customer", "Test the decision against the people who have to live with it."],
  "customer-software": ["Customer", "Software", "Translate the desired experience into actual behavior."],
  "software-customer": ["Software", "Customer", "Watch what the experience does in the real world."],
  "product-software": ["Product", "Software", "Convert a product intent into behavior, requirements, and edge cases."],
  "software-product": ["Software", "Product", "Use technical reality to improve the product decision."],
  "product-hardware": ["Product", "Hardware", "Balance the experience against physical constraints."],
  "hardware-product": ["Hardware", "Product", "Let physical constraints reshape the right product choice."],
  "product-business": ["Product", "Business", "Make the roadmap work in the real operating model."],
  "business-product": ["Business", "Product", "Bring commercial and operational reality back into prioritization."],
  "software-hardware": ["Software", "Hardware", "Make digital behavior and physical behavior agree."],
  "hardware-software": ["Hardware", "Software", "Design the boundary, not just either side of it."],
  "hardware-business": ["Hardware", "Business", "Connect buildability, suppliers, cost, and launch reality."],
  "business-hardware": ["Business", "Hardware", "Bring commercial constraints into physical product decisions."]
};

let selectedNode = null;
const mapStatus = document.querySelector("#mapStatus");
const bridgeCard = document.querySelector("#bridgeCard");
const bridgeKicker = document.querySelector("#bridgeKicker");
const bridgeTitle = document.querySelector("#bridgeTitle");
const bridgeText = document.querySelector("#bridgeText");
const bridgePath = document.querySelector("#bridgePath");
const activeLine = document.querySelector("#activeLine");

const nodePositions = {
  customer:[260,26], business:[442,166], software:[416,416], hardware:[104,416], product:[78,166]
};
const center = [260,260];

function setActiveNode(node) {
  document.querySelectorAll(".map-node").forEach(n => n.classList.toggle("active", n.dataset.node === node));
}

function drawLine(from, to) {
  const a = nodePositions[from] || center;
  const b = nodePositions[to] || center;
  activeLine.setAttribute("x1", a[0]); activeLine.setAttribute("y1", a[1]);
  activeLine.setAttribute("x2", b[0]); activeLine.setAttribute("y2", b[1]);
  activeLine.style.opacity = "1";
}

function renderSingle(node) {
  const d = nodeData[node];
  bridgeCard.classList.remove("ready");
  bridgeKicker.textContent = d.kicker;
  bridgeTitle.textContent = d.title;
  bridgeText.textContent = d.text;
  bridgePath.innerHTML = d.next.map(next => `<span class="path-chip">${d.label}</span><span class="path-arrow">→</span><span class="path-chip">${nodeData[next].label}</span>`).join("");
  mapStatus.innerHTML = '<span class="status-dot"></span>Now pick where the conversation goes';
  if (node === "product") {
    activeLine.setAttribute("x1", center[0]); activeLine.setAttribute("y1", center[1]);
    activeLine.setAttribute("x2", center[0]); activeLine.setAttribute("y2", center[1]);
    activeLine.style.opacity = ".15";
  } else {
    drawLine("product", node);
  }
}

function renderConnection(from, to) {
  const key = `${from}-${to}`;
  const info = connections[key] || [nodeData[from].label, nodeData[to].label, "The useful work happens in the interface between these two worlds."];
  bridgeCard.classList.add("ready");
  bridgeKicker.textContent = "BRIDGE";
  bridgeTitle.textContent = info[2];
  bridgeText.textContent = `From ${info[0].toLowerCase()} to ${info[1].toLowerCase()}, the goal is to keep the context intact instead of throwing the problem over the wall.`;
  bridgePath.innerHTML = `<span class="path-chip">${info[0]}</span><span class="path-arrow">→</span><span class="path-chip">${info[1]}</span>`;
  mapStatus.innerHTML = '<span class="status-dot"></span>Bridge selected — choose another node to trace again';
  drawLine(from, to);
}

document.querySelectorAll(".map-node").forEach(node => {
  node.addEventListener("click", () => {
    const key = node.dataset.node;
    if (selectedNode && selectedNode !== key) {
      renderConnection(selectedNode, key);
      selectedNode = key;
      setActiveNode(key);
      return;
    }
    selectedNode = key;
    setActiveNode(key);
    renderSingle(key);
  });
});

document.querySelector("#mapReset").addEventListener("click", () => {
  selectedNode = null;
  document.querySelectorAll(".map-node").forEach(n => n.classList.remove("active"));
  bridgeCard.classList.remove("ready");
  bridgeKicker.textContent = "PRODUCT SYSTEM";
  bridgeTitle.textContent = "The interesting part is in the handoffs.";
  bridgeText.textContent = "Click any node to see what I care about there. Then click a second node to trace the connection between them.";
  bridgePath.innerHTML = "";
  mapStatus.innerHTML = '<span class="status-dot"></span>Pick a starting point';
  activeLine.style.opacity = ".2";
});

const factsEl = document.querySelector("#fact");
document.querySelector("#randomFact").addEventListener("click", () => {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  factsEl.textContent = "✦ " + fact;
});

const thinkData = {
  discovery:{number:"01",title:"Start with the problem, not the feature.",text:"I want to understand who is struggling, what they are actually trying to accomplish, and what evidence we have before jumping into a solution.",principle:"Question → context → evidence → opportunity"},
  validate:{number:"02",title:"Make the riskiest assumption cheap to test.",text:"Prototype the part that could make the whole idea wrong. Put it in front of users early enough that changing direction is still inexpensive.",principle:"Risk → prototype → feedback → decision"},
  build:{number:"03",title:"Get close enough to the implementation to know what matters.",text:"I don't need to write every line of code, but I want enough technical depth to understand constraints, tradeoffs, dependencies, and failure modes.",principle:"Intent → constraint → tradeoff → execution"},
  learn:{number:"04",title:"Launch is a data point, not a graduation ceremony.",text:"A shipped product gives you better questions. Usage, support tickets, beta feedback, and weird edge cases all become inputs to the next iteration.",principle:"Ship → observe → learn → iterate"}
};
document.querySelectorAll(".think-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".think-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const d = thinkData[tab.dataset.think];
    document.querySelector("#thinkNumber").textContent=d.number;
    document.querySelector("#thinkTitle").textContent=d.title;
    document.querySelector("#thinkText").textContent=d.text;
    document.querySelector("#thinkPrinciple").textContent=d.principle;
  });
});

const projects = {
  totem:{
    eyebrow:"TOTEM / PRODUCT CASE STUDY",title:"Designing a product that had to disappear into the experience.",
    sections:[
      ["The challenge","Totem was built around helping people find friends in crowded environments without turning the experience into another phone screen."],
      ["What changed","Real users wanted more information and flexibility than the original screen-free concept provided. That feedback pushed the product toward a small OLED path while preserving a future route to a larger display."],
      ["The engineering reality","Range, firmware behavior, connectivity constraints, battery life, app behavior, compliance, and manufacturing all had to work together. The product couldn't be considered 'done' from only one layer."],
      ["What I owned","Product direction, application engineering, beta feedback loops, feature definition, roadmap tradeoffs, firmware coordination, supplier communication, and customer-driven iteration."]
    ]
  },
  cloud:{
    eyebrow:"ENTERPRISE / PRODUCT LESSON",title:"Good technology doesn't rescue a poorly framed problem.",
    sections:[
      ["The lesson","Enterprise cloud and data-center work taught me to challenge assumptions early, especially when a solution starts to look like a preselected technology rather than a response to a validated need."],
      ["How I work now","Start with the use case, identify stakeholders, make assumptions visible, and use pilots or smaller experiments before committing a large organization to a big program."]
    ]
  },
  deployment:{
    eyebrow:"K–12 / SCALE",title:"At scale, the boring details become the product.",
    sections:[
      ["The scale","I worked on device programs involving more than 300,000 devices across 150+ schools."],
      ["The lesson","Rollout plans, logistics, support, communication, inventory, configuration, and recovery processes are not administrative side quests. They determine whether a technically good product succeeds in the field."]
    ]
  }
};

const modal=document.querySelector("#modal"),modalTitle=document.querySelector("#modalTitle"),modalEyebrow=document.querySelector("#modalEyebrow"),modalBody=document.querySelector("#modalBody");
function openProject(key){const p=projects[key];modalEyebrow.textContent=p.eyebrow;modalTitle.textContent=p.title;modalBody.innerHTML=p.sections.map(([h,t])=>`<div class="modal-section"><h3>${h}</h3><p>${t}</p></div>`).join("");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeProject(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll(".project-open").forEach(b=>b.addEventListener("click",()=>openProject(b.dataset.project)));
document.querySelector("#modalClose").addEventListener("click",closeProject);
modal.addEventListener("click",e=>{if(e.target===modal)closeProject()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProject()});

document.querySelector("#themeToggle").addEventListener("click",()=>document.body.classList.toggle("high-contrast"));
const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=`${e.clientX}px`;glow.style.top=`${e.clientY}px`});
document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.08}px,${y*.08}px)`});
  el.addEventListener("pointerleave",()=>el.style.transform="");
});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
window.addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector(".scroll-progress").style.width=`${max>0?(window.scrollY/max)*100:0}%`});
document.querySelector("#year").textContent=new Date().getFullYear();
