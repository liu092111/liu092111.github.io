/* ---------------------------------------------------------------
   Single source of truth for site copy and structured facts.
   Edit here rather than in the page templates.
   --------------------------------------------------------------- */

/* Organisation logos, shown beside each entry on About the way a LinkedIn
   profile shows them: a recruiter scans logos before reading titles.
   Taken from each organisation's LinkedIn page at 100×100. */
import logoAmazon from '../assets/logos/amazon.jpg';
import logoDelta from '../assets/logos/delta.jpg';
import logoSgs from '../assets/logos/sgs.jpg';
import logoNtu from '../assets/logos/ntu.jpg';
import logoNcku from '../assets/logos/ncku.jpg';
import logoAws from '../assets/logos/aws.jpg';
import logoOracle from '../assets/logos/oracle.jpg';
import logoGoogleEdu from '../assets/logos/google-edu.jpg';
import type { ImageMetadata } from 'astro';
// Graded copy (exposure, highlights/shadows, a slightly cooler balance);
// the untouched original is kept alongside it.
import techieTalkGroup from '../assets/techie-talk-community-graded.jpg';
import spieTalk from '../assets/spie-2026-talk.jpg';

export const SITE = {
  name: 'Flora Liu',
  role: 'Hardware Engineer',
  email: 'hua.flora.liu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/flora-liu-b8a905236/',
  github: 'https://github.com/liu092111',
  /* One-page résumé in public/. Replace the file to update it; keep the
     name, since the link may already be saved in bookmarks and emails.
     Strip phone and home address before publishing a new version. */
  resume: '/Hua-Flora-Liu-Resume.pdf',
  location: 'Taiwan',
};

/* Numbering scheme — one meaning per number, site-wide:
     00  Home (the cover)   sections 0.1–0.4
     01  Designed           sections 1.x
     02  Confidence         sections 2.x
     03  Value              sections 3.x
     04  Speaking           sections 4.x
     05  About              sections 5.x
     06  Writing            tracks 6.1, 6.2
   A page's number is its `docNo`; a section inside it is `<page>.<n>`.
   Two-digit numbers are only ever pages, dotted numbers only ever sections,
   so "01" always means the first essay wherever it appears. */

/* Nav order follows what a visitor wants to know, in order: who she is
   (About), how she thinks (Perspectives), then what to invite her for
   (Speaking), which sits last so it leads straight into Contact.
   The three essays share one dropdown, "Perspectives": each is a point of
   view on a product question, not an essay in the school sense, and one
   entry keeps the bar short. Inside the menu every item shows its full
   question, so the one-word labels never have to stand alone.
   `afterWritingLaunch` hides an entry until the writing section has enough
   published posts; the threshold lives in src/lib/writing.ts. */
export const PERSPECTIVES_LABEL = 'Perspectives';

interface NavItem {
  href: string;
  label: string;
  hint: string;
  no?: string;
  /** Part of the Perspectives dropdown. */
  essay?: boolean;
  afterWritingLaunch?: boolean;
}

export const NAV: NavItem[] = [
  { href: '/about', label: 'About', hint: 'Experience, education, skills and selected work' },
  { href: '/designed', label: 'Design', no: '01', essay: true, hint: 'How a product gets designed' },
  { href: '/confidence', label: 'Confidence', no: '02', essay: true, hint: 'How a product earns confidence' },
  { href: '/value', label: 'Value', no: '03', essay: true, hint: 'How a product creates value' },
  { href: '/speaking', label: 'Speaking', hint: 'Talks, topics and invitations' },
  { href: '/writing', label: 'Writing', hint: 'Notes and career posts', afterWritingLaunch: true },
];

/* The three evergreen pillars. These are the site's argument; the
   portfolio is the evidence behind them. */
export const PILLARS = [
  {
    no: '01',
    href: '/designed',
    title: 'How a product gets designed',
    promise:
      'A design is a set of decisions. Every feature should be able to answer why.',
    question: 'How should it be designed, and why that way?',
  },
  {
    no: '02',
    href: '/confidence',
    title: 'How a product earns confidence',
    promise:
      'A pass is a data point. Confidence needs enough samples.',
    question: 'How much evidence is enough?',
  },
  {
    no: '03',
    href: '/value',
    title: 'How a product creates value',
    promise:
      'The ship date is set early. What ships with it is not.',
    question: 'If the ship date is fixed, what does engineering still decide?',
  },
];

/* The constraint, stated as a position rather than hidden as a gap. */
export const NDA = {
  kicker: 'Working under confidentiality',
  headline: 'The product can be confidential. The thinking does not have to be.',
  body: [
    'I cannot publish the devices, datasets or conclusions I work with. For a while that seemed like a reason to write nothing. Then I realised the reasoning was the part worth sharing anyway.',
    'What transfers is the reasoning: how to frame uncertainty, how to design evidence worth trusting, how to recognise a failure mode that is hiding, and how to turn technical context into a recommendation somebody can act on. None of that belongs to any one employer.',
  ],
  closing: 'This site argues about method. The programmes stay out of it.',
};

/* Newest first, the order a résumé reads in; the home heading above the
   row (Decided / Built / Tested) follows the same order. */
export const VANTAGE = [
  {
    no: '01',
    org: 'Amazon',
    logo: logoAmazon,
    kind: 'Engineer · Global consumer brand',
    verb: 'Build the case for readiness',
    period: '2025–present',
    learned:
      'Across EVT, DVT, PVT, HVT and mass production, the question stops being "did it pass" and becomes "do we ship". Evidence, statistics and business context arrive at the same table. My job is to make the evidence strong enough to answer that question.',
  },
  {
    no: '02',
    org: 'Delta Electronics',
    logo: logoDelta,
    kind: 'Intern · System company',
    verb: 'Model the design',
    period: '2024',
    learned:
      'Simulation and automation showed me how early design choices set the cost of every later iteration. Much of engineering is removing friction between tools.',
  },
  {
    no: '03',
    org: 'SGS',
    logo: logoSgs,
    kind: 'Intern · Third-party laboratory',
    verb: 'Test to failure',
    period: '2023–2024',
    learned:
      'Evidence is only as good as the setup that produced it. I learned where a fixture can lie to you, and what a defensible conclusion requires.',
  },
];

/* The readout under the home hero: a spec-sheet row of checkable facts.
   Every entry must be verifiable from elsewhere on the site (About,
   Speaking) — no rounded-up reach numbers, no unattributed praise. A
   metric earns a place here only with a source a visitor could follow. */
/* LinkedIn reach, copied by hand from LinkedIn → Analytics → Content,
   range "past 365 days". It cannot be fetched live: creator analytics are
   visible only to the signed-in account, and LinkedIn's post-analytics API
   is not open to individual developers. Update these numbers and `asOf`
   together; the readout prints `asOf` so a stale figure is never passed
   off as current. */
export const LINKEDIN_STATS = {
  impressions: 51114,
  membersReached: 18813,
  /** Year-over-year change in impressions, as LinkedIn reports it. */
  growthPct: 45,
  /** LinkedIn's window is always the trailing 365 days; name it exactly. */
  period: 'Oct 2025–Oct 2026',
};

/* GoatCounter site code (https://<code>.goatcounter.com). Counting only
   happens on the deployed site; localhost is ignored by GoatCounter. The
   public total needs "Allow using the visitor counter" switched on in
   GoatCounter → Settings, or the footer count simply stays hidden. */
export const GOATCOUNTER = 'liu09211';

interface Proof {
  /** A number to animate up to when the readout scrolls into view. */
  count: number;
  label: string;
  /** Plain context under the label. */
  detail?: string;
  /** Sources a visitor can follow, shown after the detail. */
  links?: { text: string; href: string }[];
}

const fmt = (n: number) => n.toLocaleString('en-US');

/* Two cells, on purpose. Each one has to be strong enough to stand next to
   the other; a third added only to fill the row would dilute both and force
   the text into awkward wraps. Add a cell only when it clears that bar. */
export const PROOF: Proof[] = [
  {
    /* Cumulative: add a link and bump the count after every talk. */
    count: 2,
    label: 'Talks given',
    links: [
      {
        text: 'SPIE Smart Structures (Oral)',
        href: 'https://doi.org/10.1117/12.3090434',
      },
      {
        text: 'Techie Talk (Invited)',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7499979345533452288/',
      },
    ],
  },
  {
    count: LINKEDIN_STATS.impressions,
    label: 'LinkedIn impressions',
    detail: `${LINKEDIN_STATS.period} · ${fmt(LINKEDIN_STATS.membersReached)} members reached · +${LINKEDIN_STATS.growthPct}% year over year`,
    links: [{ text: 'LinkedIn profile', href: SITE.linkedin }],
  },
];

export const EXPERIENCE = [
  {
    org: 'Amazon',
    logo: logoAmazon,
    title: 'Hardware Engineer · Product Integrity',
    period: 'Mar 2025–present',
    note: 'Joined as Hardware Development Engineer Intern; engineer since Mar 2026.',
    points: [
      'Hardware qualification across the full NPI lifecycle: EVT, DVT, PVT, HVT through mass production.',
      'Automated the coordination layer of NPI (issue tracking, status queries, reporting) so engineering time goes to judgement, not status chasing.',
      'Built a test-data platform (MySQL + dashboards) so test evidence could be queried instead of reassembled by hand.',
      'Statistical analysis for risk-based ship decisions: lifetime modelling, distribution fitting, and uncertainty quantification rather than point estimates.',
      'Applied data and AI-assisted workflows to failure-analysis problems.',
    ],
  },
  {
    org: 'Delta Electronics',
    logo: logoDelta,
    title: 'R&D Engineer Intern · Lab for Digital Twin-Based Optimization',
    period: 'Jul–Aug 2024',
    points: [
      'Built modular Python tooling to automate parametric modelling and FEA execution, shortening the design-to-analysis loop.',
      'Wrapped it in an interface non-programmers could use, then iterated with the engineers who actually ran it.',
    ],
  },
  {
    org: 'SGS Taiwan',
    logo: logoSgs,
    title: 'Reliability Intern · Reliability Laboratory',
    period: 'Sep 2023–Apr 2024',
    points: [
      'Ran vibration, shock, thermal, ingress and HALT testing; instrumented rigs with LabVIEW and DAQ.',
      'Cross-checked physical measurements against FEA to test whether the two stories agreed, and reported honestly when they did not.',
      'Introduced an FEA-supported workflow so clients received engineering insight, not just a pass/fail certificate.',
    ],
  },
];

export const EDUCATION = [
  {
    school: 'National Taiwan University',
    logo: logoNtu,
    degree: 'M.S., Engineering Science and Ocean Engineering (Electrical & Electronic)',
    period: 'Sep 2024–Jul 2026',
    detail:
      'First-author paper, presented orally at SPIE Smart Structures + NDE 2026, Vancouver: load-carrying and stability improvement of a miniature ultrasonic piezoelectric plate motor.',
    paper: { label: 'Proc. SPIE 13949 · doi:10.1117/12.3090434', href: 'https://doi.org/10.1117/12.3090434' },
  },
  {
    school: 'National Cheng Kung University',
    logo: logoNcku,
    degree: 'B.S., Mechanical Engineering',
    period: 'Sep 2020–Jun 2024',
    detail: 'Research: sliding-mode control system for vibration control.',
  },
];

/* One readable table rather than a wall of chips plus a collapsed methods
   list. A recruiter scans the left column for the area, then reads one line
   to confirm a keyword; methods and tools for the same area sit on the same
   row, so "does she know LabVIEW" and "can she do HALT" are one glance.
   Ordered design → test → software → statistics, so the table reads as
   hardware breadth first rather than as a reliability specialist's. */
export const SKILLS = [
  {
    area: 'Simulation & CAD',
    items: [
      'Ansys and COMSOL FEA, scripted',
      'Simulation-to-test correlation',
      'SolidWorks, AutoCAD',
    ],
  },
  {
    area: 'Test & instrumentation',
    items: [
      'Vibration, shock, thermal, ingress and HALT testing',
      'LabVIEW and NI DAQ',
      'SCPI instrument control',
      'Camera-based motion measurement',
      'Simulink, LTspice, Keil',
    ],
  },
  {
    area: 'Data & software',
    items: ['Python (pandas, NumPy, PyTorch)', 'MATLAB', 'C++', 'SQL and MySQL', 'Docker', 'Git'],
  },
  {
    area: 'AI workflow',
    items: ['LLM agents', 'MCP', 'LangChain, LangGraph', 'AWS'],
  },
  {
    area: 'Reliability & statistics',
    items: [
      'Weibull and lognormal life fitting',
      'B10 life, MTTF',
      'Bootstrap and Monte Carlo uncertainty bounds',
      'KS goodness-of-fit',
      'Accelerated ageing',
      'Annual return rate (ARR)',
    ],
  },
  {
    area: 'Languages',
    items: ['Mandarin (native)', 'English (professional working proficiency)'],
  },
];

/* This list is evidence for the essays, not a portfolio. A repository earns a
   place here only by backing a claim one of the three pages makes; breadth is
   not the point and a weak entry drags the strong ones down.

   Deliberately excluded:
   - `Amazon` and `Acoustic-Analysis`: employer-confidential material, never
     linked from here regardless of their visibility setting.
   - `Keysight-33600A-SCPI-programming`: learning notes rather than a finished
     tool, so it cannot carry an argument.
   - `AD9106_SRAM-function`: real work, but not yet mapped to a claim. Add it
     here the moment an essay needs it.
   - `film-tracking`, `IMU-control`: private; superseded by
     `piezo-motor-visual-servo`. (`weathering-report` was merged into
     `outdoor-weathering-monitor`.) */
export const PROJECTS = [
  {
    title: 'Closed-loop control of a miniature physical system',
    featured: true,
    kind: 'Research instrumentation',
    repo: 'https://github.com/liu092111/piezo-motor-visual-servo',
    summary:
      'A measurement and control rig built end to end for my thesis work: multithreaded camera tracking at 120 fps, synchronised multi-channel waveform excitation over SCPI, and closed-loop attitude correction.',
    detail: [
      'Separate acquisition, processing and display threads behind a lock-protected shared state',
      'Kalman and exponential-moving-average filtering; thin-plate-spline lens distortion correction',
      'PID attitude correction with differential-voltage steering across two channels',
      'Automatic scale calibration, CSV export, and generated trajectory/velocity figures',
    ],
  },
  {
    title: 'Test-to-failure analysis toolkit',
    featured: true,
    kind: 'Reliability statistics',
    repo: 'https://github.com/liu092111/Test2Fail-Toolkit',
    summary:
      'Fits life distributions to test-to-failure data and generates a report: survival-function comparison, cumulative failure curves, and distribution contribution. Ships with synthetic sample data only.',
  },
  {
    title: 'Neural-network surrogates for flow regression',
    kind: 'Machine learning',
    repo: 'https://github.com/liu092111/deep-learning-coursework',
    summary:
      'Regression of Couette and Hagen–Poiseuille flow fields, with a deliberate architecture ablation (baseline against deeper, wider and different-activation variants) to see what mattered.',
  },
  {
    title: 'Instrument data pipeline',
    kind: 'Data engineering',
    repo: 'https://github.com/liu092111/outdoor-weathering-monitor',
    summary:
      'Automated ingest of logger spreadsheets into MySQL with hash-based duplicate protection, scheduled backup and cleanup, rolling statistics and alerting: the unglamorous layer that makes measurement data usable.',
  },
  {
    title: 'Undergraduate portfolio',
    kind: 'Archive',
    repo: 'https://github.com/liu092111/College_Portfolio',
    summary:
      'Mechanical engineering coursework and projects from NCKU: kinematics, mechanism design, mechanical drawing, numerical analysis, robot design, instrumentation and reliability.',
  },
];

export const SPEAKING_TOPICS = [
  {
    title: 'What a hardware engineer actually does inside a global brand',
    blurb:
      'How a product moves from design to mass production, where NPI decisions get difficult, and who ends up carrying the risk.',
  },
  {
    title: 'Reading test data like an engineer, not a spreadsheet',
    blurb:
      'Why the average lifetime is a dangerous number, what small samples can and cannot tell you, and how uncertainty gets made visible.',
  },
  {
    title: 'Using AI without outsourcing your judgement',
    blurb:
      'Where agents genuinely remove friction in hardware development, where they must not be trusted, and how to keep an engineer accountable for the call.',
  },
  {
    title: 'From mechanical engineering to hardware at a consumer brand',
    blurb:
      'A career path told honestly: the interviews, the coffee chats, the parts nobody puts on a résumé.',
  },
];

interface Talk {
  event: string;
  organiser: string;
  year: string;
  role: string;
  audience?: string;
  summary: string;
  /** Primary source for the talk: the event page or the published record. */
  eventUrl?: string;
  eventUrlLabel?: string;
  /** Her own write-up, usually a LinkedIn post. */
  link?: string;
  photo?: { src: ImageMetadata; alt: string; caption: string };
}

/* Newest first. Every talk here is counted by the "Talks given" figure on
   the home page, so add the talk here and bump that count together. */
export const TALKS: Talk[] = [
  {
    event: 'Techie Talk',
    organiser: 'Tech Network',
    /* Tech Network's own post describing the event series. */
    eventUrl: 'https://www.instagram.com/p/DbBP7hwj9rq/',
    eventUrlLabel: 'About the event',
    audience: 'A meetup for tech-industry interns across SWE, HWE, PM and sales.',
    year: '2026',
    role: 'Invited speaker',
    summary:
      'Shared what hardware engineering looks like inside a global consumer brand: from design to mass production, the decisions that get hard, and how AI can support the workflow without replacing the engineer.',
    /* Her own write-up of the event; LinkedIn counted 5,000+ impressions. */
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7499979345533452288/',
    photo: {
      src: techieTalkGroup,
      alt: 'Attendees and speakers gathered at the Techie Talk 2026 community event.',
      caption:
        'Techie Talk 2026: a room of mixed backgrounds, the best kind to explain to.',
    },
  },
  {
    event: 'SPIE Smart Structures + NDE 2026',
    organiser: 'SPIE · Vancouver, Canada',
    /* The DOI is the permanent address of the published paper. */
    eventUrl: 'https://doi.org/10.1117/12.3090434',
    eventUrlLabel: 'Paper in Proc. SPIE 13949',
    audience: 'An international conference on smart structures, materials and non-destructive evaluation.',
    year: '2026',
    role: 'Oral presentation',
    summary:
      'Presented my master’s research, first author: a 9 × 6 × 0.5 mm ultrasonic piezoelectric plate motor with vision-based closed-loop control. Feedback cut orientation drift from 10.2° to 2.6°, reduced straight-line error by 82%, and let the motor carry nearly five times its own weight.',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7403954040453451777/',
    photo: {
      src: spieTalk,
      alt: 'Flora Liu at the lectern at SPIE Smart Structures + NDE 2026, beside a slide titled "Structure Design of the Miniature piezoelectric motor".',
      caption:
        'SPIE 2026, Vancouver: presenting the motor’s structure design.',
    },
  },
];

/* Newest first. An expired credential is dropped rather than listed.
   `tier` keeps proctored certifications apart from course and training
   badges, so the two never read as the same weight. */
export const CERTS = [
  {
    name: 'AWS Certified AI Practitioner',
    tier: 'cert',
    issuer: 'Amazon Web Services',
    logo: logoAws,
    date: 'Sep 2026',
    url: 'https://www.credly.com/badges/5087d2da-c80b-4ca9-9c1e-c43653aa200b/linked_in_profile',
  },
  {
    name: 'Agentic AI Certified Foundations Associate',
    tier: 'cert',
    issuer: 'Oracle',
    logo: logoOracle,
    date: 'Sep 2026',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=CD2D9211D6A3CFEDB6E477E0BD2C57FC19DB9C6BC3040C32D4A2182BCBDC81DD',
  },
  {
    name: 'Cloud Practitioner: Foundations',
    tier: 'training',
    issuer: 'AWS Skills Center',
    logo: logoAws,
    date: 'Apr 2026',
    url: 'https://www.credly.com/badges/3ae6f4d9-d35d-4302-8e86-472cb0c2892d/linked_in_profile',
  },
  {
    name: 'Gemini Certified Faculty',
    tier: 'training',
    issuer: 'Google for Education',
    logo: logoGoogleEdu,
    date: 'Dec 2025',
    url: 'https://edu.google.accredible.com/13c3248d-62d4-4450-bc9c-de965fa18efa',
  },
  {
    name: 'Gemini Certified University Student',
    tier: 'training',
    issuer: 'Google for Education',
    logo: logoGoogleEdu,
    date: 'Dec 2025',
    url: 'https://edu.google.accredible.com/4a4f4ccc-4399-4403-8a81-702dbb20360c',
  },
];
