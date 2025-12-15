// VOLANTIS HALL — Booking UI (static)
// Works locally, stores reservations in localStorage.

const PRICES = {
  pc: 1.5,
  stage: 3.5,
  console: 3.5,
  vip: 8
};

const SERVICE_LABEL = {
  pc: "Standard PC",
  stage: "Stage PC",
  console: "Console",
  vip: "VIP Suite"
};

// 18-hour style schedule (example): 9:00 → 2:00 (next day) as discrete 1-hour slots
const SLOT_LABELS = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00",
  "17:00","18:00","19:00","20:00",
  "21:00","22:00","23:00","00:00",
  "01:00","02:00"
];

const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

const state = {
  service: "pc",
  date: "",
  slots: new Set()
};

document.body.classList.add("js-enabled");

function setActiveSection(targetId){
  const target = document.getElementById(targetId);
  if(!target) return;

  $$(".switchable").forEach(section => {
    section.classList.toggle("active", section === target);
  });

  document.querySelectorAll(".links [data-section-target]").forEach(link => {
    link.classList.toggle("active", link.dataset.sectionTarget === targetId);
  });

  const mainView = document.querySelector("main");
  if(mainView) mainView.scrollTo({ top: 0, behavior: "auto" });

  if(history.replaceState){
    history.replaceState(null, "", `#${targetId}`);
  }else{
    window.location.hash = targetId;
  }
}

function initSectionNavigation(){
  $$("[data-section-target]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveSection(el.dataset.sectionTarget);
    });
  });

  const initial = window.location.hash.replace("#","");
  if(initial && document.getElementById(initial)){
    setActiveSection(initial);
  }else{
    setActiveSection("top");
  }
}

function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  setTimeout(()=>t.classList.remove("on"), 1400);
}

function todayISO(){
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0,10);
}

function buildMockGrid(){
  const el = $("#mockGrid");
  if(!el) return;
  const cards = [
    { t:"PC", s:"Peak hours filling fast", on:true },
    { t:"Console", s:"Walk-ins welcome", on:false },
    { t:"VIP Suite", s:"Best for teams", on:true },
    { t:"Event", s:"Friday cup night", on:true },
    { t:"PC", s:"1.5 BD/hr standard", on:false },
    { t:"Stage", s:"Tournament setups", on:true },
    { t:"Cafe", s:"Add-on combos", on:false },
    { t:"Membership", s:"Monthly hours pack", on:true },
  ];
  el.innerHTML = cards.map(c => `
    <div class="tile ${c.on ? "on":""}">
      <strong>${c.t}</strong>
      <span>${c.s}</span>
    </div>
  `).join("");
}

function buildSlots(){
  const grid = $("#slotGrid");
  grid.innerHTML = SLOT_LABELS.map((t) => {
    const on = state.slots.has(t);
    return `<div class="slot ${on ? "on":""}" data-slot="${t}">${t}</div>`;
  }).join("");

  $$("#slotGrid .slot").forEach(btn => {
    btn.addEventListener("click", () => {
      const slot = btn.dataset.slot;
      if(state.slots.has(slot)) state.slots.delete(slot);
      else state.slots.add(slot);
      buildSlots();
      updateSummary();
    });
  });
}

function setService(service){
  state.service = service;
  state.slots.clear();

  $$("#serviceSeg .segBtn").forEach(b => {
    b.classList.toggle("active", b.dataset.service === service);
  });

  updateSummary();
  buildSlots();
}

function updateSummary(){
  $("#sumService").textContent = SERVICE_LABEL[state.service];
  $("#sumDate").textContent = state.date || "—";

  const slotsArr = Array.from(state.slots).sort((a,b)=> SLOT_LABELS.indexOf(a) - SLOT_LABELS.indexOf(b));
  $("#sumSlots").textContent = slotsArr.length ? slotsArr.join(", ") : "—";

  const hours = slotsArr.length;
  const total = (hours * PRICES[state.service]).toFixed(2);
  $("#sumTotal").textContent = `${hours ? total : "0.00"} BD`;
}

function readLog(){
  try{
    return JSON.parse(localStorage.getItem("vh_reservations") || "[]");
  }catch{
    return [];
  }
}
function writeLog(items){
  localStorage.setItem("vh_reservations", JSON.stringify(items.slice(0,6)));
}

function renderLog(){
  const list = $("#logList");
  const items = readLog();
  if(!items.length){
    list.innerHTML = `<div class="logItem">No reservations yet. Capture a slot to show the flow.</div>`;
    return;
  }
  list.innerHTML = items.map(it => `
    <div class="logItem">
      <strong>${it.service}</strong><br/>
      ${it.date} • ${it.slots.join(", ")}<br/>
      Total: <strong>${it.total} BD</strong>
    </div>
  `).join("");
}

function reserve(){
  if(!state.date){
    toast("Pick a date first.");
    return;
  }
  const slotsArr = Array.from(state.slots).sort((a,b)=> SLOT_LABELS.indexOf(a) - SLOT_LABELS.indexOf(b));
  if(!slotsArr.length){
    toast("Pick at least 1 time slot.");
    return;
  }

  const hours = slotsArr.length;
  const total = (hours * PRICES[state.service]).toFixed(2);

  const entry = {
    service: SERVICE_LABEL[state.service],
    date: state.date,
    slots: slotsArr,
    total
  };

  const log = readLog();
  log.unshift(entry);
  writeLog(log);
  renderLog();

  toast("Reservation saved locally.");
  state.slots.clear();
  buildSlots();
  updateSummary();
}

function wireButtons(){
  $$("#pricing [data-preset]").forEach(btn => {
    btn.addEventListener("click", () => {
      const preset = btn.dataset.preset;
      setService(preset === "pc" ? "pc" : preset);
      setActiveSection("booking");
      toast(`${SERVICE_LABEL[state.service]} selected`);
    });
  });

  $$("#serviceSeg .segBtn").forEach(btn => {
    btn.addEventListener("click", () => setService(btn.dataset.service));
  });

  $("#reserveBtn").addEventListener("click", reserve);

  $("#clearLog").addEventListener("click", () => {
    localStorage.removeItem("vh_reservations");
    renderLog();
    toast("Cleared");
  });

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#contactMsg").textContent = "Message sent. Connect to email/API for production.";
    toast("Sent");
    e.target.reset();
  });
}

function initDate(){
  const d = $("#dateInput");
  d.min = todayISO();
  d.value = todayISO();
  state.date = d.value;

  d.addEventListener("change", () => {
    state.date = d.value;
    updateSummary();
  });
}

buildMockGrid();
initDate();
buildSlots();
updateSummary();
wireButtons();
renderLog();
initSectionNavigation();

