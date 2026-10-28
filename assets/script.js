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

  const stats = volunteerStats(volunteer);
  const rating = el("p", "card-rating");
  rating.append(
    starRating(stats.rating),
    el("strong", "", stats.rating.toFixed(1)),
    el("span", "", `· ${stats.businesses} businesses helped`)
  );

  const actions = el("div", "card-actions");
  const profile = el("a", "button button-ghost", "See profile");
  profile.href = `profile.html?id=${volunteer.id}`;
  const request = el("button", "button button-primary", "Request a session");
  request.type = "button";
  request.dataset.volunteerIndex = String(index);
  actions.append(profile, request);

  card.append(head, rating, meta, tags, actions);
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
  // Chrome ignores Escape on dialogs opened without user activation (e.g. via ?book=).
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  }, true);

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

function openBookingFromUrl() {
  const id = new URLSearchParams(location.search).get("book");
  const volunteer = id && findVolunteer(id);
  if (!volunteer) return;
  const trigger = document.querySelector(`[data-volunteer-index="${VOLUNTEERS.indexOf(volunteer)}"]`);
  history.replaceState(null, "", `${location.pathname}#volunteers`);
  document.getElementById("volunteers").scrollIntoView();
  openBooking(volunteer, trigger);
}

setupVolunteers();
setupBooking();
setupEmployerForm();
openBookingFromUrl();
