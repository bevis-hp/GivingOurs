function setField(name, value) {
  document.querySelectorAll(`[data-field="${name}"]`).forEach((node) => {
    node.textContent = value;
  });
}

function renderEngagement(item) {
  const li = el("li", "engagement");

  const head = el("div", "engagement-head");
  const mark = el("div", "business-mark", initials(item.business));
  mark.setAttribute("aria-hidden", "true");
  const titles = el("div", "engagement-titles");
  titles.append(
    el("h3", "", item.business),
    el("p", "engagement-meta", `${item.sector} · ${item.city}, Nigeria`)
  );
  const rating = el("div", "engagement-rating");
  rating.append(starRating(item.rating, `Rated ${item.rating} out of 5 by ${item.business}`));
  head.append(mark, titles, rating);

  const help = el("p", "engagement-help");
  help.append(el("strong", "", "Helped with: "), item.help);

  const quote = el("blockquote", "engagement-quote");
  quote.append(el("p", "", `“${item.quote}”`));

  const foot = el("p", "engagement-foot", `${item.month} · ${item.hours} hours given`);

  li.append(head, help, quote, foot);
  return li;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

function setupShare(volunteer) {
  document.getElementById("share-profile").addEventListener("click", async () => {
    const url = location.href;
    const title = `${volunteer.name} on GivingOurs`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast("Profile link copied to clipboard");
    } catch {
      showToast("Copy this page’s address to share the profile");
    }
  });
}

function renderProfile() {
  const id = new URLSearchParams(location.search).get("id") || VOLUNTEERS[0].id;
  const volunteer = findVolunteer(id);

  if (!volunteer) {
    document.querySelector(".profile-hero").hidden = true;
    document.querySelector(".profile-body").hidden = true;
    document.getElementById("profile-missing").hidden = false;
    document.title = "Volunteer not found — GivingOurs";
    return;
  }

  const stats = volunteerStats(volunteer);
  const cities = new Set(volunteer.engagements.map((item) => item.city));

  document.title = `${volunteer.name} — Volunteer profile — GivingOurs`;
  setField("initials", initials(volunteer.name));
  setField("verified", `Verified ${volunteer.employer} volunteer`);
  setField("name", volunteer.name);
  setField("role", volunteer.role);
  setField("meta", `${volunteer.employer} · ${volunteer.location}, UK`);
  setField("rating", stats.rating.toFixed(1));
  setField("businesses", String(stats.businesses));
  setField("hours", String(stats.hours));
  setField("cities", String(cities.size));
  setField("bio", volunteer.bio);
  setField("since", volunteer.memberSince);

  document.querySelector('[data-field="rating-stars"]').replaceChildren(starRating(stats.rating));
  document.querySelectorAll('[data-field="book-link"]').forEach((link) => {
    link.href = `index.html?book=${volunteer.id}`;
  });

  document.getElementById("profile-skills").replaceChildren(
    ...volunteer.tags.map((tag) => el("li", "", tag))
  );
  document.getElementById("profile-dates").replaceChildren(
    ...volunteer.dayOffsets.map((offset) => el("li", "", dateFormatter.format(upcomingDate(offset))))
  );
  document.getElementById("engagement-list").replaceChildren(
    ...volunteer.engagements.map(renderEngagement)
  );

  setupShare(volunteer);
}

renderProfile();
