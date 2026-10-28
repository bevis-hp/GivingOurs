const VOLUNTEERS = [
  {
    name: "Adaeze Morris",
    role: "Senior Finance Business Partner",
    employer: "Aviva",
    location: "Norwich",
    skills: ["finance", "operations"],
    tags: ["Cash-flow planning", "Pricing strategy", "Budgeting"],
    dayOffsets: [9, 23, 37],
  },
  {
    name: "James Okafor",
    role: "Brand & Growth Strategy Manager",
    employer: "PwC",
    location: "London",
    skills: ["marketing"],
    tags: ["Brand strategy", "Go-to-market", "Customer research"],
    dayOffsets: [14, 42],
  },
  {
    name: "Dr Sophie Kingsley",
    role: "Lecturer in Computing Sciences",
    employer: "UEA",
    location: "Norwich",
    skills: ["technology"],
    tags: ["Web development", "Data & AI", "Digital tools"],
    dayOffsets: [6, 20, 34, 48],
  },
  {
    name: "Tom Fletcher",
    role: "Audit & Assurance Director",
    employer: "PwC",
    location: "Manchester",
    skills: ["finance", "operations"],
    tags: ["Bookkeeping", "Financial controls", "Investor readiness"],
    dayOffsets: [11, 25],
  },
  {
    name: "Ella Barnes",
    role: "Lead UX Designer",
    employer: "Aviva",
    location: "London",
    skills: ["technology", "marketing"],
    tags: ["Website design", "User research", "E-commerce"],
    dayOffsets: [16, 30, 44],
  },
  {
    name: "Chika Nwosu",
    role: "Supply Chain & Operations Lead",
    employer: "UEA",
    location: "Norwich",
    skills: ["operations"],
    tags: ["Supply chain", "Process improvement", "Logistics"],
    dayOffsets: [8, 29],
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

// Demo availability is generated relative to today so dates never go stale.
function upcomingDate(offset) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  const day = date.getDay();
  if (day === 6) date.setDate(date.getDate() + 2);
  if (day === 0) date.setDate(date.getDate() + 1);
  return date;
}

function initials(name) {
  return name
    .replace(/^Dr\s+/, "")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function metaRow(label, value) {
  const row = el("div");
  row.append(el("dt", "", label), el("dd", "", value));
  return row;
}

function renderVolunteer(volunteer, index) {
  const dates = volunteer.dayOffsets.map(upcomingDate);
  const card = el("article", "volunteer-card");
  card.dataset.skills = volunteer.skills.join(",");

  const head = el("div", "card-head");
  const avatar = el("div", "avatar", initials(volunteer.name));
  avatar.setAttribute("aria-hidden", "true");
  const titles = el("div");
  titles.append(el("h3", "", volunteer.name), el("p", "volunteer-role", volunteer.role));
  head.append(avatar, titles);

  const meta = el("dl", "card-meta");
  meta.append(
    metaRow("Works at", `${volunteer.employer} · ${volunteer.location}`),
    metaRow("Next available", dateFormatter.format(dates[0])),
    metaRow("Days to give", `${dates.length} days`)
  );

  const tags = el("ul", "skill-list");
  tags.setAttribute("aria-label", "Expertise");
  volunteer.tags.forEach((tag) => tags.append(el("li", "", tag)));

  const action = el("button", "button", "Request a session");
  action.type = "button";
  action.dataset.volunteerIndex = String(index);

  card.append(head, meta, tags, action);
  return card;
}

function setupVolunteers() {
  const grid = document.getElementById("volunteer-grid");
  if (!grid) return;

  grid.replaceChildren(...VOLUNTEERS.map(renderVolunteer));

  const buttons = document.querySelectorAll(".filter-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      grid.querySelectorAll(".volunteer-card").forEach((card) => {
        card.hidden = filter !== "all" && !card.dataset.skills.split(",").includes(filter);
      });
    });
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-volunteer-index]");
    if (button) openBooking(VOLUNTEERS[Number(button.dataset.volunteerIndex)], button);
  });
}

function setStatus(node, message, type) {
  node.textContent = message;
  node.classList.toggle("is-error", type === "error");
  node.classList.toggle("is-success", type === "success");
}

function validate(form) {
  let firstInvalid = null;
  form.querySelectorAll("input[required], select[required], textarea[required]").forEach((field) => {
    const valid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalid) firstInvalid = field;
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

function clearInvalidOnInput(form) {
  form.addEventListener("input", (event) => {
    if (event.target.getAttribute("aria-invalid") === "true" && event.target.checkValidity()) {
      event.target.setAttribute("aria-invalid", "false");
    }
  });
}

const dialog = document.getElementById("booking-dialog");
const bookingForm = document.getElementById("booking-form");
const bookingStatus = document.getElementById("booking-status");
const bookingSubmit = bookingForm?.querySelector('[type="submit"]');
let lastTrigger = null;
let bookingDates = [];

function openBooking(volunteer, trigger) {
  if (!dialog) return;
  lastTrigger = trigger;
  bookingForm.reset();
  bookingForm.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
  setStatus(bookingStatus, "");
  bookingSubmit.textContent = "Send request";
  delete bookingForm.dataset.sent;

  dialog.querySelector("[data-booking-name]").textContent = volunteer.name;
  dialog.querySelector("[data-booking-meta]").textContent =
    `${volunteer.role} · ${volunteer.employer}`;

  bookingDates = volunteer.dayOffsets.map(upcomingDate);
  const select = document.getElementById("booking-date");
  select.replaceChildren(
    ...bookingDates.map((date, i) => {
      const option = el("option", "", dateFormatter.format(date));
      option.value = String(i);
      return option;
    })
  );

  dialog.showModal();
  select.focus();
}

function setupBooking() {
  if (!dialog) return;
  clearInvalidOnInput(bookingForm);

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => lastTrigger?.focus());

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (bookingForm.dataset.sent) {
      dialog.close();
      return;
    }
    if (!validate(bookingForm)) {
      setStatus(bookingStatus, "Please complete the highlighted fields.", "error");
      return;
    }
    const name = dialog.querySelector("[data-booking-name]").textContent;
    const date = shortDateFormatter.format(bookingDates[Number(document.getElementById("booking-date").value)]);
    setStatus(bookingStatus, `Request sent. ${name} will confirm your session on ${date}.`, "success");
    bookingForm.dataset.sent = "true";
    bookingSubmit.textContent = "Done";
    bookingSubmit.focus();
  });
}

function setupEmployerForm() {
  const form = document.getElementById("employer-form");
  const status = document.getElementById("employer-status");
  if (!form) return;
  clearInvalidOnInput(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate(form)) {
      setStatus(status, "Please complete the highlighted fields.", "error");
      return;
    }
    const company = form.elements.company.value.trim();
    setStatus(status, `Thank you — we’ll be in touch to onboard ${company}’s volunteers.`, "success");
    form.reset();
  });
}

setupVolunteers();
setupBooking();
setupEmployerForm();
