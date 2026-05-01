// ============================================================
//  TAKEOVER 2026 — Shared Data
//  All site content lives here. Update names, photos, links etc.
// ============================================================

export const TARGET_DATE = new Date("2026-05-11T00:00:00").getTime();

// Public photo placeholder used for any operator without a photo yet.
const PLACEHOLDER_PHOTO = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop";

export const DOMAINS = [
  { id: "entrepreneurship",name: "MGMT & ENT",       icon: "fa-lightbulb",       color: "var(--col-entrepreneurship)" },
  { id: "literary",        name: "LITERARY",         icon: "fa-book",            color: "var(--col-literary)" },
  { id: "photography",     name: "PHOTOGRAPHY",      icon: "fa-camera",          color: "var(--col-photography)" },
  { id: "sports",          name: "SPORTS",           icon: "fa-volleyball",      color: "var(--col-sports)" },
  { id: "tech",            name: "TECH",             icon: "fa-laptop-code",     color: "var(--col-tech)" },
  { id: "theatre",         name: "THEATRE",          icon: "fa-face-laugh-beam", color: "var(--col-theatre)" },
  { id: "culture",         name: "CULTURAL",         icon: "fa-masks-theater",   color: "var(--col-culture)" },
  { id: "esports",         name: "E-SPORTS",         icon: "fa-gamepad",         color: "var(--col-esports)" },
  { id: "film",            name: "FILM MAKING",      icon: "fa-clapperboard",    color: "var(--col-film)" },
  { id: "nss",             name: "NSS",              icon: "fa-hand-holding-heart", color: "var(--col-nss)" },
  { id: "art-design",      name: "ART & DESIGN",     icon: "fa-palette",         color: "var(--col-art-design)" },
  { id: "media",           name: "MEDIA",            icon: "fa-microphone",      color: "var(--col-media)" },
];

export function getDomain(id) { return DOMAINS.find((d) => d.id === id); }

export const EVENTS = [
    // ART & DESIGN
    { slug: "mega-cosplay",           name: "MEGA COSPLAY",                        domain: "art-design",       desc: "A cosplay fusion where imagination meets creativity, bringing anime and game characters to life through custom-designed costumes.", fee: 0,    teamSize: "1 model + 1–2 accompanists", date: "15 May", time: "12:00 PM", venue: "Old Auditorium" },
    { slug: "art-installation",       name: "ART INSTALLATION",                    domain: "art-design",       desc: "Teams build immersive installations that disrupt, transform, and express bold interpretations of the fest theme.",                  fee: 0,    teamSize: "3",                          date: "13 May", time: "11:00 AM", venue: "Atrium" },
    { slug: "digital-art",            name: "DIGITAL ART",                         domain: "art-design",       desc: "A solo digital art competition exploring evolving ideas, shifting perspectives, and transformation.",                              fee: 0,    teamSize: "1",                          date: "11 May", time: "12:00 PM", venue: "Room V" },
    { slug: "makeover-challenge",     name: "MAKEOVER CHALLENGE",                  domain: "art-design",       desc: "A fashion-based challenge where everyday looks are transformed into refined and elegant styles.",                                   fee: 0,    teamSize: "3 (2 designers + 1 model)",  date: "12 May", time: "11:00 AM", venue: "Fashion Lab" },
    { slug: "face-painting",          name: "FACE PAINTING",                       domain: "art-design",       desc: "A split-face concept where each half tells a different side of a transformation, forming a single cohesive visual story.",        fee: 0,    teamSize: "2 (1 designer + 1 model)",   date: "12 May", time: "12:00 PM", venue: "Room T" },

    // MANAGEMENT (mapped to MGMT & ENT)
    { slug: "brand-roulette",         name: "BRAND ROULETTE",                      domain: "entrepreneurship", desc: "A multi-round business simulation involving bidding, strategic decisions, and pitching a long-term growth plan.",                   fee: 0,    teamSize: "3–4 (1 team per college)",   date: "11 May", time: "1:00 PM",  venue: "Room K" },
    { slug: "the-panic-room",         name: "THE PANIC ROOM",                      domain: "entrepreneurship", desc: "A high-pressure interview simulation designed to test composure, critical thinking, and confidence.",                               fee: 0,    teamSize: "1 per college",              date: "12 May", time: "10:00 AM", venue: "Room O & Room N" },
    { slug: "crisis-capital",         name: "CRISIS CAPITAL",                      domain: "entrepreneurship", desc: "A strategy event where teams act as states of India, managing resources and adapting to a global financial crisis.",              fee: 0,    teamSize: "2–4 (1 team per college)",   date: "12 May", time: "12:00 PM", venue: "Room K" },
    { slug: "miles-and-minds",        name: "MILES & MINDS",                       domain: "entrepreneurship", desc: "A travel planning competition based on assigned destinations, budgets, and user personas.",                                        fee: 0,    teamSize: "2–4 (1 team per college)",   date: "13 May", time: "10:00 AM", venue: "Room J" },
    { slug: "ideathon",               name: "IDEATHON",                            domain: "entrepreneurship", desc: "A Shark Tank-style pitching event evaluating startup ideas on feasibility, scalability, and financial viability.",                 fee: 0,    teamSize: "2–4 (1 team per college)",   date: "13 May", time: "12:00 PM", venue: "Seminar Hall" },
    { slug: "raise-it-up",            name: "RAISE IT UP (IPL AUCTION)",           domain: "entrepreneurship", desc: "A cricket auction-based strategy event focused on bidding, team formation, and resource allocation.",                             fee: 0,    teamSize: "3–4 (1 team per college)",   date: "14 May", time: "9:00 AM",  venue: "Seminar Hall" },
    { slug: "domin8",                 name: "DOMIN8",                              domain: "entrepreneurship", desc: "A futuristic management simulation set in 2040 where teams take control of a brand and build a market domination strategy under constraints.", fee: 0, teamSize: "2–4 (1 team per college)", date: "14 May", time: "11:00 AM", venue: "Room J" },
    { slug: "brandstorm",             name: "BRANDSTORM",                          domain: "entrepreneurship", desc: "Participants convert a random product into a brand and develop a complete marketing strategy.",                                      fee: 0,    teamSize: "2–4 (1 team per college)",   date: "15 May", time: "10:00 AM", venue: "Room A & Room J" },

    // MEDIA
    { slug: "podwars",                name: "PODWARS (PODCAST BATTLE)",            domain: "media",            desc: "Teams craft and perform live podcast episodes head-to-head in a knockout-style battle.",                                            fee: 0,    teamSize: "2 + 1 host",                 date: "11 May", time: "11:00 AM", venue: "Studio" },
    { slug: "lights-camera-quiz",     name: "LIGHTS, CAMERA, QUIZ!",               domain: "media",            desc: "A media-and-entertainment quiz spanning film, music, OTT, and pop-culture trivia.",                                               fee: 0,    teamSize: "2–3",                        date: "12 May", time: "2:00 PM",  venue: "Room L" },
    { slug: "viralverse",             name: "VIRALVERSE (BRANDS, AD & PR)",        domain: "media",            desc: "A live brand-and-PR challenge: design a viral campaign across social, ad, and press channels.",                                    fee: 0,    teamSize: "2–4",                        date: "14 May", time: "11:00 AM", venue: "Room M" },
    { slug: "vibe-check",             name: "VIBE CHECK (FEST VLOGGING)",          domain: "media",            desc: "Capture the fest energy in a fast-cut vlog that turns five days into a single story.",                                            fee: 0,    teamSize: "3",                          date: "12 May", time: "12:00 PM", venue: "Room M" },
    { slug: "adfusion",               name: "ADFUSION",                            domain: "media",            desc: "A fast-paced ad-making sprint focused on creativity, copy, and on-the-spot impact.",                                              fee: 0,    teamSize: "2–3",                        date: "13 May", time: "11:00 AM", venue: "Room M" },

    // LITERARY
    { slug: "devils-advocate",        name: "DEVIL'S ADVOCATE (CHARACTER BIOPSY)", domain: "literary",         desc: "Reimagine a villain as a hero through a structured and persuasive written defense.",                                              fee: 0,    teamSize: "Up to 2 per college",        date: "11 May", time: "12:00 PM", venue: "Room O" },
    { slug: "inkxpress",              name: "INKXPRESS (CARICATURE & CALLIGRAPHY)",domain: "literary",         desc: "A duo event blending visual caricature creation with expressive, theme-based calligraphy.",                                        fee: 0,    teamSize: "2 (1 team per college)",     date: "11 May", time: "2:00 PM",  venue: "Room P" },
    { slug: "endgame",                name: "ENDGAME (ALTERNATE ENDING)",          domain: "literary",         desc: "Creatively rewrite the ending of a given movie or story segment in your own voice.",                                              fee: 0,    teamSize: "Up to 2 per college",        date: "12 May", time: "10:00 AM", venue: "Room P" },
    { slug: "whiplash",               name: "WHIPLASH (WRITING WITH A TWIST)",     domain: "literary",         desc: "A dynamic writing challenge where the narrative must adapt mid-way to unexpected twists.",                                        fee: 0,    teamSize: "Up to 2 per college",        date: "12 May", time: "12:00 PM", venue: "Room J" },
    { slug: "between-realms",         name: "BETWEEN REALMS (POETRY IN PAIRS)",    domain: "literary",         desc: "Pairs compose and present contrasting poems based on opposing themes or perspectives.",                                            fee: 0,    teamSize: "2 (1 team per college)",     date: "12 May", time: "2:30 PM",  venue: "Room H" },
    { slug: "volte-face",             name: "VOLTE-FACE (TURNCOAT DEBATE)",        domain: "literary",         desc: "A debate format where speakers must switch sides mid-speech, testing adaptability and argument strength.",                        fee: 0,    teamSize: "Up to 2 per college",        date: "13 May", time: "10:00 AM", venue: "BNI Hall" },

    // FILM & PHOTOGRAPHY → photography (camera-led) / film (production)
    { slug: "abstract-photo-hunt",    name: "ABSTRACT PHOTO HUNT",                 domain: "photography",      desc: "A multi-day photography challenge where participants capture abstract interpretations of given themes.",                            fee: 0,    teamSize: "1–3",                        date: "15 May", time: "10:00 AM", venue: "Room N (judging)" },
    { slug: "one-frame-one-truth",    name: "ONE FRAME, ONE TRUTH",                domain: "photography",      desc: "Submit a single powerful photograph that conveys emotion, reality, or a compelling story.",                                        fee: 0,    teamSize: "1–2",                        date: "15 May", time: "12:00 PM", venue: "Room I (judging)" },
    { slug: "photojournalism",        name: "PHOTOJOURNALISM",                     domain: "photography",      desc: "A live documentation event capturing the essence, energy, and key moments of the fest.",                                          fee: 0,    teamSize: "1–3",                        date: "15 May", time: "12:00 PM", venue: "Room G (judging)" },
    { slug: "photo-relay",            name: "PHOTO RELAY",                         domain: "photography",      desc: "A team-based storytelling challenge where participants create a sequence of images following evolving prompts.",                   fee: 0,    teamSize: "3–4",                        date: "15 May", time: "11:00 AM", venue: "Room H (judging)" },
    { slug: "reel-making",            name: "REEL MAKING",                         domain: "film",             desc: "Tell a story in a single short-form vertical reel — concept, shoot, edit, post.",                                                 fee: 0,    teamSize: "3–5 crew (excluding cast)",  date: "12 May", time: "10:00 AM", venue: "Room R" },
    { slug: "one-minute-short-film",  name: "ONE MINUTE SHORT FILM",               domain: "film",             desc: "Crafting a complete cinematic story inside a strict 60-second runtime.",                                                          fee: 0,    teamSize: "3–5 crew (excluding cast)",  date: "13 May", time: "11:00 AM", venue: "Seminar Hall" },
    { slug: "adverse",                name: "ADVERSE (TVC AD MAKING)",             domain: "film",             desc: "Teams create a high-impact television commercial from brief to final cut.",                                                        fee: 0,    teamSize: "3–5 crew (excluding cast)",  date: "14 May", time: "10:00 AM", venue: "Room R" },

    // SOCIAL ACTIVITY → NSS
    { slug: "eco-artistry",           name: "ECO ARTISTRY",                        domain: "nss",              desc: "Transform discarded and waste materials into striking, sustainable works of art.",                                                 fee: 0,    teamSize: "Individual or duo per college",        date: "11 May", time: "11:00 AM", venue: "Room T" },
    { slug: "non-fire-cooking",       name: "NON FIRE COOKING",                    domain: "nss",              desc: "Prepare creative and nourishing dishes — without using fire or heat at any stage.",                                              fee: 0,    teamSize: "Individual or up to 3 per college",    date: "12 May", time: "11:00 AM", venue: "2nd Campus Culinary Lab" },
    { slug: "social-awareness-ad",    name: "SOCIAL AWARENESS AD MAKING",          domain: "nss",              desc: "Design a campaign that drives awareness on a real social issue, presented to the audience.",                                    fee: 0,    teamSize: "Individual or up to 5 per college",    date: "13 May", time: "11:00 AM", venue: "Room P" },
    { slug: "60-seconds-spark",       name: "60 SECONDS SPARK",                    domain: "nss",              desc: "A one-minute platform to deliver an idea, story, or call to action that can spark change.",                                      fee: 0,    teamSize: "Individual or 2 per college",          date: "14 May", time: "11:00 AM", venue: "Room P" },
    { slug: "mime-for-a-cause",       name: "MIME FOR A CAUSE",                    domain: "nss",              desc: "A silent performance using only expression and movement to amplify a cause.",                                                    fee: 0,    teamSize: "Individual or up to 3 per college",    date: "14 May", time: "2:00 PM",  venue: "Room T" },

    // TECH (Tech & Esports → tech)
    { slug: "promptbattle-royale",    name: "PROMPTBATTLE ROYALE",                 domain: "tech",             desc: "A competitive AI prompt-engineering arena — craft optimized prompts to win each round.",                                          fee: 50,   teamSize: "Solo",                       date: "11 May", time: "12:00 PM", venue: "Room D2 & E2" },
    { slug: "quiz-carnage",           name: "QUIZ CARNAGE",                        domain: "tech",             desc: "A multi-stage technical quiz covering everything from core CS fundamentals to emerging tech.",                                    fee: 100,  teamSize: "2 (duo)",                    date: "12 May", time: "10:00 AM", venue: "Room F2" },
    { slug: "webwiz-ai",              name: "WEBWIZ AI",                           domain: "tech",             desc: "A rapid build challenge where duos ship an AI-powered web app inside a tight time window.",                                      fee: 100,  teamSize: "2 (duo)",                    date: "13 May", time: "10:00 AM", venue: "Room D2 & E2" },
    { slug: "code-blackout",          name: "CODE BLACKOUT: DEBUG OR DIE",         domain: "tech",             desc: "Code an unknown problem from scratch, then survive intense rounds of high-pressure debugging.",                                   fee: 100,  teamSize: "2 (duo)",                    date: "14 May", time: "10:00 AM", venue: "Room D2 & E2" },

    // E-SPORTS (Tech & Esports → esports)
    { slug: "bgmi",                   name: "BGMI (4V4)",                          domain: "esports",          desc: "Battle-royale tournament — qualifiers leading into a high-stakes 4v4 finals bracket.",                                            fee: 600,  teamSize: "4 + 1 substitute (1 team per college)",date: "14 May", time: "All Day",  venue: "Room C, D, E, F, G" },
    { slug: "valorant",               name: "VALORANT (5V5)",                      domain: "esports",          desc: "A tactical 5v5 shooter competition with offline final rounds on the main stage.",                                                 fee: 1000, teamSize: "5 + 1 substitute (1 team per college)",date: "12 May", time: "10:00 AM", venue: "Seminar Hall" },
    { slug: "mortal-kombat-1",        name: "MORTAL KOMBAT 1 (1V1)",               domain: "esports",          desc: "A 1v1 fighting tournament — fatalities, frame-perfect combos, and bragging rights.",                                            fee: 150,  teamSize: "1 (up to 2 per college)",     date: "11 May", time: "12:00 PM", venue: "Room J" },
    { slug: "e-football",             name: "E-FOOTBALL (1V1)",                    domain: "esports",          desc: "1v1 digital football matches testing strategy, control, and game sense.",                                                        fee: 150,  teamSize: "1 (up to 2 per college)",     date: "13 May", time: "10:00 AM", venue: "2nd Campus" },
    { slug: "fc26-pc",                name: "FC26 PC (1V1)",                       domain: "esports",          desc: "1v1 football simulation tournament played on PC — the best dribbler claims the cup.",                                            fee: 150,  teamSize: "1 (up to 2 per college)",     date: "11 May", time: "12:00 PM", venue: "Room R" },

    // SPORTS
    { slug: "cricket",                name: "CRICKET (MEN & WOMEN)",               domain: "sports",           desc: "Inter-college cricket tournament played on the ILEAD turf — bat, ball, and bragging rights.",                                    fee: 1500, teamSize: "10 (8+2) per college",       date: "11 May", time: "9:00 AM",  venue: "ILEAD Sports Turf" },
    { slug: "football",               name: "FOOTBALL (MEN & WOMEN)",              domain: "sports",           desc: "Inter-college football tournament — possession, pace, and pressure on the turf.",                                               fee: 1500, teamSize: "8 (5+3) per college",        date: "12 May", time: "9:00 AM",  venue: "ILEAD Sports Turf" },
    { slug: "throwball",              name: "THROWBALL (WOMEN)",                   domain: "sports",           desc: "A fast-paced women's throwball tournament demanding agility, coordination, and quick reflexes.",                               fee: 800,  teamSize: "10 (7+3) per college",       date: "13 May", time: "9:00 AM",  venue: "ILEAD Sports Turf" },
    { slug: "chess",                  name: "CHESS (MEN & WOMEN)",                 domain: "sports",           desc: "A solo chess tournament testing intellect, foresight, and decision-making on the board.",                                      fee: 400,  teamSize: "Solo (1 boy + 1 girl per college)",date: "14 May", time: "9:00 AM",  venue: "TBA" },
    { slug: "fitness-mania",          name: "FITNESS MANIA (MEN & WOMEN)",         domain: "sports",           desc: "A solo challenge measuring endurance, strength, and overall physical fitness.",                                                  fee: 500,  teamSize: "Solo (1 boy + 1 girl per college)",date: "13 May", time: "9:00 AM",  venue: "ILEAD Gym" },
    { slug: "tug-of-war",             name: "TUG OF WAR (MEN & WOMEN)",            domain: "sports",           desc: "A pure test of strength, unity, and coordination — rope, dirt, and a clean finish line.",                                      fee: 1000, teamSize: "8 (6+2) per college",        date: "14 May", time: "9:00 AM",  venue: "ILEAD Sports Turf" },

    // CULTURAL & THEATRE → culture (singing/dance/perf) and theatre (skits/biopics)
    { slug: "eastern-solo-singing",   name: "EASTERN SOLO SINGING",                domain: "culture",          desc: "Solo vocal performances rooted in classical, folk, and regional Indian music styles.",                                          fee: 200,  teamSize: "1 per college",              date: "12 May", time: "11:00 AM", venue: "New Auditorium" },
    { slug: "western-solo-singing",   name: "WESTERN SOLO SINGING",                domain: "culture",          desc: "Solo singing performances spanning western pop, rock, jazz, and contemporary genres.",                                          fee: 200,  teamSize: "1 + accompanist per college",date: "12 May", time: "12:00 PM", venue: "New Auditorium" },
    { slug: "duet-dance",             name: "DUET DANCE",                          domain: "culture",          desc: "A coordinated dance performance by two participants on a chosen theme.",                                                        fee: 300,  teamSize: "2 (1 team per college)",     date: "12 May", time: "2:00 PM",  venue: "New Auditorium" },
    { slug: "street-battle",          name: "STREET BATTLE",                       domain: "culture",          desc: "A high-intensity solo dance battle emphasizing freestyle, flow, and street style.",                                              fee: 200,  teamSize: "1 per college",              date: "12 May", time: "1:00 PM",  venue: "Laguna Bay" },
    { slug: "eastern-solo-dance",     name: "EASTERN SOLO DANCE",                  domain: "culture",          desc: "Solo performances showcasing classical and traditional Indian dance forms.",                                                    fee: 200,  teamSize: "1 per college",              date: "14 May", time: "11:00 AM", venue: "New Auditorium" },
    { slug: "western-solo-dance",     name: "WESTERN SOLO DANCE",                  domain: "culture",          desc: "Solo performances highlighting contemporary, jazz, hip-hop and other western dance styles.",                                    fee: 200,  teamSize: "1 per college",              date: "14 May", time: "12:30 PM", venue: "New Auditorium" },
    { slug: "eastern-group-dance",    name: "EASTERN GROUP DANCE",                 domain: "culture",          desc: "Synchronised group performances rooted in traditional and Indian dance forms.",                                               fee: 500,  teamSize: "12 + 3 (1 team per college)",date: "13 May", time: "2:00 PM",  venue: "New Auditorium" },
    { slug: "western-group-dance",    name: "WESTERN GROUP DANCE",                 domain: "culture",          desc: "Energetic group performances featuring contemporary western choreography.",                                                      fee: 500,  teamSize: "12 + 3 (1 team per college)",date: "13 May", time: "3:00 PM",  venue: "New Auditorium" },
    { slug: "war-of-rappers",         name: "WAR OF RAPPERS",                      domain: "culture",          desc: "A lyrical battle highlighting rhythm, wordplay, flow, and stage presence.",                                                    fee: 200,  teamSize: "1 per college",              date: "13 May", time: "11:00 AM", venue: "New Auditorium" },
    { slug: "fashion-show",           name: "FASHION SHOW",                        domain: "culture",          desc: "A themed runway showcase celebrating creativity, style, and bold expression.",                                                  fee: 600,  teamSize: "10 + 2 per college",         date: "15 May", time: "2:00 PM",  venue: "New Auditorium" },
    { slug: "battle-of-bands",        name: "BATTLE OF BANDS",                     domain: "culture",          desc: "Live competitive sets where college bands take the stage and fight for the crown.",                                              fee: 0,    teamSize: "—",                          date: "15 May", time: "All Day",  venue: "—" },
    { slug: "mr-and-ms-managedia",    name: "MR & MS MANAGEDIA",                   domain: "culture",          desc: "A personality, talent, and on-stage round contest crowning the face of the fest.",                                             fee: 100,  teamSize: "1 male + 1 female per college",date: "15 May", time: "12:00 PM", venue: "New Auditorium" },

    { slug: "duoact",                 name: "DUOACT (TWO BRAINCELLS)",             domain: "theatre",          desc: "A duo acting challenge testing chemistry, improvisation, and live performance.",                                                  fee: 200,  teamSize: "2 (1 team per college)",     date: "12 May", time: "3:30 PM",  venue: "New Auditorium" },
    { slug: "curtains-and-consequences", name: "CURTAINS & CONSEQUENCES (SKIT)",   domain: "theatre",          desc: "A full-length theatrical performance showcasing acting, direction, and stagecraft.",                                            fee: 600,  teamSize: "15 + 3 (1 team per college)",date: "14 May", time: "2:00 PM",  venue: "New Auditorium" },
    { slug: "mic-pe-mayhem",          name: "MIC PE MAYHEM (RADIO DRAMA)",         domain: "theatre",          desc: "An audio-only radio drama performance focusing on voice modulation and storytelling.",                                          fee: 300,  teamSize: "4 + 2 per college",          date: "15 May", time: "11:00 AM", venue: "Room P" },
    { slug: "recreate-ya-regret",     name: "RECREATE YA REGRET (BOLLYWOOD RECREATION)", domain: "theatre",    desc: "Recreate iconic Bollywood scenes with creative, often hilarious, twists.",                                                      fee: 300,  teamSize: "5 + 1 (1 team per college)", date: "15 May", time: "11:00 AM", venue: "New Auditorium" },
  ];

// ---------- Per-event Google Docs (R&R) and Google Forms (registration) -----
// Each event can have its own Rules & Regulations Google Doc URL and its own
// registration Google Form URL. Until you add the real URLs, they fall back
// to per-slug placeholder URLs that you can find/replace later (look for
// `REPLACE_RULES_<slug>` and `REPLACE_FORM_<slug>` in this file).
//
// HOW TO ADD A REAL URL FOR AN EVENT:
//   1. Open the EVENT_LINKS object below.
//   2. Add an entry keyed by the event's `slug` with `rulesUrl` and/or `formUrl`.
//   Example:
//     "bgmi": {
//       rulesUrl: "https://docs.google.com/document/d/abcd1234/view",
//       formUrl:  "https://docs.google.com/forms/d/e/wxyz5678/viewform",
//     },
//
// Anything you don't add here keeps using the placeholder URL (the button
// will still render, but clicking it opens the placeholder URL).
// ----------------------------------------------------------------------------
const SPORTS_FORM   = "https://forms.gle/bN8UHMZXYEJAxMBc6";
const CULTURAL_FORM = "https://forms.gle/DQa5Tr1k6SgWdp8A9";
const THEATRE_FORM  = "https://forms.gle/DQa5Tr1k6SgWdp8A9";
const GENERAL_FORM  = "https://forms.gle/VAZ7vJsiVVpeEGdP9";

export const EVENT_LINKS = {
  // Sports events
  "cricket":       { formUrl: SPORTS_FORM },
  "football":      { formUrl: SPORTS_FORM },
  "throwball":     { formUrl: SPORTS_FORM },
  "chess":         { formUrl: SPORTS_FORM },
  "fitness-mania": { formUrl: SPORTS_FORM },
  "tug-of-war":    { formUrl: SPORTS_FORM },

  // Cultural events (dance, singing, fashion)
  "eastern-solo-singing":      { formUrl: CULTURAL_FORM },
  "western-solo-singing":      { formUrl: CULTURAL_FORM },
  "street-battle":             { formUrl: CULTURAL_FORM },
  "duet-dance":                { formUrl: CULTURAL_FORM },
  "eastern-solo-dance":        { formUrl: CULTURAL_FORM },
  "western-solo-dance":        { formUrl: CULTURAL_FORM },
  "eastern-group-dance":       { formUrl: CULTURAL_FORM },
  "western-group-dance":       { formUrl: CULTURAL_FORM },
  "war-of-rappers":            { formUrl: CULTURAL_FORM },
  "battle-of-bands":           { formUrl: CULTURAL_FORM },
  "mr-and-ms-managedia":       { formUrl: CULTURAL_FORM },
  "fashion-show":              { formUrl: CULTURAL_FORM },

  // Theatre events
  "duoact":                    { formUrl: THEATRE_FORM },
  "curtains-and-consequences": { formUrl: THEATRE_FORM },
  "mic-pe-mayhem":             { formUrl: THEATRE_FORM },
  "recreate-ya-regret":        { formUrl: THEATRE_FORM },

  // Art & Design
  "mega-cosplay":       { formUrl: GENERAL_FORM },
  "art-installation":   { formUrl: GENERAL_FORM },
  "digital-art":        { formUrl: GENERAL_FORM },
  "makeover-challenge": { formUrl: GENERAL_FORM },
  "face-painting":      { formUrl: GENERAL_FORM },

  // Management & Entrepreneurship
  "brand-roulette":  { formUrl: GENERAL_FORM },
  "the-panic-room":  { formUrl: GENERAL_FORM },
  "crisis-capital":  { formUrl: GENERAL_FORM },
  "miles-and-minds": { formUrl: GENERAL_FORM },
  "ideathon":        { formUrl: GENERAL_FORM },
  "raise-it-up":     { formUrl: GENERAL_FORM },
  "domin8":          { formUrl: GENERAL_FORM },
  "brandstorm":      { formUrl: GENERAL_FORM },

  // Media
  "podwars":           { formUrl: GENERAL_FORM },
  "lights-camera-quiz":{ formUrl: GENERAL_FORM },
  "viralverse":        { formUrl: GENERAL_FORM },
  "vibe-check":        { formUrl: GENERAL_FORM },
  "adfusion":          { formUrl: GENERAL_FORM },

  // Literary
  "devils-advocate": { formUrl: GENERAL_FORM },
  "inkxpress":       { formUrl: GENERAL_FORM },
  "endgame":         { formUrl: GENERAL_FORM },
  "whiplash":        { formUrl: GENERAL_FORM },
  "between-realms":  { formUrl: GENERAL_FORM },
  "volte-face":      { formUrl: GENERAL_FORM },

  // Photography & Film
  "abstract-photo-hunt":  { formUrl: GENERAL_FORM },
  "one-frame-one-truth":  { formUrl: GENERAL_FORM },
  "photojournalism":      { formUrl: GENERAL_FORM },
  "photo-relay":          { formUrl: GENERAL_FORM },
  "reel-making":          { formUrl: GENERAL_FORM },
  "one-minute-short-film":{ formUrl: GENERAL_FORM },
  "adverse":              { formUrl: GENERAL_FORM },

  // NSS / Social Activity
  "eco-artistry":       { formUrl: GENERAL_FORM },
  "non-fire-cooking":   { formUrl: GENERAL_FORM },
  "social-awareness-ad":{ formUrl: GENERAL_FORM },
  "60-seconds-spark":   { formUrl: GENERAL_FORM },
  "mime-for-a-cause":   { formUrl: GENERAL_FORM },

  // Tech
  "promptbattle-royale": { formUrl: GENERAL_FORM },
  "quiz-carnage":        { formUrl: GENERAL_FORM },
  "webwiz-ai":           { formUrl: GENERAL_FORM },
  "code-blackout":       { formUrl: GENERAL_FORM },

  // E-Sports
  "bgmi":           { formUrl: GENERAL_FORM },
  "valorant":       { formUrl: GENERAL_FORM },
  "mortal-kombat-1":{ formUrl: GENERAL_FORM },
  "e-football":     { formUrl: GENERAL_FORM },
  "fc26-pc":        { formUrl: GENERAL_FORM },
};

function defaultRulesUrl(slug) {
  return `https://docs.google.com/document/d/REPLACE_RULES_${slug}/view`;
}
function defaultFormUrl(slug) {
  return `https://docs.google.com/forms/d/e/REPLACE_FORM_${slug}/viewform`;
}

EVENTS.forEach((e) => {
  const override = EVENT_LINKS[e.slug] || {};
  e.rulesUrl = override.rulesUrl || defaultRulesUrl(e.slug);
  e.formUrl  = override.formUrl  || defaultFormUrl(e.slug);
});

// Map domain -> events
export const EVENTS_BY_DOMAIN = DOMAINS.reduce((acc, d) => {
  acc[d.id] = EVENTS.filter((e) => e.domain === d.id);
  return acc;
}, {});

// Generic rules — same for every event (adapt per event later if needed).
export const COMMON_RULES = [
  "Participants must arrive at the venue 30 minutes before the event start time.",
  "All participants must present a valid college ID at the registration desk.",
  "Use of any unfair means leads to immediate disqualification.",
  "The judges' decision is final and binding.",
  "Team composition cannot be changed after the registration is verified.",
  "Equipment, props and materials must be brought by participants unless specified.",
  "Time limits announced on stage are strict — overruns invite point deductions.",
  "All registered participants must read and accept the TAKEOVER 2026 Code of Conduct.",
];

// ============================================================
//  THE OPERATORS — placeholder data; replace with real members.
// ============================================================
function person(name, position, instagram, whatsapp, photo, imgStyle) {
  return { name, position, instagram, whatsapp, photo: photo || PLACEHOLDER_PHOTO, imgStyle: imgStyle || "" };
}

// Core Council is laid out as a 2x... grid:
// Row 1: President + Vice President
// Row 2: AVP - School of Business, AVP - Technology, AVP - Creativity
// Helper: phone number ("+91 98755 18542" or "+919163320630") -> wa.me URL.
// Returns "" if no usable number provided so the social icon hides.
function wa(phone) {
  if (!phone) return "";
  const digits = String(phone).replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export const CORE_COUNCIL = [
  person("Iftikhar Hossain", "President",                                     "https://www.instagram.com/ifti.kharr101/", wa("+91 98755 18542"), "/core-council/Iftikhar_Hossain.jpeg"),
  person("Raj Aryan",        "Vice President",                                "https://www.instagram.com/rajxaryan9/",    wa("+91 82524 54419"), "/core-council/Raj_Aryan.jpeg"),
  person("Romit Ganguly",    "Associate Vice President — School of Business", "https://www.instagram.com/romit.fit/",     wa("+91 6289 611 692"), "/core-council/Romit_Ganguly.jpeg"),
  person("Amit Mishra",      "Associate Vice President — Technology",         "https://www.instagram.com/awmitmishra/",   wa("+91 831 826 4578"), "/core-council/Amit_Mishra.jpeg"),
  person("Shayak Tarafdar",  "Associate Vice President — Creativity",         "https://www.instagram.com/__shayak/",      wa("+91 94321 38493"), "/core-council/Shayak_Tarafdar.jpeg"),
];

export const EXECUTIVE_COUNCIL = [
  person("Suranjana Sen",       "Interior Designing",                "https://www.instagram.com/suranjanasen001/",                 wa("+91 89024 31861"), "/exec-council/Suranjana_Sen.jpeg", "object-position: top center"),
  person("Riddhi Shah",         "Fashion",                           "https://www.instagram.com/rivayabyriddhi/",                  wa("+91 7439 553 275"), "/exec-council/Riddhi_Shah.jpeg"),
  person("Aneek Roy",           "Cyber Security",                    "https://www.instagram.com/r.aneek_/",                        wa("+91 824 032 5542"), "/club-heads/Aneek_Roy.jpg"),
  person("Shaikh Zaid Rahman",  "BCA",                               "https://www.instagram.com/_szr_027/",                        wa("+91 62905 75310"), "/exec-council/Shaikh_Zaid_Rahman.png", "object-fit: contain; object-position: center"),
  person("Afifa Noor",          "Optometry",                         "https://www.instagram.com/afifanoorharoon/",                 wa("+91 85850 28677"), "/exec-council/Afifa_Noor.jpeg"),
  person("Sourin Bhattacharjee","BMAGD",                             "",                                                           wa("+91 6290 776 964"), "/exec-council/Sourin_Bhattacharjee.jpeg"),
  person("Aritra Dutta",        "Travel & Tourism Management",       "https://www.instagram.com/the_lost_traveller_since_2000/",   wa("")),
  person("Yash Gupta",          "Digital Marketing",                 "https://www.instagram.com/y_a_s_h2512/",                     wa("")),
  person("Rupol Bhattacharjee", "Sports Management",                 "https://www.instagram.com/_.rupol._/",                       wa("+91 94321 68883")),
  person("Prantika Saha",       "Hospital Management",               "https://www.instagram.com/dimple_isha_05/",                  wa(""), "/club-heads/Prantika_Saha.jpeg"),
  person("Rajdeep Nag",         "Critical Care Technology",          "",                                                           wa(""),                "/exec-council/Rajdeep_Nag.jpeg"),
  person("Zarin Tasneem",       "Data Science",                      "https://www.instagram.com/just._.zarin/",                    wa("+91 6291 397 577"), "/exec-council/Zarin_Tasneem.jpeg"),
  person("Aditya Kr Chaurasia", "Medical Lab Technology",            "https://www.instagram.com/aditya_chaurasia_2303/",           wa(""),                "/exec-council/Aditya_Kr_Chaurasia.jpeg"),
  person("Md Afsar Ali",        "Entrepreneurship",                  "",                                                           wa("+91 6289 089 521")),
  person("Sampurna Choudhury",  "Film and Television",               "https://www.instagram.com/sammzzz_diary/",                   wa("+91 824 028 3239"), "/exec-council/Sampurna_Choudhury.jpeg"),
  person("Ankita Deb",          "BBA",                               "https://www.instagram.com/deb_ankitadeb14/",                 wa("+91 6290 111 676"), "/exec-council/Ankita_Deb.jpeg"),
  person("Praggya Mallick",     "Media Science",                     "",                                                           wa("+91 98318 45210"), "/exec-council/Praggya_Mallick.jpeg"),
];

// Club Heads — grouped by club (most clubs have two heads).
export const CLUB_HEADS = [
  // Cultural Club
  person("Bhargabi Das",       "Cultural Club Head",          "https://www.instagram.com/bhargabiii_04/",      wa("+91 98311 73664"), "/club-heads/Bhargabi_Das.jpeg"),
  person("Zunaira Mehek",      "Cultural Club Head",          "",                                              wa("+91 70031 89474"), "/club-heads/Zunaira_Mehek.jpeg"),
  // Entrepreneurship Club
  person("Iqra Siddique",      "Entrepreneurship Club Head",  "",                                              wa("+91 91633 20630"), "/club-heads/Iqra_Siddique.jpg"),
  person("Anushka Das",        "Entrepreneurship Club Head",  "",                                              wa(""),                "/club-heads/Anushka_Das.jpg"),
  // E-Sports Club
  person("Aneek Roy",          "E-Sports Club Head",          "https://www.instagram.com/r.aneek_/",           wa("+91 824 032 5542"), "/club-heads/Aneek_Roy.jpg"),
  person("Sutap Sinharay",     "E-Sports Club Head",          "https://www.instagram.com/sunny.not.so.sunny/", wa("+91 824 053 9498"), "/club-heads/Sutap_Sinharay.jpg"),
  // Film Making Club
  person("Tanisa Saha",        "Film Making Club Head",       "https://www.instagram.com/chand_mollikaa/",     wa(""),                "/club-heads/Tanisa_Saha.jpg"),
  person("Romit Saha",         "Film Making Club Head",       "https://www.instagram.com/ginieee___/",         wa(""), "/club-heads/Romit_Saha.jpeg"),
  // Literary Club (single head)
  person("Barsharani Mahapatra","Literary Club Head",         "https://www.instagram.com/barrsha.m/",          wa("+91 80136 68664"), "/club-heads/Barsharani_Mahapatra.jpg"),
  // NSS Club
  person("Prantika Saha",      "NSS Club Head",               "https://www.instagram.com/dimple_isha_05/",     wa(""),                "/club-heads/Prantika_Saha.jpeg"),
  person("Md Shazeb Khan",     "NSS Club Head",               "",                                              wa("")),
  // Photography Club
  person("Namrata Gupta",      "Photography Club Head",       "https://www.instagram.com/gupta.namrata_/",     wa(""),                "/club-heads/Namrata_Gupta.jpg"),
  person("Ayushman Bag",       "Photography Club Head",       "",                                              wa(""),                "/club-heads/Ayushman_Bag.jpg"),
  // Sports Club
  person("Md Afsar Mallick",   "Sports Club Head",            "https://www.instagram.com/afsxr_/",             wa("")),
  person("Sahil Sharma",       "Sports Club Head",            "",                                              wa(""),                "/club-heads/Sahil_Sharma.jpg"),
  // Tech Club
  person("Ayushmita Baidya",   "Tech Club Head",              "https://www.instagram.com/__little_adorable__/",wa("+91 6289 206 386"), "/club-heads/Ayushmita_Baidya.jpeg"),
  person("Sidrah Rashid",      "Tech Club Head",              "https://www.instagram.com/takhayyul.by.sidrah/",wa("+91 83349 62027"), "/club-heads/Sidrah_Rashid.jpeg"),
  // Theatre Club
  person("Susanta Das",        "Theatre Club Head",           "",                                              wa("+91 98369 52375")),
  person("Ritika Jaiswal",     "Theatre Club Head",           "https://www.instagram.com/__r.jaisss___/",      wa(""),                "/club-heads/Ritika_Jaiswal.jpeg"),
];

// Website architect — credit card on the home page.
export const ARCHITECT = {
  name: "Shaikh Zaid Rahman",
  role: "Website Architect",
  blurb: "Designed, engineered and hand-coded every pixel of TAKEOVER 2026 — from the loader to the last footer link.",
  instagram: "https://www.instagram.com/_szr_027/",
  whatsapp: "https://wa.me/919876543210",
  github: "https://github.com/",
};

// ============================================================
//  HISTORY HIGHLIGHTS (replace with real assets later)
// ============================================================
// Six years told as one continuous story — each card is a chapter.
// Read top-to-bottom (latest year first) or bottom-up (origin first).
export const HISTORY = [
  {
    year: "2025",
    title: "Timeless Odyssey",
    desc: "An odyssey across eras — every act on stage, a chapter from a different time. The campus became a time machine, and TAKEOVER 2025 reminded everyone that great moments never go out of style.",
    media: "/history/timeless-odyssey.png",
    isVideo: false,
  },
  {
    year: "2024",
    title: "The Octet",
    desc: "Eight bold worlds, one fest. Eight stages running in parallel, each with its own pulse — coding, dance, drama, sport, film, fashion, music, and madness — colliding into one unforgettable rhythm.",
    media: "/history/the-octet.png",
    isVideo: false,
  },
  {
    year: "2023",
    title: "Upside Down Reality",
    desc: "We flipped the script. Spectators became performers, juries became contestants, classrooms became battlegrounds. For three days, normal didn't exist — and nobody wanted it back.",
    media: "/history/upside-down-reality.png",
    isVideo: false,
  },
  {
    year: "2022",
    title: "Serendipity",
    desc: "Strangers became bands. Ideas became startups. A passing chord became an anthem the campus still hums. TAKEOVER 2022 was every happy accident a fest could ever wish for.",
    media: "/history/serendipity.png",
    isVideo: false,
  },
];

// ============================================================
//  CONTACT
// ============================================================
export const CONTACTS = {
  email: "managedia2026@gmail.com",
  whatsapp: "+91 98765 43210",
  whatsappLink: "https://wa.me/919876543210",
  instagram: "https://www.instagram.com/ileadmanagedia/",
  youtube: "https://youtube.com/@takeover.ilead",
  brochure: "https://drive.google.com/file/d/1RugQaxJqMk8iE-KjNStmmzS_zIoPoFyI/view?usp=sharing",
};

// ============================================================
//  GOOGLE FORMS — REPLACE WITH YOUR REAL FORM IDS & ENTRY IDS
//  How to find these:
//  1. Open your Google Form, click "Send" -> link icon -> copy link.
//     The form ID is in the URL: docs.google.com/forms/d/e/<FORM_ID>/viewform
//     Use that FORM_ID below.
//  2. Open the form's pre-filled link feature, fill values, "Get link".
//     The URL contains entry.NUMBER=value pairs. Map each entry ID
//     to the field below.
// ============================================================
export const GOOGLE_FORMS = {
  eventRegistration: {
    formId: "REPLACE_WITH_GOOGLE_FORM_ID",
    fields: {
      eventName:  "entry.111111111",
      name:       "entry.222222222",
      email:      "entry.333333333",
      phone:      "entry.444444444",
      college:    "entry.555555555",
      teamName:   "entry.666666666",
      paymentRef: "entry.777777777",
    },
  },
  campusRep: {
    formId: "REPLACE_WITH_GOOGLE_FORM_ID",
    fields: {
      name:       "entry.111111111",
      email:      "entry.222222222",
      phone:      "entry.333333333",
      college:    "entry.444444444",
      course:     "entry.555555555",
      year:       "entry.666666666",
      city:       "entry.777777777",
      instagram:  "entry.888888888",
      whyJoin:    "entry.999999999",
      experience: "entry.101010101",
    },
  },
  sponsor: {
    formId: "REPLACE_WITH_GOOGLE_FORM_ID",
    fields: {
      companyName:     "entry.111111111",
      contactName:     "entry.222222222",
      email:           "entry.333333333",
      phone:           "entry.444444444",
      sponsorshipType: "entry.555555555",
      budget:          "entry.666666666",
      message:         "entry.777777777",
    },
  },
};

export function googleFormUrl(formId) {
  return `https://docs.google.com/forms/d/e/${formId}/formResponse`;
}
