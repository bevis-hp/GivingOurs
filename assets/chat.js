(() => {
  const onHome = !!document.getElementById("employers");
  const page = (hash) => (onHome ? hash : `index.html${hash}`);

  const ANSWERS = [
    {
      id: "how",
      chip: "How does it work?",
      keywords: ["how", "work", "process", "start", "steps"],
      text: "It’s simple: UK employers sign up their teams, employees list their expertise and the days they can give, then small businesses in Nigeria book a remote session with the right person.",
      links: [{ label: "See how it works", href: page("#how-it-works") }],
    },
    {
      id: "cost",
      chip: "Is it free for businesses?",
      keywords: ["cost", "free", "price", "pay", "fee", "charge", "money"],
      text: "Yes. Sessions are completely free for small businesses. Volunteers give their time using paid volunteering days provided by their UK employer.",
    },
    {
      id: "employer",
      chip: "I’m a UK employer",
      keywords: ["employer", "company", "sign up", "register", "csr", "hr", "onboard", "staff", "employees", "team"],
      text: "Great! Register your company and we’ll help onboard your employees. You’ll get reporting on hours given and businesses supported, which is useful for CSR and ESG reporting.",
      links: [{ label: "Register your company", href: page("#employers") }],
    },
    {
      id: "book",
      chip: "How do I book a volunteer?",
      keywords: ["book", "booking", "request", "session", "find", "hire", "someone"],
      text: "Browse the volunteers, filter by expertise, then press “Request a session” and choose one of their available days. You’ll get a confirmation once they accept.",
      links: [{ label: "Browse volunteers", href: page("#volunteers") }],
    },
    {
      id: "profile",
      chip: "What do volunteers get?",
      keywords: ["volunteer", "benefit", "get", "profile", "recognition", "rating", "linkedin", "why", "cv"],
      text: "Each volunteer gets a public profile listing the businesses they’ve helped, what they did and the rating each business gave them. It’s great for appraisals, LinkedIn and building skills like leadership and cross-cultural working.",
      links: [{ label: "See an example profile", href: "profile.html?id=sophie-kingsley" }],
    },
    {
      id: "remote",
      keywords: ["remote", "online", "travel", "video", "zoom", "teams", "call", "where"],
      text: "All sessions are remote, usually over video call. Most are a single day, often split into a kick-off call, focused work time and a wrap-up with clear next steps.",
    },
    {
      id: "profit",
      keywords: ["profit", "charity", "commercial", "for-profit", "company not charity", "ngo"],
      text: "We focus on small, profit-driven businesses because a thriving business creates jobs, pays wages and keeps growing long after the session ends. Your expertise becomes lasting income for a community.",
      links: [{ label: "Why volunteer with us", href: page("#why-volunteer") }],
    },
    {
      id: "safety",
      keywords: ["safe", "vet", "verify", "verified", "trust", "check", "secure", "data", "privacy"],
      text: "Every volunteer is verified through their employer, and every business is checked before it can book. Ratings and reviews after each session help keep quality high.",
    },
    {
      id: "time",
      keywords: ["time", "how long", "hours", "days", "commitment", "duration"],
      text: "A session is typically one volunteering day (about 7 hours). There’s no long-term commitment. Volunteers choose which days they offer.",
    },
    {
      id: "where",
      keywords: ["country", "countries", "africa", "ghana", "kenya", "expand", "other"],
      text: "We’re starting with Nigeria, home to millions of small businesses. We plan to expand to other countries across the Global South next.",
    },
    {
      id: "human",
      keywords: ["human", "person", "contact", "email", "talk", "speak", "agent", "phone"],
      text: "Happy to put you in touch with the team. Email hello@givingours.org and we’ll get back to you within one working day.",
    },
    {
      id: "greeting",
      keywords: ["hi", "hello", "hey", "morning", "afternoon", "evening"],
      text: "Hello! What would you like to know about GivingOurs?",
    },
    {
      id: "thanks",
      keywords: ["thanks", "thank", "cheers", "great", "brilliant", "perfect"],
      text: "You’re welcome! Anything else I can help with?",
    },
  ];

  const FALLBACK = {
    text: "I’m not sure about that one yet. Here are some things I can help with, or you can email hello@givingours.org.",
  };

  const CHIPS = ANSWERS.filter((answer) => answer.chip);

  function match(text) {
    const query = ` ${text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ")} `;
    let best = null;
    let bestScore = 0;
    ANSWERS.forEach((answer) => {
      const score = answer.keywords.reduce((total, word) => {
        const hit = word.includes(" ") ? query.includes(word) : query.includes(` ${word} `) || query.includes(` ${word}s `);
        return total + (hit ? word.length : 0);
      }, 0);
      if (score > bestScore) {
        best = answer;
        bestScore = score;
      }
    });
    return best || FALLBACK;
  }

  function node(tag, className, text) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text !== undefined) item.textContent = text;
    return item;
  }

  const root = node("div", "chat");
  root.innerHTML = `
    <section class="chat-panel" id="chat-panel" role="dialog" aria-labelledby="chat-title" hidden>
      <header class="chat-header">
        <img src="assets/logo.svg" alt="" width="34" height="34">
        <div>
          <h2 id="chat-title">GivingOurs assistant</h2>
          <p><span class="chat-online" aria-hidden="true"></span>Usually replies instantly</p>
        </div>
        <button class="chat-close" type="button" aria-label="Close chat">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </button>
      </header>
      <div class="chat-log" role="log" aria-live="polite" aria-label="Conversation"></div>
      <div class="chat-chips" aria-label="Suggested questions"></div>
      <form class="chat-form" autocomplete="off">
        <label class="visually-hidden" for="chat-input">Type your question</label>
        <input id="chat-input" name="message" placeholder="Ask a question…" maxlength="200">
        <button type="submit" aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </form>
      <p class="chat-disclaimer">Demo assistant with pre-written answers</p>
    </section>
    <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="chat-panel" aria-label="Open chat assistant">
      <svg class="chat-icon-open" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
      <svg class="chat-icon-close" width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      <span class="chat-launcher-label">Questions?</span>
    </button>
  `;
  document.body.append(root);

  const panel = root.querySelector(".chat-panel");
  const launcher = root.querySelector(".chat-launcher");
  const log = root.querySelector(".chat-log");
  const chips = root.querySelector(".chat-chips");
  const form = root.querySelector(".chat-form");
  const input = root.querySelector("#chat-input");
  let started = false;
  let busy = false;

  function scrollToEnd() {
    log.scrollTop = log.scrollHeight;
  }

  function addMessage(text, from, links) {
    const bubble = node("div", `chat-msg chat-msg-${from}`);
    bubble.append(node("p", "", text));
    if (links && links.length) {
      const row = node("div", "chat-links");
      links.forEach((link) => {
        const a = node("a", "", `${link.label} →`);
        a.href = link.href;
        a.addEventListener("click", () => {
          if (window.matchMedia("(max-width: 520px)").matches) toggle(false);
        });
        row.append(a);
      });
      bubble.append(row);
    }
    log.append(bubble);
    scrollToEnd();
  }

  function renderChips(exclude) {
    chips.replaceChildren(
      ...CHIPS.filter((chip) => chip.id !== exclude).map((chip) => {
        const button = node("button", "chat-chip", chip.chip);
        button.type = "button";
        button.addEventListener("click", () => ask(chip.chip, chip));
        return button;
      })
    );
  }

  function reply(answer) {
    busy = true;
    const typing = node("div", "chat-msg chat-msg-bot chat-typing");
    typing.setAttribute("aria-label", "Assistant is typing");
    typing.append(node("span"), node("span"), node("span"));
    log.append(typing);
    scrollToEnd();
    const delay = Math.min(1400, 450 + answer.text.length * 6);
    setTimeout(() => {
      typing.remove();
      addMessage(answer.text, "bot", answer.links);
      renderChips(answer.id);
      busy = false;
    }, delay);
  }

  function ask(text, forced) {
    if (busy || !text.trim()) return;
    addMessage(text.trim(), "user");
    chips.replaceChildren();
    reply(forced || match(text));
  }

  function toggle(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "Close chat assistant" : "Open chat assistant");
    root.classList.toggle("is-open", open);
    if (open) {
      if (!started) {
        started = true;
        addMessage("Hi there 👋 I’m the GivingOurs assistant. I can answer questions about volunteering, booking a session or signing up your company.", "bot");
        renderChips();
      }
      setTimeout(() => input.focus(), 50);
    } else {
      launcher.focus();
    }
  }

  launcher.addEventListener("click", () => toggle(panel.hidden));
  root.querySelector(".chat-close").addEventListener("click", () => toggle(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden && !document.querySelector("dialog[open]")) toggle(false);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value;
    input.value = "";
    ask(text);
  });
})();
