/* ---------------------------------------------------------------
   Single source of truth for site copy and structured facts.
   Edit here rather than in the page templates.
   --------------------------------------------------------------- */

export const SITE = {
  name: 'Flora Liu',
  role: 'Hardware Engineer',
  email: 'hua.flora.liu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/flora-liu-b8a905236/',
  github: 'https://github.com/liu092111',
  location: 'Taiwan',
};

/* The three essays carry a number in the nav so a first-time visitor reads
   them as one series rather than three abstract nouns; `hint` becomes the
   link title so hovering explains what each one is. */
export const NAV = [
  { href: '/designed', label: 'Designed', no: '01', hint: 'How a product gets designed' },
  { href: '/confidence', label: 'Confidence', no: '02', hint: 'How a product earns confidence' },
  { href: '/value', label: 'Value', no: '03', hint: 'How a product creates value' },
  { href: '/speaking', label: 'Speaking', hint: 'Talks, topics and invitations' },
  { href: '/about', label: 'About', hint: 'Experience, tools and selected work' },
];

/* The three evergreen pillars. These are the site's argument; the
   portfolio is the evidence behind them. */
export const PILLARS = [
  {
    no: '01',
    href: '/designed',
    title: 'How a product gets designed',
    promise:
      'No one designs the whole product. Every function designs a different version of the product. The customer only gets one.',
    question: 'How do partial truths become one coherent product?',
  },
  {
    no: '02',
    href: '/confidence',
    title: 'How a product earns confidence',
    promise:
      'A working design is only the beginning. NPI has to turn failure into knowledge, correction into evidence, and evidence into confidence at scale.',
    question: 'How does NPI turn failure into confidence?',
  },
  {
    no: '03',
    href: '/value',
    title: 'How a product creates value',
    promise:
      'A request is only the beginning. Product development turns the problem behind it into something real, then keeps learning from use.',
    question: 'How does a customer problem become a product that keeps solving it?',
  },
];

/* The constraint, stated as a position rather than hidden as a gap. */
export const NDA = {
  kicker: 'Working under confidentiality',
  headline: 'The product can be confidential. The thinking does not have to be.',
  body: [
    'I cannot publish the devices, datasets or conclusions I work with. For a while that seemed like a reason to write nothing. Then it became obvious that the confidential part was never the interesting part.',
    'What transfers is the reasoning: how to frame uncertainty, how to design evidence worth trusting, how to recognise a failure mode that is hiding, and how to turn technical context into a recommendation somebody can act on. None of that belongs to any one employer.',
  ],
  closing: 'This site argues about method. The programmes stay out of it.',
};

export const VANTAGE = [
  {
    no: '01',
    org: 'SGS',
    kind: 'Third-party laboratory',
    verb: 'Observe failure',
    period: '2023–2024',
    learned:
      'Evidence is manufactured, not found. I learned where a fixture can lie to you, and what a defensible conclusion requires.',
  },
  {
    no: '02',
    org: 'Delta Electronics',
    kind: 'System company',
    verb: 'Understand design',
    period: '2024',
    learned:
      'Simulation and automation showed me how early design choices set the cost of every later iteration. Much of engineering is removing friction between tools.',
  },
  {
    no: '03',
    org: 'Amazon',
    kind: 'Global consumer brand',
    verb: 'Decide readiness',
    period: '2025–now',
    learned:
      'Across EVT, DVT, PVT, HVT and mass production, the question stops being "did it pass" and becomes "do we ship". Evidence, statistics and business context arrive at the same table.',
  },
];

export const EXPERIENCE = [
  {
    org: 'Amazon',
    title: 'Hardware Engineer · Product Integrity',
    period: 'Mar 2025–present',
    note: 'Joined as Hardware Development Engineer Intern; engineer since Mar 2026.',
    points: [
      'Hardware qualification across the full NPI lifecycle: EVT, DVT, PVT, HVT through mass production.',
      'Reliability statistics for risk-based quality decisions: lifetime modelling, distribution fitting, and uncertainty quantification rather than point estimates.',
      'Built a test-data platform (MySQL + dashboards) so reliability evidence could be queried instead of reassembled by hand.',
      'AI-assisted failure analysis on test and field-return data, in collaboration with manufacturing partners.',
      'Automated the coordination layer of NPI (issue tracking, status queries, reporting) so engineering time goes to judgement, not status chasing.',
    ],
  },
  {
    org: 'Delta Electronics',
    title: 'R&D Engineer Intern · Lab for Digital Twin-Based Optimization',
    period: 'Jul–Aug 2024',
    points: [
      'Built modular Python tooling to automate parametric modelling and FEA execution, shortening the design-to-analysis loop.',
      'Wrapped it in an interface non-programmers could use, then iterated with the engineers who actually ran it.',
    ],
  },
  {
    org: 'SGS Taiwan',
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
    degree: 'M.S., Engineering Science and Ocean Engineering (Electrical & Electronic)',
    period: '2024–2026',
    detail:
      'Conference paper: Load-carrying and stability improvement of a miniature ultrasonic piezoelectric plate motor.',
  },
  {
    school: 'National Cheng Kung University',
    degree: 'B.S., Mechanical Engineering',
    period: '2020–2024',
    detail: 'Research: sliding-mode control system for vibration control.',
  },
];

/* Tools are nouns; methods are capabilities. Keeping them apart means a
   reader scanning for "does she know LabVIEW" finds it in two seconds,
   without the methods list turning into a keyword dump. */
export const TOOLS = [
  { group: 'Languages', items: ['Python', 'MATLAB', 'C++', 'SQL'] },
  { group: 'Data & ML', items: ['pandas', 'NumPy', 'PyTorch', 'MySQL', 'Docker', 'Git'] },
  {
    group: 'Instrumentation',
    items: ['LabVIEW', 'NI DAQ', 'SCPI', 'Simulink', 'LTspice', 'Keil', 'Dicing saw'],
  },
  { group: 'CAD & FEA', items: ['Ansys', 'COMSOL', 'SolidWorks', 'AutoCAD'] },
  { group: 'AI workflow', items: ['LLM agents', 'MCP', 'LangChain', 'LangGraph', 'AWS'] },
];

export const LANGUAGES = [
  { name: 'Mandarin', level: 'Native' },
  { name: 'English', level: 'Professional · TOEIC 770' },
];

export const METHODS = [
  {
    group: 'Reliability & statistics',
    items: [
      'Life-distribution fitting (Weibull, lognormal) and survival-function comparison',
      'B10 life, MTTF, and why an average lifetime hides the failures that matter',
      'Bootstrap and Monte Carlo for uncertainty bounds',
      'Goodness-of-fit testing (KS) and sample-size limits on what a conclusion can claim',
      'Accelerated ageing, test-coverage vs test-time trade-offs',
      'Annual return rate as the link between a test result and a cost',
    ],
  },
  {
    group: 'Measurement & instrumentation',
    items: [
      'LabVIEW + DAQ instrumentation, sensor validation, A/D and D/A signal paths',
      'SCPI instrument control and synchronised multi-channel excitation',
      'Camera-based motion measurement: calibration, distortion correction, filtering',
      'Vibration, shock, thermal, ingress and HALT methodologies',
    ],
  },
  {
    group: 'Simulation & design',
    items: [
      'Ansys and COMSOL FEA, scripted and parameterised',
      'SolidWorks, AutoCAD',
      'Correlating simulation against physical test, and diagnosing disagreement',
    ],
  },
  {
    group: 'Data & software',
    items: [
      'Python, MATLAB, C++',
      'MySQL data pipelines, Docker, Git',
      'Neural-network surrogates mapping design parameters to performance',
      'LLM agents and MCP-based workflow automation',
    ],
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
   - `film-tracking`, `IMU-control`, `AD9106_SRAM-function`,
     `weathering-report`: real work, but not yet mapped to a claim. Add one
     here the moment an essay needs it. */
export const PROJECTS = [
  {
    title: 'Closed-loop control of a miniature physical system',
    featured: true,
    kind: 'Research instrumentation',
    repo: 'https://github.com/liu092111/camera_function_generator_multithreaded',
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
      'Fits life distributions to test-to-failure data and generates a report: survival-function comparison, cumulative failure curves, and distribution contribution. Anonymised datasets only.',
  },
  {
    title: 'Neural-network surrogates for flow regression',
    kind: 'Machine learning',
    repo: 'https://github.com/liu092111/Deep-Learning',
    summary:
      'Regression of Couette and Hagen–Poiseuille flow fields, with a deliberate architecture ablation (baseline against deeper, wider and different-activation variants) to see what mattered.',
  },
  {
    title: 'Instrument data pipeline',
    kind: 'Data engineering',
    repo: 'https://github.com/liu092111/weather-data-MySQL-system',
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

export const TALKS = [
  {
    event: 'Techie Talk',
    year: '2026',
    role: 'Invited speaker',
    summary:
      'Shared what hardware engineering looks like inside a global consumer brand: from design to mass production, the decisions that get hard, and how AI can support the workflow without replacing the engineer.',
  },
];

export const CERTS = [
  {
    name: 'Agentic AI Certified Foundations Associate',
    issuer: 'Oracle',
    date: 'Sep 2026',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=CD2D9211D6A3CFEDB6E477E0BD2C57FC19DB9C6BC3040C32D4A2182BCBDC81DD',
  },
  {
    name: 'Cloud Practitioner: Foundations',
    issuer: 'AWS Skills Center',
    date: 'Apr 2026',
    url: 'https://www.credly.com/badges/3ae6f4d9-d35d-4302-8e86-472cb0c2892d/linked_in_profile',
  },
  {
    name: 'Gemini Certified Faculty',
    issuer: 'Google for Education',
    date: 'Dec 2025',
    url: 'https://edu.google.accredible.com/13c3248d-62d4-4450-bc9c-de965fa18efa',
  },
  {
    name: 'Gemini Certified University Student',
    issuer: 'Google for Education',
    date: 'Dec 2025',
    url: 'https://edu.google.accredible.com/4a4f4ccc-4399-4403-8a81-702dbb20360c',
  },
];
