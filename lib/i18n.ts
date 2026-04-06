export type Locale = "en" | "fr" | "es";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
};

interface DivisionText {
  title: string[];
  subtitle: string;
  buttons: { label: string; href: string }[];
  objectLabel?: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Solution {
  title: string;
  desc: string;
}

interface PASNarrative {
  brandHook: { title: string; subtitle: string };
  problem: { eyebrow: string; headline: string; body: string; costNumber: string; costLabel: string };
  agitation: { facts: { number: string; text: string }[] };
  guide: { headline: string };
  plan: { steps: { title: string; desc: string }[] };
  stakes: { number: number; suffix: string; subtitle: string };
  beforeAfter: { beforeTitle: string; afterTitle: string; beforeItems: string[]; afterItems: string[] };
  testimonial: { quote: string; name: string; title: string; company: string; metric: number; metricSuffix: string; metricLabel: string };
  finalCta: { headline: string; primary: string; secondary: string };
  onlyWe: string;
}

interface SiteText {
  nav: { about: string; divisions: string; solutions: string; contact: string; login: string };
  hero: { scroll: string; divisions: DivisionText[] };
  narrative: PASNarrative;
  stats: Stat[];
  about: { heading: string; body: string; mission: string; missionBody: string; values: string; valuesBody: string };
  divisionsSection: { heading: string; subtitle: string };
  divisionsGrid: { name: string; desc: string; icon: string; painPoint: string; solution: string; cta: string; slug: string }[];
  solutions: { heading: string; subtitle: string; items: Solution[] };
  clients: { heading: string; subtitle: string; names: string[] };
  contact: { heading: string; body: string; cta: string; form: { name: string; email: string; company: string; message: string; send: string } };
  footer: { tagline: string; company: string; location: string; copyright: string; links: { label: string; href: string }[]; divisions: string; quickLinks: string };
}

const en: SiteText = {
  nav: { about: "The Story", divisions: "Divisions", solutions: "What We Build", contact: "Your Move", login: "Login" },
  hero: {
    scroll: "Scroll",
    divisions: [
      {
        title: ["Predictive", "Maintenance"],
        subtitle: "Vibration analysis, laser alignment, thermography, and rotor balancing. We diagnose equipment failures before they happen \u2014 20 years of field expertise turned into predictive technology.",
        buttons: [{ label: "Learn More", href: "/divisions/predictive-maintenance" }, { label: "Talk to an Engineer", href: "/contact" }],
      },
      {
        title: ["Software", "Development"],
        subtitle: "Enterprise platforms, government contracts, and AI-powered automation. Built by engineers who\u2019ve operated the systems they\u2019re coding for. Production-grade from day one.",
        buttons: [{ label: "Learn More", href: "/divisions/software-development" }, { label: "Talk to an Engineer", href: "/contact" }],
        objectLabel: "GOOGLE WILLOW PROCESSOR",
      },
      {
        title: ["Intelligent", "Construction"],
        subtitle: "Smart building upgrades, modern fa\u00E7ade systems, and IoT instrumentation. We don\u2019t just build structures \u2014 we make them intelligent, measurable, and efficient.",
        buttons: [{ label: "Learn More", href: "/divisions/intelligent-construction" }, { label: "Talk to an Engineer", href: "/contact" }],
      },
      {
        title: ["Industrial", "Manufacturing"],
        subtitle: "We design and manufacture the vibration equipment, laser alignment systems, and thermography instruments we deploy in the field. Full chain, one company.",
        buttons: [{ label: "Learn More", href: "/divisions/industrial-manufacturing" }, { label: "Talk to an Engineer", href: "/contact" }],
      },
      {
        title: ["AI", "Consulting"],
        subtitle: "From proof-of-concept to production in 90 days. Computer vision, predictive models, NLP, and edge AI \u2014 deployed and monitored by our engineers. Measurable ROI from month one.",
        buttons: [{ label: "Learn More", href: "/divisions/ai-consulting" }, { label: "Talk to an Engineer", href: "/contact" }],
      },
    ],
  },
  narrative: {
    brandHook: {
      title: "Droz",
      subtitle: "Engineering, Software, Construction, Manufacturing & AI \u2014 Five divisions, one company.",
    },
    problem: {
      eyebrow: "Who We Are",
      headline: "Five world-class divisions. Each one stands alone.",
      body: "We diagnose equipment failures with 20 years of field experience. We build enterprise software for governments and Fortune 500s. We make buildings intelligent. We manufacture precision instruments in our own lab. We deploy AI that runs in production, not PowerPoint. Each division operates independently \u2014 and when a project needs more than one, we\u2019re the only company that can deliver the full picture.",
      costNumber: "20+",
      costLabel: "years building across five industries",
    },
    agitation: {
      facts: [
        { number: "50+", text: "enterprise clients across six countries trust us with their most critical operations." },
        { number: "20+", text: "years of hands-on experience \u2014 we started in steel mills, not in an office." },
        { number: "5", text: "specialized divisions, each with deep domain expertise. Work with one or work with all." },
      ],
    },
    guide: {
      headline: "One division or all five. Your call.",
    },
    plan: {
      steps: [
        { title: "Choose", desc: "Tell us what you need. Predictive maintenance for one plant? A custom software platform? An AI pilot? Start with one division." },
        { title: "Deliver", desc: "We deploy senior people, not juniors. The engineer who scopes your project is the one who delivers it." },
        { title: "Expand", desc: "When you\u2019re ready for more, we\u2019re already here. No new vendor onboarding, no procurement cycles, no learning curves." },
      ],
    },
    stakes: {
      number: 50,
      suffix: "+",
      subtitle: "enterprise clients across six countries trust Droz with their most critical operations",
    },
    beforeAfter: {
      beforeTitle: "The Usual Way",
      afterTitle: "The Droz Way",
      beforeItems: [
        "Hire a vendor. Hope they deliver. Start over when they don\u2019t.",
        "Months of procurement before a single engineer shows up",
        "Junior consultants who learn on your dime",
        "Scope creep, change orders, finger-pointing between contractors",
      ],
      afterItems: [
        "Senior engineers on day one. The person who scopes it delivers it.",
        "One company, one relationship. Scale up or down without starting over.",
        "20 years of real-world experience across heavy industry, government, and enterprise",
        "When a project crosses disciplines \u2014 software meets sensors, AI meets equipment \u2014 we handle the handoff internally",
      ],
    },
    testimonial: {
      quote: "We avoided $2.1M in unplanned downtime in our first 90 days. This isn\u2019t a projection \u2014 that\u2019s what we measured.",
      name: "Marcus Webb",
      title: "VP Reliability Engineering",
      company: "Nucor Steel",
      metric: 2100000,
      metricSuffix: "",
      metricLabel: "in avoided downtime losses",
    },
    finalCta: {
      headline: "Start with one division. See where it goes.",
      primary: "Talk to an Engineer",
      secondary: "Start Free Trial",
    },
    onlyWe: "Five divisions. Each one world-class on its own. Predictive maintenance with 20 years of field data. Software trusted by governments. Smart construction that pays for itself. Instruments we manufacture and calibrate ourselves. AI that runs in production from day one. Most clients start with one. Some end up using all five. Either way, you\u2019re working with the same team.",
  },
  stats: [
    { value: "20+", label: "Years on factory floors" },
    { value: "6", label: "Countries. Same standard." },
    { value: "5", label: "Divisions. One company." },
    { value: "50+", label: "Enterprise clients retained" },
  ],
  about: {
    heading: "The Story",
    body: "We didn\u2019t start in a boardroom. We started in a steel mill in Venezuela, aligning rotors by hand. Twenty years, six countries, and five divisions later, we still show up on the factory floor before we open a laptop.",
    mission: "Why We Exist",
    missionBody: "Because your equipment vendor can\u2019t write software. Your software vendor has never calibrated a vibration sensor. And your AI consultant has never been covered in machine oil. We have. That\u2019s why we built a company that does all of it.",
    values: "How We Work",
    valuesBody: "Catholic values, Latino grit, Canadian precision. We don\u2019t sell what we can\u2019t deliver. We don\u2019t promise what we haven\u2019t done. Every engagement starts with integrity and ends with measurable results.",
  },
  divisionsSection: {
    heading: "Five Ways Forward",
    subtitle: "One company. Five capabilities. The only team that connects sensors to software to strategy \u2014 because we built all of it.",
  },
  divisionsGrid: [
    { name: "Predictive Maintenance", desc: "We\u2019ve been diagnosing equipment failures since before \u201Cpredictive maintenance\u201D was a buzzword. 20+ years of vibration analysis, laser alignment, thermography, and rotor balancing \u2014 for Westinghouse, Holcim, PDVSA, Unilever.", icon: "\u2699\uFE0F", painPoint: "Your best maintenance tech retires in 8 months. That knowledge has never been documented.", solution: "We capture it. Digitize it. Make it permanent.", cta: "Predict the Unpredictable", slug: "predictive-maintenance" },
    { name: "Software Development", desc: "Enterprise platforms, government contracts, AI-powered automation. Built by engineers who\u2019ve operated the systems they\u2019re coding for. Not outsourced. Not offshored. Ours.", icon: "\uD83D\uDCBB", painPoint: "Your last software project took 18 months and still doesn\u2019t integrate with your CMMS.", solution: "We build it. We deploy it. We stand behind it.", cta: "Ship Faster", slug: "software-development" },
    { name: "Intelligent Construction", desc: "Smart building upgrades, modern fa\u00E7ade systems, IoT instrumentation. We don\u2019t build buildings. We make buildings intelligent.", icon: "\uD83C\uDFD7\uFE0F", painPoint: "Your building was designed in 2005. Energy costs have tripled.", solution: "We retrofit. We instrument. We optimize.", cta: "Build Smarter", slug: "intelligent-construction" },
    { name: "Industrial Manufacturing", desc: "We manufacture the vibration equipment, laser alignment systems, and thermography instruments we use in the field. End-to-end quality control because we don\u2019t trust anyone else\u2019s tolerances.", icon: "\uD83E\uDD16", painPoint: "Your precision instruments were calibrated by a vendor who\u2019s never used them in the field.", solution: "We build it, calibrate it, and deploy it ourselves.", cta: "Scale Precision", slug: "industrial-manufacturing" },
    { name: "AI Consulting", desc: "From proof-of-concept to production in 90 days. Computer vision, predictive models, NLP, edge AI. Not slides \u2014 running systems monitored by our engineers.", icon: "\uD83E\uDDE0", painPoint: "Your AI pilot has been in \u201Cproof of concept\u201D for two years. Nobody can explain the ROI.", solution: "We deploy to production. We measure the ROI. We show you the dashboard.", cta: "Think Bigger", slug: "ai-consulting" },
  ],
  solutions: {
    heading: "What We Actually Build",
    subtitle: "Not capabilities decks. Running systems. Measured results. Here\u2019s what ships.",
    items: [
      { title: "Predictive Analytics", desc: "Know which bearing fails six weeks out. Not a dashboard \u2014 a system that texts the right technician before the vibration pattern even registers on your existing monitors." },
      { title: "Enterprise Software", desc: "Production platforms that survive audit season, scale to 6 countries, and don\u2019t need a consultant to modify. Government-grade. Battle-tested." },
      { title: "Industrial IoT", desc: "Your existing sensors, connected. Real-time monitoring that your operators actually use \u2014 because we built it alongside them, not in an office 2,000 miles away." },
      { title: "AI Integration", desc: "Computer vision catching defects your QC team misses. NLP processing the maintenance logs nobody reads. In production, not in PowerPoint." },
      { title: "Digital Twins", desc: "A virtual copy of your plant that lets you simulate changes before you spend money. Test a new maintenance schedule on Tuesday, implement on Thursday." },
      { title: "Automation Systems", desc: "PLC programming by engineers who\u2019ve wired the panels themselves. Throughput up 34%. Error rate down to 0.02%. At a plant that was already \u2018optimized.\u2019" },
    ],
  },
  clients: {
    heading: "In Good Company",
    subtitle: "The same engineers who serve these enterprises are the ones who\u2019ll show up at your plant.",
    names: ["Westinghouse", "Holcim", "PDVSA", "Unilever", "Government of Canada", "Siemens Energy", "LafargeHolcim", "Schneider Electric"],
  },
  contact: {
    heading: "Your Move",
    body: "No pitch deck. No sales script. You\u2019ll talk to an engineer who\u2019s been on a factory floor this week. Tell us what\u2019s breaking.",
    cta: "Talk to an Engineer",
    form: { name: "Full Name", email: "Work Email", company: "Company", message: "What\u2019s the problem you\u2019re trying to solve?", send: "Send It" },
  },
  footer: {
    tagline: "The only company that connects sensors to software to strategy. Catholic. Latino-owned. Canadian. Five divisions. One standard.",
    company: "Droz Technologies Inc.",
    location: "Burlington, Ontario, Canada",
    copyright: "\u00A9 2026 Droz Technologies Inc. All rights reserved.",
    divisions: "Divisions",
    quickLinks: "Quick Links",
    links: [
      { label: "About", href: "#about" },
      { label: "Solutions", href: "#solutions" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
};

const fr: SiteText = {
  nav: { about: "Notre histoire", divisions: "Divisions", solutions: "Ce qu\u2019on construit", contact: "\u00C0 vous de jouer", login: "Connexion" },
  hero: {
    scroll: "D\u00E9filer",
    divisions: [
      { title: ["Votre usine", "tourne.", "Point."], subtitle: "On a pass\u00E9 20 ans sur des planchers d\u2019usine avant d\u2019\u00E9crire la moindre ligne de code. On sait \u00E0 quoi ressemble un roulement qui l\u00E2che \u00E0 3h du matin. Et on a bati le syst\u00E8me pour que \u00E7a n\u2019arrive plus.", buttons: [{ label: "Parler \u00E0 un ing\u00E9nieur", href: "/contact" }, { label: "Voir les r\u00E9sultats", href: "#proof" }] },
      { title: ["Du code", "qui tourne.", "Pas des slides."], subtitle: "Votre dernier fournisseur vous a livr\u00E9 une feuille de route. Nous, on livre du code en production. Des plateformes industrielles construites par des ing\u00E9nieurs qui ont op\u00E9r\u00E9 les syst\u00E8mes qu\u2019ils automatisent.", buttons: [{ label: "Parler \u00E0 un ing\u00E9nieur", href: "/contact" }, { label: "Voir la stack", href: "/divisions/software-development" }], objectLabel: "PROCESSEUR GOOGLE WILLOW" },
      { title: ["Des b\u00E2timents", "qui pensent."], subtitle: "Chaque structure qu\u2019on touche est instrument\u00E9e, connect\u00E9e et optimis\u00E9e. Pas un discours sur les b\u00E2timents intelligents. Un b\u00E2timent qui performe \u2014 mesur\u00E9, v\u00E9rifi\u00E9, prouv\u00E9.", buttons: [{ label: "Parler \u00E0 un ing\u00E9nieur", href: "/contact" }, { label: "Voir les projets", href: "/divisions/intelligent-construction" }] },
      { title: ["La pr\u00E9cision", "\u00E0 l\u2019\u00E9chelle."], subtitle: "On fabrique les \u00E9quipements qu\u2019on utilise. On calibre les instruments qu\u2019on vend. Personne d\u2019autre dans cette industrie ne contr\u00F4le la cha\u00EEne compl\u00E8te, de la conception au d\u00E9ploiement.", buttons: [{ label: "Parler \u00E0 un ing\u00E9nieur", href: "/contact" }, { label: "Nos \u00E9quipements", href: "/divisions/industrial-manufacturing" }] },
      { title: ["Une IA qui", "fonctionne", "vraiment."], subtitle: "Pas une d\u00E9mo. Pas un POC qui moisit en comit\u00E9. Des syst\u00E8mes d\u2019IA en production, surveill\u00E9s par nos ing\u00E9nieurs, avec un ROI mesurable d\u00E8s le premier mois.", buttons: [{ label: "Parler \u00E0 un ing\u00E9nieur", href: "/contact" }, { label: "Capacit\u00E9s", href: "/divisions/ai-consulting" }] },
    ],
  },
  narrative: {
    brandHook: {
      title: "Droz",
      subtitle: "Vos \u00E9quipements parlent. \u00CAtes-vous en train d\u2019\u00E9couter\u00A0?",
    },
    problem: {
      eyebrow: "La r\u00E9alit\u00E9",
      headline: "2h du matin. Votre t\u00E9l\u00E9phone vibre. La ligne 3 est tomb\u00E9e. Encore.",
      body: "Votre \u00E9quipe de maintenance est d\u00E9j\u00E0 r\u00E9partie sur deux quarts. Les pi\u00E8ces qu\u2019il vous faut sont \u00E0 six semaines. Et votre VP vient de vous envoyer un courriel pour savoir pourquoi la production du T3 accuse 12\u00A0% de retard. Cet arr\u00EAt non planifi\u00E9 ne vous a pas seulement co\u00FBt\u00E9 180\u00A0000\u00A0$ en production perdue. Il vous a co\u00FBt\u00E9 le contrat que vous pourchassez depuis 18 mois.",
      costNumber: "180\u00A0000\u00A0$",
      costLabel: "co\u00FBt moyen par arr\u00EAt non planifi\u00E9",
    },
    agitation: {
      facts: [
        { number: "40\u00A0%", text: "de d\u00E9penses en plus sur les pi\u00E8ces avec une maintenance calendaire vs pr\u00E9dictive" },
        { number: "3,2\u00D7", text: "plus d\u2019arr\u00EAts impr\u00E9vus dans les usines sans surveillance de l\u2019\u00E9tat des \u00E9quipements" },
        { number: "10\u00A0000", text: "techniciens de maintenance qualifi\u00E9s partent \u00E0 la retraite chaque ann\u00E9e. Leur savoir part avec eux." },
      ],
    },
    guide: {
      headline: "Et si vous saviez quel roulement allait l\u00E2cher \u2014 six semaines avant\u00A0?",
    },
    plan: {
      steps: [
        { title: "Connecter", desc: "On instrumente vos \u00E9quipements existants. Pas de remplacement. Vos capteurs, vos donn\u00E9es, votre r\u00E9seau." },
        { title: "Voir", desc: "Des pr\u00E9dictions d\u00E8s la premi\u00E8re semaine. Pas un tableau de bord que personne ne consulte \u2014 des alertes qui atteignent la bonne personne au bon moment." },
        { title: "Pr\u00E9venir", desc: "La premi\u00E8re panne \u00E9vit\u00E9e paie l\u2019ensemble du syst\u00E8me. La plupart de nos clients voient le ROI en moins de 90 jours." },
      ],
    },
    stakes: {
      number: 1080000,
      suffix: "",
      subtitle: "par an en pannes \u00E9vitables dans une seule usine de taille moyenne",
    },
    beforeAfter: {
      beforeTitle: "Sans Droz",
      afterTitle: "Avec Droz",
      beforeItems: [
        "Maintenance r\u00E9active \u2014 on r\u00E9pare quand \u00E7a casse",
        "Tableurs, post-it, savoir tribal",
        "Trois semaines de panique avant chaque audit de conformit\u00E9",
        "Fournisseurs d\u2019\u00E9quipements, fournisseurs de logiciels, consultants \u2014 aucun ne se parle",
      ],
      afterItems: [
        "Maintenance pr\u00E9dictive \u2014 on r\u00E8gle avant que \u00E7a casse",
        "Une plateforme, tous les actifs, mise \u00E0 jour en temps r\u00E9el",
        "Documentation d\u2019audit g\u00E9n\u00E9r\u00E9e automatiquement",
        "Une seule entreprise. Cinq divisions. Toutes les comp\u00E9tences sous un seul toit.",
      ],
    },
    testimonial: {
      quote: "On a \u00E9vit\u00E9 2,1\u00A0M\u00A0$ d\u2019arr\u00EAts non planifi\u00E9s dans nos 90 premiers jours. C\u2019est pas une projection \u2014 c\u2019est ce qu\u2019on a mesur\u00E9.",
      name: "Marcus Webb",
      title: "VP Ing\u00E9nierie Fiabilit\u00E9",
      company: "Nucor Steel",
      metric: 2100000,
      metricSuffix: "",
      metricLabel: "en arr\u00EAts \u00E9vit\u00E9s",
    },
    finalCta: {
      headline: "Votre usine tourne. On s\u2019en assure.",
      primary: "Parler \u00E0 un ing\u00E9nieur",
      secondary: "Essai gratuit",
    },
    onlyWe: "Aucune autre entreprise au monde ne combine 20 ans d\u2019analyse vibratoire, des logiciels d\u2019entreprise sur mesure, du conseil en IA, de la fabrication et de la construction sous un seul toit. Votre fournisseur d\u2019\u00E9quipements ne peut pas construire votre logiciel. Votre fournisseur de logiciels n\u2019a jamais align\u00E9 un rotor. Nous, on fait les deux. C\u2019est pas un slogan. C\u2019est notre mardi.",
  },
  stats: [
    { value: "20+", label: "Ann\u00E9es sur les planchers d\u2019usine" },
    { value: "6", label: "Pays. Le m\u00EAme standard." },
    { value: "5", label: "Divisions. Une seule entreprise." },
    { value: "50+", label: "Clients grands comptes fid\u00E9lis\u00E9s" },
  ],
  about: {
    heading: "Notre histoire",
    body: "On n\u2019a pas d\u00E9marr\u00E9 dans une salle de conseil. On a d\u00E9marr\u00E9 dans une ac\u00E9rie au Venezuela, \u00E0 aligner des rotors \u00E0 la main. Vingt ans, six pays et cinq divisions plus tard, on pose encore le pied sur le plancher d\u2019usine avant d\u2019ouvrir un laptop.",
    mission: "Pourquoi on existe",
    missionBody: "Parce que votre fournisseur d\u2019\u00E9quipements ne sait pas \u00E9crire du code. Votre fournisseur de logiciels n\u2019a jamais calibr\u00E9 un capteur de vibration. Et votre consultant en IA n\u2019a jamais eu de graisse de machine sur les mains. Nous, oui. C\u2019est pour \u00E7a qu\u2019on a construit une entreprise qui fait tout.",
    values: "Comment on travaille",
    valuesBody: "Valeurs catholiques, rigueur latino, pr\u00E9cision canadienne. On ne vend pas ce qu\u2019on ne peut pas livrer. On ne promet pas ce qu\u2019on n\u2019a pas fait. Chaque mandat commence par l\u2019int\u00E9grit\u00E9 et finit avec des r\u00E9sultats mesurables.",
  },
  divisionsSection: { heading: "Cinq voies vers l\u2019avant", subtitle: "Une seule entreprise. Cinq capacit\u00E9s. La seule \u00E9quipe qui relie les capteurs au logiciel \u00E0 la strat\u00E9gie \u2014 parce qu\u2019on a tout construit." },
  divisionsGrid: [
    { name: "Maintenance pr\u00E9dictive", desc: "Alignement laser, \u00E9quilibrage de rotor, analyse vibratoire, thermographie. Plus de 20 ans au service de Westinghouse, Holcim, PDVSA, Unilever.", icon: "\u2699\uFE0F", painPoint: "Votre meilleur technicien de maintenance prend sa retraite dans 8 mois. Ce savoir n\u2019a jamais \u00E9t\u00E9 document\u00E9.", solution: "On le capture. On le num\u00E9rise. On le p\u00E9rennise.", cta: "Pr\u00E9dire l\u2019impr\u00E9visible", slug: "predictive-maintenance" },
    { name: "D\u00E9veloppement logiciel", desc: "Plateformes d\u2019entreprise, contrats gouvernementaux, automatisation par IA. Construits par des ing\u00E9nieurs qui ont op\u00E9r\u00E9 les syst\u00E8mes qu\u2019ils codent. Pas sous-trait\u00E9s. Pas d\u00E9localis\u00E9s. Les n\u00F4tres.", icon: "\uD83D\uDCBB", painPoint: "Votre dernier projet logiciel a pris 18 mois et ne s\u2019int\u00E8gre toujours pas \u00E0 votre CMMS.", solution: "On le construit. On le d\u00E9ploie. On l\u2019assume.", cta: "Livrer plus vite", slug: "software-development" },
    { name: "Construction intelligente", desc: "Mises \u00E0 niveau de b\u00E2timents intelligents, syst\u00E8mes de fa\u00E7ades modernes, instrumentation IoT. On ne construit pas des b\u00E2timents. On les rend intelligents.", icon: "\uD83C\uDFD7\uFE0F", painPoint: "Votre b\u00E2timent a \u00E9t\u00E9 con\u00E7u en 2005. Les co\u00FBts \u00E9nerg\u00E9tiques ont tripl\u00E9.", solution: "On r\u00E9nove. On instrumente. On optimise.", cta: "Construire plus intelligent", slug: "intelligent-construction" },
    { name: "Fabrication industrielle", desc: "On fabrique les \u00E9quipements de vibration, les syst\u00E8mes d\u2019alignement laser et les instruments thermographiques qu\u2019on utilise sur le terrain. Contr\u00F4le qualit\u00E9 de bout en bout.", icon: "\uD83E\uDD16", painPoint: "Vos instruments de pr\u00E9cision ont \u00E9t\u00E9 calibr\u00E9s par un fournisseur qui ne les a jamais utilis\u00E9s sur le terrain.", solution: "On les fabrique, on les calibre, et on les d\u00E9ploie nous-m\u00EAmes.", cta: "Passer \u00E0 l\u2019\u00E9chelle", slug: "industrial-manufacturing" },
    { name: "Consultation IA", desc: "De la preuve de concept \u00E0 la production en 90 jours. Vision par ordinateur, mod\u00E8les pr\u00E9dictifs, NLP, IA en p\u00E9riph\u00E9rie. Pas des slides \u2014 des syst\u00E8mes qui tournent, surveill\u00E9s par nos ing\u00E9nieurs.", icon: "\uD83E\uDDE0", painPoint: "Votre pilote IA est en \u00AB\u00A0preuve de concept\u00A0\u00BB depuis deux ans. Personne ne peut expliquer le ROI.", solution: "On d\u00E9ploie en production. On mesure le ROI. On vous montre le tableau de bord.", cta: "Voir plus grand", slug: "ai-consulting" },
  ],
  solutions: {
    heading: "Ce qu\u2019on construit vraiment",
    subtitle: "Pas des pr\u00E9sentations de capacit\u00E9s. Des syst\u00E8mes qui tournent. Des r\u00E9sultats mesur\u00E9s. Voil\u00E0 ce qu\u2019on livre.",
    items: [
      { title: "Analytique pr\u00E9dictive", desc: "Savoir quel roulement l\u00E2che six semaines \u00E0 l\u2019avance. Pas un tableau de bord \u2014 un syst\u00E8me qui envoie un SMS au bon technicien avant m\u00EAme que le profil vibratoire apparaisse sur vos monitors existants." },
      { title: "Logiciels d\u2019entreprise", desc: "Plateformes de production qui survivent aux audits, passent \u00E0 l\u2019\u00E9chelle sur 6 pays, et ne n\u00E9cessitent pas un consultant pour \u00EAtre modifi\u00E9es. Niveau gouvernemental. Test\u00E9es au combat." },
      { title: "IoT industriel", desc: "Vos capteurs existants, connect\u00E9s. Une surveillance en temps r\u00E9el que vos op\u00E9rateurs utilisent vraiment \u2014 parce qu\u2019on l\u2019a construite avec eux, pas dans un bureau \u00E0 3 000 km." },
      { title: "Int\u00E9gration IA", desc: "La vision par ordinateur qui d\u00E9tecte les d\u00E9fauts que votre \u00E9quipe CQ rate. Le NLP qui traite les logs de maintenance que personne ne lit. En production, pas dans PowerPoint." },
      { title: "Jumeaux num\u00E9riques", desc: "Une copie virtuelle de votre usine pour simuler des changements avant de d\u00E9penser. Testez un nouveau calendrier de maintenance le mardi, mettez en oeuvre le jeudi." },
      { title: "Syst\u00E8mes d\u2019automatisation", desc: "Programmation PLC par des ing\u00E9nieurs qui ont c\u00E2bl\u00E9 les panneaux eux-m\u00EAmes. D\u00E9bit en hausse de 34\u00A0%. Taux d\u2019erreur \u00E0 0,02\u00A0%. Dans une usine qui \u00E9tait d\u00E9j\u00E0 \u00AB\u00A0optimis\u00E9e\u00A0\u00BB." },
    ],
  },
  clients: {
    heading: "En bonne compagnie",
    subtitle: "Les m\u00EAmes ing\u00E9nieurs qui servent ces entreprises sont ceux qui se pr\u00E9senteront dans votre usine.",
    names: ["Westinghouse", "Holcim", "PDVSA", "Unilever", "Gouvernement du Canada", "Siemens Energy", "LafargeHolcim", "Schneider Electric"],
  },
  contact: {
    heading: "\u00C0 vous de jouer",
    body: "Pas de deck. Pas de script de vente. Vous parlerez \u00E0 un ing\u00E9nieur qui \u00E9tait sur un plancher d\u2019usine cette semaine. Dites-nous ce qui l\u00E2che.",
    cta: "Parler \u00E0 un ing\u00E9nieur",
    form: { name: "Nom complet", email: "Courriel professionnel", company: "Entreprise", message: "Quel est le probl\u00E8me \u00E0 r\u00E9soudre\u00A0?", send: "Envoyer" },
  },
  footer: {
    tagline: "La seule entreprise qui relie les capteurs au logiciel \u00E0 la strat\u00E9gie. Catholique. Latino. Canadienne. Cinq divisions. Un seul standard.",
    company: "Droz Technologies Inc.",
    location: "Burlington, Ontario, Canada",
    copyright: "\u00A9 2026 Droz Technologies Inc. Tous droits r\u00E9serv\u00E9s.",
    divisions: "Divisions",
    quickLinks: "Liens rapides",
    links: [{ label: "Notre histoire", href: "#about" }, { label: "Ce qu\u2019on construit", href: "#solutions" }, { label: "Contact", href: "#contact" }, { label: "Politique de confidentialit\u00E9", href: "#" }],
  },
};

const es: SiteText = {
  nav: { about: "La historia", divisions: "Divisiones", solutions: "Lo que construimos", contact: "Tu turno", login: "Iniciar sesi\u00F3n" },
  hero: {
    scroll: "Desplazar",
    divisions: [
      { title: ["Tu planta", "funciona.", "Punto."], subtitle: "Pasamos 20 a\u00F1os en pisos de f\u00E1brica antes de escribir una sola l\u00EDnea de c\u00F3digo. Sabemos c\u00F3mo suena un rodamiento que falla a las 3 de la ma\u00F1ana. Y construimos el sistema para que nunca m\u00E1s lo escuches.", buttons: [{ label: "Hablar con un ingeniero", href: "/contact" }, { label: "Ver resultados", href: "#proof" }] },
      { title: ["C\u00F3digo que", "corre.", "No slides."], subtitle: "Tu \u00FAltimo proveedor te dio una hoja de ruta. Nosotros entregamos c\u00F3digo en producci\u00F3n. Plataformas industriales construidas por ingenieros que han operado los sistemas que automatizan.", buttons: [{ label: "Hablar con un ingeniero", href: "/contact" }, { label: "Ver el stack", href: "/divisions/software-development" }], objectLabel: "PROCESADOR GOOGLE WILLOW" },
      { title: ["Edificios", "que piensan."], subtitle: "Cada estructura que tocamos se instrumenta, conecta y optimiza. No es un discurso sobre edificios inteligentes. Es un edificio que rinde \u2014 medido, verificado, probado.", buttons: [{ label: "Hablar con un ingeniero", href: "/contact" }, { label: "Ver proyectos", href: "/divisions/intelligent-construction" }] },
      { title: ["Precisi\u00F3n", "a escala."], subtitle: "Fabricamos el equipo que usamos. Calibramos los instrumentos que vendemos. Nadie m\u00E1s en esta industria controla la cadena completa, desde el dise\u00F1o hasta el despliegue.", buttons: [{ label: "Hablar con un ingeniero", href: "/contact" }, { label: "Nuestros equipos", href: "/divisions/industrial-manufacturing" }] },
      { title: ["IA que", "realmente", "funciona."], subtitle: "No una demo. No un POC que muere en comit\u00E9. Sistemas de IA en producci\u00F3n, monitoreados por nuestros ingenieros, con ROI medible desde el primer mes.", buttons: [{ label: "Hablar con un ingeniero", href: "/contact" }, { label: "Capacidades", href: "/divisions/ai-consulting" }] },
    ],
  },
  narrative: {
    brandHook: {
      title: "Droz",
      subtitle: "Tus equipos est\u00E1n hablando. \u00BFLes est\u00E1s escuchando?",
    },
    problem: {
      eyebrow: "La realidad",
      headline: "Son las 2 de la ma\u00F1ana. Tu tel\u00E9fono vibra. La l\u00EDnea 3 est\u00E1 ca\u00EDda. Otra vez.",
      body: "Tu equipo de mantenimiento ya est\u00E1 repartido en dos turnos. Las piezas que necesitas tienen seis semanas de espera. Y tu VP acaba de enviarte un correo preguntando por qu\u00E9 la producci\u00F3n del T3 va un 12\u00A0% por debajo del pron\u00F3stico. Esa parada no planificada no solo te cost\u00F3 $180K en producci\u00F3n perdida. Te cost\u00F3 el contrato que llevas 18 meses persiguiendo.",
      costNumber: "$180K",
      costLabel: "costo promedio por parada no planificada",
    },
    agitation: {
      facts: [
        { number: "40\u00A0%", text: "m\u00E1s gasto en piezas con mantenimiento por calendario vs predictivo" },
        { number: "3,2\u00D7", text: "m\u00E1s paradas imprevistas en plantas sin monitoreo de condici\u00F3n" },
        { number: "10.000", text: "t\u00E9cnicos de mantenimiento calificados se jubilan cada a\u00F1o. Su conocimiento se va con ellos." },
      ],
    },
    guide: {
      headline: "\u00BFY si supieras qu\u00E9 rodamiento va a fallar \u2014 seis semanas antes?",
    },
    plan: {
      steps: [
        { title: "Conectar", desc: "Instrumentamos tus equipos existentes. Sin reemplazos. Tus sensores, tus datos, tu red." },
        { title: "Ver", desc: "Predicciones desde la primera semana. No un dashboard que nadie consulta \u2014 alertas que llegan a la persona correcta en el momento correcto." },
        { title: "Prevenir", desc: "La primera falla evitada paga todo el sistema. La mayor\u00EDa de nuestros clientes ven ROI en menos de 90 d\u00EDas." },
      ],
    },
    stakes: {
      number: 1080000,
      suffix: "",
      subtitle: "al a\u00F1o en fallas prevenibles en una sola planta mediana",
    },
    beforeAfter: {
      beforeTitle: "Sin Droz",
      afterTitle: "Con Droz",
      beforeItems: [
        "Mantenimiento reactivo \u2014 se repara cuando se rompe",
        "Planillas, post-its, conocimiento tribal",
        "Tres semanas de caos antes de cada auditor\u00EDa de cumplimiento",
        "Proveedores de equipos, proveedores de software, consultores \u2014 ninguno habla con los dem\u00E1s",
      ],
      afterItems: [
        "Mantenimiento predictivo \u2014 se repara antes de que se rompa",
        "Una plataforma, todos los activos, actualizada en vivo",
        "Documentaci\u00F3n de auditor\u00EDa generada autom\u00E1ticamente",
        "Una sola empresa. Cinco divisiones. Todas las capacidades bajo un mismo techo.",
      ],
    },
    testimonial: {
      quote: "Evitamos $2,1M en tiempos de inactividad no planificados en nuestros primeros 90 d\u00EDas. No es una proyecci\u00F3n \u2014 es lo que medimos.",
      name: "Marcus Webb",
      title: "VP Ingenier\u00EDa de Confiabilidad",
      company: "Nucor Steel",
      metric: 2100000,
      metricSuffix: "",
      metricLabel: "en p\u00E9rdidas de paradas evitadas",
    },
    finalCta: {
      headline: "Tu planta funciona. Nosotros nos aseguramos de ello.",
      primary: "Hablar con un ingeniero",
      secondary: "Prueba gratuita",
    },
    onlyWe: "Ninguna otra empresa en el mundo combina 20 a\u00F1os de an\u00E1lisis de vibraciones, software empresarial a medida, consultor\u00EDa en IA, manufactura y construcci\u00F3n bajo un mismo techo. Tu proveedor de equipos no puede construir tu software. Tu proveedor de software nunca ha alineado un rotor. Nosotros hacemos las dos cosas. Eso no es un eslogan. Es nuestro martes.",
  },
  stats: [
    { value: "20+", label: "A\u00F1os en pisos de f\u00E1brica" },
    { value: "6", label: "Pa\u00EDses. El mismo est\u00E1ndar." },
    { value: "5", label: "Divisiones. Una sola empresa." },
    { value: "50+", label: "Clientes enterprise retenidos" },
  ],
  about: {
    heading: "La historia",
    body: "No empezamos en una sala de juntas. Empezamos en una acerer\u00EDa en Venezuela, alineando rotores a mano. Veinte a\u00F1os, seis pa\u00EDses y cinco divisiones despu\u00E9s, todav\u00EDa pisamos el piso de f\u00E1brica antes de abrir un laptop.",
    mission: "Por qu\u00E9 existimos",
    missionBody: "Porque tu proveedor de equipos no sabe escribir c\u00F3digo. Tu proveedor de software nunca ha calibrado un sensor de vibraciones. Y tu consultor de IA nunca ha tenido aceite de m\u00E1quina en las manos. Nosotros s\u00ED. Por eso construimos una empresa que hace todo.",
    values: "C\u00F3mo trabajamos",
    valuesBody: "Valores cat\u00F3licos, garra latina, precisi\u00F3n canadiense. No vendemos lo que no podemos entregar. No prometemos lo que no hemos hecho. Cada compromiso empieza con integridad y termina con resultados medibles.",
  },
  divisionsSection: { heading: "Cinco caminos al frente", subtitle: "Una sola empresa. Cinco capacidades. El \u00FAnico equipo que conecta sensores con software con estrategia \u2014 porque construimos todo eso." },
  divisionsGrid: [
    { name: "Mantenimiento predictivo", desc: "Alineaci\u00F3n l\u00E1ser, balanceo de rotores, an\u00E1lisis de vibraciones, termograf\u00EDa. M\u00E1s de 20 a\u00F1os al servicio de Westinghouse, Holcim, PDVSA, Unilever.", icon: "\u2699\uFE0F", painPoint: "Tu mejor t\u00E9cnico de mantenimiento se jubila en 8 meses. Ese conocimiento nunca se ha documentado.", solution: "Lo capturamos. Lo digitalizamos. Lo hacemos permanente.", cta: "Predecir lo impredecible", slug: "predictive-maintenance" },
    { name: "Desarrollo de software", desc: "Plataformas enterprise, contratos gubernamentales, automatizaci\u00F3n con IA. Construidos por ingenieros que han operado los sistemas que codifican. Sin outsourcing. Sin offshore. Nuestros.", icon: "\uD83D\uDCBB", painPoint: "Tu \u00FAltimo proyecto de software tom\u00F3 18 meses y todav\u00EDa no se integra con tu CMMS.", solution: "Lo construimos. Lo desplegamos. Lo respaldamos.", cta: "Entregar m\u00E1s r\u00E1pido", slug: "software-development" },
    { name: "Construcci\u00F3n inteligente", desc: "Mejoras de edificios inteligentes, sistemas de fachadas modernas, instrumentaci\u00F3n IoT. No construimos edificios. Los hacemos inteligentes.", icon: "\uD83C\uDFD7\uFE0F", painPoint: "Tu edificio fue dise\u00F1ado en 2005. Los costos energ\u00E9ticos se han triplicado.", solution: "Remodelamos. Instrumentamos. Optimizamos.", cta: "Construir m\u00E1s inteligente", slug: "intelligent-construction" },
    { name: "Manufactura industrial", desc: "Fabricamos los equipos de vibraci\u00F3n, sistemas de alineaci\u00F3n l\u00E1ser e instrumentos termogr\u00E1ficos que usamos en campo. Control de calidad de principio a fin.", icon: "\uD83E\uDD16", painPoint: "Tus instrumentos de precisi\u00F3n fueron calibrados por un proveedor que nunca los ha usado en campo.", solution: "Los fabricamos, los calibramos y los desplegamos nosotros mismos.", cta: "Escalar la precisi\u00F3n", slug: "industrial-manufacturing" },
    { name: "Consultor\u00EDa de IA", desc: "De prueba de concepto a producci\u00F3n en 90 d\u00EDas. Visi\u00F3n artificial, modelos predictivos, NLP, IA en el borde. No slides \u2014 sistemas corriendo, monitoreados por nuestros ingenieros.", icon: "\uD83E\uDDE0", painPoint: "Tu piloto de IA lleva dos a\u00F1os en \u2018prueba de concepto\u2019. Nadie puede explicar el ROI.", solution: "Desplegamos en producci\u00F3n. Medimos el ROI. Te mostramos el dashboard.", cta: "Pensar en grande", slug: "ai-consulting" },
  ],
  solutions: {
    heading: "Lo que realmente construimos",
    subtitle: "No presentaciones de capacidades. Sistemas corriendo. Resultados medidos. Esto es lo que entregamos.",
    items: [
      { title: "Anal\u00EDtica predictiva", desc: "Saber qu\u00E9 rodamiento falla seis semanas antes. No un dashboard \u2014 un sistema que le manda un SMS al t\u00E9cnico correcto antes de que el patr\u00F3n vibratorio siquiera aparezca en tus monitores actuales." },
      { title: "Software empresarial", desc: "Plataformas de producci\u00F3n que sobreviven la temporada de auditor\u00EDas, escalan a 6 pa\u00EDses y no necesitan un consultor para modificarse. Nivel gobierno. Probadas en batalla." },
      { title: "IoT industrial", desc: "Tus sensores existentes, conectados. Monitoreo en tiempo real que tus operadores realmente usan \u2014 porque lo construimos junto a ellos, no en una oficina a 3.000 kil\u00F3metros." },
      { title: "Integraci\u00F3n de IA", desc: "Visi\u00F3n artificial detectando defectos que tu equipo de QC no ve. NLP procesando los registros de mantenimiento que nadie lee. En producci\u00F3n, no en PowerPoint." },
      { title: "Gemelos digitales", desc: "Una copia virtual de tu planta para simular cambios antes de gastar dinero. Prueba un nuevo calendario de mantenimiento el martes, impleméntalo el jueves." },
      { title: "Sistemas de automatizaci\u00F3n", desc: "Programaci\u00F3n PLC por ingenieros que han cableado los tableros ellos mismos. Throughput arriba un 34\u00A0%. Tasa de error en 0,02\u00A0%. En una planta que ya estaba \u2018optimizada\u2019." },
    ],
  },
  clients: {
    heading: "En buena compa\u00F1\u00EDa",
    subtitle: "Los mismos ingenieros que sirven a estas empresas son los que se presentar\u00E1n en tu planta.",
    names: ["Westinghouse", "Holcim", "PDVSA", "Unilever", "Gobierno de Canad\u00E1", "Siemens Energy", "LafargeHolcim", "Schneider Electric"],
  },
  contact: {
    heading: "Tu turno",
    body: "Sin deck. Sin script de ventas. Hablar\u00E1s con un ingeniero que estuvo en un piso de f\u00E1brica esta semana. D\u00EDnos qu\u00E9 est\u00E1 fallando.",
    cta: "Hablar con un ingeniero",
    form: { name: "Nombre completo", email: "Correo corporativo", company: "Empresa", message: "\u00BFCu\u00E1l es el problema que est\u00E1s tratando de resolver?", send: "Enviar" },
  },
  footer: {
    tagline: "La \u00FAnica empresa que conecta sensores con software con estrategia. Cat\u00F3lica. Latino-fundada. Canadiense. Cinco divisiones. Un solo est\u00E1ndar.",
    company: "Droz Technologies Inc.",
    location: "Burlington, Ontario, Canad\u00E1",
    copyright: "\u00A9 2026 Droz Technologies Inc. Todos los derechos reservados.",
    divisions: "Divisiones",
    quickLinks: "Enlaces r\u00E1pidos",
    links: [{ label: "La historia", href: "#about" }, { label: "Lo que construimos", href: "#solutions" }, { label: "Contacto", href: "#contact" }, { label: "Pol\u00EDtica de privacidad", href: "#" }],
  },
};

const translations: Record<Locale, SiteText> = { en, fr, es };

export function getTexts(locale: Locale): SiteText {
  return translations[locale];
}
