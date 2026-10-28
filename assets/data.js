const VOLUNTEERS = [
  {
    id: "adaeze-morris",
    name: "Adaeze Morris",
    role: "Senior Finance Business Partner",
    employer: "Aviva",
    location: "Norwich",
    skills: ["finance", "operations"],
    tags: ["Cash-flow planning", "Pricing strategy", "Budgeting"],
    dayOffsets: [9, 23, 37],
    memberSince: "March 2025",
    bio: "Adaeze has spent 12 years in insurance finance, helping teams turn numbers into decisions. She uses her volunteering days to help founders get a clear view of cash flow and price their products with confidence.",
    engagements: [
      { business: "Mama Nkechi Foods", sector: "Food production", city: "Enugu", help: "Rebuilt product pricing to cover rising ingredient costs, protecting a 22% margin.", month: "Sep 2026", hours: 7, rating: 5, quote: "She found money we were losing on every jar. We changed our prices the next week." },
      { business: "Kudi Tailoring Co-op", sector: "Fashion & textiles", city: "Kano", help: "Set up a simple 13-week cash-flow forecast in Google Sheets.", month: "Jul 2026", hours: 7, rating: 5, quote: "For the first time we can see the month ahead before it arrives." },
      { business: "BrightPath Pharmacy", sector: "Healthcare retail", city: "Ibadan", help: "Prepared a budget and stock-holding plan ahead of a bank loan application.", month: "May 2026", hours: 14, rating: 4, quote: "Clear and patient. Our loan officer was impressed with the plan." },
    ],
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    role: "Brand & Growth Strategy Manager",
    employer: "PwC",
    location: "London",
    skills: ["marketing"],
    tags: ["Brand strategy", "Go-to-market", "Customer research"],
    dayOffsets: [14, 42],
    memberSince: "January 2026",
    bio: "James advises consumer brands on growth at PwC. He helps small businesses work out who their best customers are and how to reach more of them without a big marketing budget.",
    engagements: [
      { business: "Zuri Skincare", sector: "Beauty", city: "Lagos", help: "Repositioned the brand for export customers and planned an Instagram launch.", month: "Aug 2026", hours: 7, rating: 5, quote: "James helped us tell our story. Our first UK order came three weeks later." },
      { business: "Abuja Bike Couriers", sector: "Logistics", city: "Abuja", help: "Ran customer interviews and simplified the service offer to three clear packages.", month: "Jun 2026", hours: 7, rating: 5, quote: "Fewer options, more sales. Simple advice that worked." },
    ],
  },
  {
    id: "sophie-kingsley",
    name: "Dr Sophie Kingsley",
    role: "Lecturer in Computing Sciences",
    employer: "UEA",
    location: "Norwich",
    skills: ["technology"],
    tags: ["Web development", "Data & AI", "Digital tools"],
    dayOffsets: [6, 20, 34, 48],
    memberSince: "October 2025",
    bio: "Sophie teaches software engineering at the University of East Anglia. She helps businesses choose practical digital tools, get online and make better use of the data they already have.",
    engagements: [
      { business: "AgroLink Farmers Hub", sector: "Agriculture", city: "Kaduna", help: "Designed a WhatsApp ordering flow and a shared stock spreadsheet for 40 farmers.", month: "Sep 2026", hours: 14, rating: 5, quote: "Our farmers now take orders from the city without travelling." },
      { business: "Owambe Events", sector: "Events", city: "Lagos", help: "Built a simple booking website and online payment page.", month: "Jun 2026", hours: 7, rating: 5, quote: "We look professional online now. Bookings are up." },
      { business: "Delta Print Studio", sector: "Printing", city: "Benin City", help: "Moved job tracking from paper to a free cloud tool.", month: "Apr 2026", hours: 7, rating: 4, quote: "Very knowledgeable and explained everything slowly for my team." },
      { business: "Sabo Solar", sector: "Renewable energy", city: "Kano", help: "Analysed installation data to spot the most profitable neighbourhoods.", month: "Feb 2026", hours: 7, rating: 5, quote: "She turned our messy records into a map of where to sell next." },
    ],
  },
  {
    id: "tom-fletcher",
    name: "Tom Fletcher",
    role: "Audit & Assurance Director",
    employer: "PwC",
    location: "Manchester",
    skills: ["finance", "operations"],
    tags: ["Bookkeeping", "Financial controls", "Investor readiness"],
    dayOffsets: [11, 25],
    memberSince: "February 2026",
    bio: "Tom leads audit teams at PwC. He helps growing businesses put simple financial controls in place so they're ready for investors, lenders and bigger customers.",
    engagements: [
      { business: "Naija Crafts Export", sector: "Crafts & export", city: "Lagos", help: "Prepared financial records and a data room for a first investor meeting.", month: "Aug 2026", hours: 14, rating: 5, quote: "Tom made us investor-ready. We closed our first funding round." },
      { business: "Port City Fisheries", sector: "Food & fishing", city: "Port Harcourt", help: "Introduced basic bookkeeping and separation of business and personal accounts.", month: "May 2026", hours: 7, rating: 4, quote: "Simple rules that saved us from big mistakes." },
    ],
  },
  {
    id: "ella-barnes",
    name: "Ella Barnes",
    role: "Lead UX Designer",
    employer: "Aviva",
    location: "London",
    skills: ["technology", "marketing"],
    tags: ["Website design", "User research", "E-commerce"],
    dayOffsets: [16, 30, 44],
    memberSince: "December 2025",
    bio: "Ella leads digital design for Aviva's customer apps. She helps businesses make their websites and online shops easier to use, so more visitors become customers.",
    engagements: [
      { business: "Ankara House", sector: "Fashion retail", city: "Abuja", help: "Redesigned the online shop checkout, cutting it from six steps to three.", month: "Sep 2026", hours: 7, rating: 5, quote: "Online sales nearly doubled after Ella's changes." },
      { business: "LearnPlus Tutors", sector: "Education", city: "Ibadan", help: "Tested the parent sign-up journey and fixed the biggest drop-off points.", month: "Jul 2026", hours: 7, rating: 5, quote: "She watched real parents use our site. Eye-opening." },
      { business: "Chop Express", sector: "Food delivery", city: "Enugu", help: "Created a simple design system for the menu and ordering screens.", month: "Mar 2026", hours: 7, rating: 4, quote: "Our app finally looks like one product." },
    ],
  },
  {
    id: "chika-nwosu",
    name: "Chika Nwosu",
    role: "Supply Chain & Operations Lead",
    employer: "UEA",
    location: "Norwich",
    skills: ["operations"],
    tags: ["Supply chain", "Process improvement", "Logistics"],
    dayOffsets: [8, 29],
    memberSince: "April 2026",
    bio: "Chika runs procurement and logistics for the University of East Anglia. She helps businesses reduce waste, manage suppliers and keep stock moving.",
    engagements: [
      { business: "FreshMart Groceries", sector: "Grocery retail", city: "Lagos", help: "Mapped the restocking process and reduced spoiled stock by a third.", month: "Aug 2026", hours: 7, rating: 5, quote: "Less waste, fuller shelves. Chika understood our market immediately." },
      { business: "Kano Leatherworks", sector: "Manufacturing", city: "Kano", help: "Negotiation plan and scorecard for leather and dye suppliers.", month: "Jun 2026", hours: 7, rating: 5, quote: "We saved on materials in the first month." },
    ],
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

function volunteerStats(volunteer) {
  const list = volunteer.engagements;
  const hours = list.reduce((sum, item) => sum + item.hours, 0);
  const rating = list.reduce((sum, item) => sum + item.rating, 0) / list.length;
  return { businesses: list.length, hours, rating: Math.round(rating * 10) / 10 };
}

function starRating(value, label) {
  const wrap = el("span", "stars");
  wrap.setAttribute("role", "img");
  wrap.setAttribute("aria-label", label || `${value} out of 5 stars`);
  for (let i = 1; i <= 5; i++) {
    const star = el("span", "star", "★");
    star.setAttribute("aria-hidden", "true");
    if (value >= i) star.classList.add("is-full");
    else if (value >= i - 0.5) star.classList.add("is-half");
    wrap.append(star);
  }
  return wrap;
}

function findVolunteer(id) {
  return VOLUNTEERS.find((volunteer) => volunteer.id === id);
}
