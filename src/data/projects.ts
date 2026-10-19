// Project content. Every claim here is drawn from the project's own README,
// design docs, thesis document or live site, and each project lists where
// a reviewer can verify it (repository, live URL).
//
// To add a project: append an entry to `projects` (and optionally give it a
// `caseStudy`). Components render whatever is here; no layout changes needed.

export type LinkKind = 'repo' | 'live' | 'case';
export type ProjectLink = { label: string; href: string; kind: LinkKind };

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; caption?: string; code: string }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'callout'; title: string; text: string };

export type CaseSection = { id: string; heading: string; blocks: Block[] };

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  context: string;
  year: string;
  summary: string;
  problem: string;
  whyInteresting: string;
  built: string[];
  decisions: { title: string; body: string }[];
  stack: string[];
  facts: { value: string; label: string }[];
  links: ProjectLink[];
  image?: { base: string; alt: string; browserUrl: string; aspect?: string };
  /** A live page that can be played inside the portfolio (loaded on click). */
  play?: { url: string; aspect: string };
  caseStudy?: { intro: string; sections: CaseSection[] };
};

const gh = (repo: string) => `https://github.com/WarunaJayasundara/${repo}`;

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'helaiq',
    index: '01',
    name: 'HelaIQ',
    tagline: 'Adaptive cognitive training and exam-readiness platform',
    context: 'Final-year project · University of Kelaniya',
    year: '2025 - 2026',
    summary:
      'A bilingual (English / Sinhala) platform that helps Sri Lankan candidates prepare for competitive government exams with an adaptive placement test, weak-area practice, eight cognitive games and an explainable machine-learning readiness prediction.',
    problem:
      'Candidates for SLAS, Development Officer, Grama Niladhari, banking and similar exams prepare with static question books that give a raw percentage and no sense of real ability, weak areas or readiness, and very little of it is available in Sinhala.',
    whyInteresting:
      'A fair score needs a measurement model, not a percentage. That turned the project into applied psychometrics: item difficulties calibrated from real responses, an adaptive test that stops when the estimate is precise enough, and a prediction model that has to explain itself.',
    built: [
      'Rasch (IRT) computerised-adaptive placement test with Newton-Raphson ability estimation and a precision-based stopping rule',
      'Laravel 9 API (99 routes) organised into domain services: IRT, ML, sessions, study plans, gamification, question bank',
      'React 19 + TypeScript SPA with full English / Sinhala interface',
      'Python FastAPI service serving an XGBoost readiness model with SHAP-based explanations',
      'Deterministic question generators and server-rendered SVG visual questions, 6,700+ active items',
      'Admin tools: psychometrics dashboard, ML research dashboard, AI-draft review queue',
    ],
    decisions: [
      {
        title: 'Rasch over 2PL / 3PL',
        body: 'Needs far less response data per item to calibrate stably, which matters for a bank that is still growing. Discrimination is tracked separately as a diagnostic instead.',
      },
      {
        title: 'The browser never calls the ML service',
        body: 'The model trusts whatever features it is given. Laravel builds the 43-value feature vector from the student’s own database rows, so the only way to raise a score is to practise.',
      },
      {
        title: 'Every external dependency has a working mock',
        body: 'AI feedback, question drafting and coaching sit behind interfaces with a zero-config fallback, so the whole platform runs with no API keys and switches to Gemini with one .env change.',
      },
    ],
    stack: ['Laravel 9', 'PHP 8', 'React 19', 'TypeScript', 'Tailwind 4', 'TanStack Query', 'MySQL', 'Python', 'FastAPI', 'XGBoost', 'SHAP', 'i18next'],
    facts: [
      { value: '6,700+', label: 'active questions' },
      { value: '100 / 100', label: 'backend tests passing' },
      { value: 'r = 0.991', label: 'IRT item-recovery, simulated' },
      { value: '0.906', label: 'readiness ROC-AUC' },
    ],
    links: [
      { label: 'Case study', href: '/work/helaiq', kind: 'case' },
      { label: 'Source on GitHub', href: gh('Final-Year-Project'), kind: 'repo' },
    ],
    image: { base: 'helaiq', alt: 'HelaIQ landing page: "Train smarter. Think faster. Prepare with purpose." beside an exam-readiness card showing level and practice streak.', browserUrl: 'helaiq · landing' },
    caseStudy: {
      intro:
        'HelaIQ is my final-year project (CT/2020/074), supervised by Dr. N. Mekhala Hakmanage. I designed and built all three services (the React client, the Laravel API and the Python ML service) and documented every number below in the project’s thesis reference, where each figure is either taken from a recorded run or re-queried against the live development system.',
      sections: [
        {
          id: 'context',
          heading: 'Context and objectives',
          blocks: [
            { type: 'p', text: 'Sri Lankan public-sector entrance exams test reasoning, numerical ability, memory and attention. Students prepare with past papers that report a raw percentage, which treats every question as equally hard and says nothing about readiness.' },
            { type: 'p', text: 'The objectives were to give each student a measured starting point, practice that targets weaknesses, a readiness signal that explains itself, and all of it in both English and Sinhala.' },
            {
              type: 'table',
              caption: 'Who uses the platform',
              head: ['Role', 'What they do'],
              rows: [
                ['Student', 'Adaptive placement test, daily weak-area practice, timed mock exams, 8 cognitive games, study notes with spaced repetition, exam profile with countdown, readiness prediction'],
                ['Admin', 'Question bank (manual, generated, AI-drafted with review), IRT calibration, psychometrics and ML research dashboards, reference-document library, feedback review'],
              ],
            },
          ],
        },
        {
          id: 'architecture',
          heading: 'Architecture and data flow',
          blocks: [
            {
              type: 'code',
              caption: 'Three services, one trust boundary',
              code: `Browser - React 19 SPA (Vite, Tailwind 4, TanStack Query, i18next)
   │  same-origin /api requests, Sanctum cookie session + CSRF
   ▼
Laravel 9 API
   │  thin controllers → domain services
   │  Irt/ · Ml/ · Sessions/ · Study/ · Gamification/ · QuestionBank/
   ├──────────────► MySQL - 25 tables, 46 migrations
   └──────────────► FastAPI ML service (server-to-server only)
                     /predict · /duplicate-check · /evaluation-report`,
            },
            { type: 'p', text: 'A readiness prediction is a good example of the flow. The client posts to /api/readiness/predict. FeatureExtractionService builds 43 features from the student’s real sessions, answers, game scores and check-ins. The ML service returns a class, a percentage and the top SHAP reasons, and Laravel stores it as a new row. Prediction history is append-only, so trends can be plotted and audited.' },
            {
              type: 'list',
              items: [
                'Retire, never delete: obsolete questions are marked inactive because answer history holds foreign keys to them.',
                'History tables (predictions, XP ledger) are append-only.',
                'Demo and real data are separated by flags, and every research query filters demo rows out by default.',
                'The same ordered 43-feature list is implemented in PHP and Python and checked to match exactly.',
              ],
            },
          ],
        },
        {
          id: 'adaptive',
          heading: 'The adaptive testing engine',
          blocks: [
            { type: 'p', text: 'The first version placed students with fixed accuracy bands (0-39% → Level 1). That assumes every question is equally difficult and has no statistical basis, so I rebuilt placement around the one-parameter Rasch model and turned it into a true computerised-adaptive test.' },
            {
              type: 'code',
              caption: 'Probability of a correct answer, and the Newton-Raphson ability update',
              code: `P(θ) = 1 / (1 + e^-(θ − b))

θ(k+1) = θk + Σ(uᵢ − Pᵢ(θk)) / Σ Pᵢ(θk)(1 − Pᵢ(θk))

SE(θ) = 1 / √I(θ)`,
            },
            {
              type: 'list',
              items: [
                'Item difficulties are calibrated from real responses with PROX, a closed-form method that cannot fail to converge on sparse data. Items with fewer than 5 responses fall back to a prior from their authored level.',
                'Next item = the unseen item whose difficulty is closest to the current θ, rotated across 5 cognitive categories for content balance.',
                'The test stops at 25 items, or earlier once at least 15 items are answered and SE(θ) ≤ 0.35, so a lucky streak cannot produce a “finished” but meaningless result.',
                'IQ = 100 + 15θ, clamped to [40, 160]; level cut-points at θ = −2, −1, 1, 2 line up exactly with the standard IQ bands.',
              ],
            },
          ],
        },
        {
          id: 'ml',
          heading: 'Exam-readiness prediction',
          blocks: [
            { type: 'p', text: 'No public dataset records whether a Sri Lankan exam candidate passed, so the model learns from a hybrid set of 73,637 rows: 45.7% real (Open University Learning Analytics Dataset and UCI Student Performance) and the rest synthetic, with the generator’s weights calibrated by logistic regression against real outcomes. A hard 40% floor stops future changes from diluting the real data.' },
            {
              type: 'table',
              caption: 'Model selection: nine families screened with 5-fold CV, top three tuned with Optuna under nested CV',
              head: ['Model', 'Optimised test macro-F1'],
              rows: [
                ['XGBoost (selected)', '0.6808'],
                ['CatBoost', '0.6800'],
                ['LightGBM', '0.6799'],
              ],
            },
            { type: 'p', text: 'On held-out data the selected model reaches macro-F1 0.681 and ROC-AUC 0.906. The evaluation pipeline flags overfitting (train score above CV score), and that warning is shown on the admin dashboard rather than hidden.' },
            {
              type: 'callout',
              title: 'What I deliberately did not predict',
              text: '“Recommended study hours” and “best learning strategy” were in the original brief. No dataset holds valid ground truth for either, and choosing a strategy needs causal data. They are delivered as rule-based recommendations and labelled that way.',
            },
            { type: 'p', text: 'Every prediction comes with its top five SHAP reasons and a plain-English sentence comparing it with the student’s previous prediction. Demographic fields from the real data were analysed offline for fairness and kept out of the feature vector entirely.' },
          ],
        },
        {
          id: 'content',
          heading: 'Content at scale, without hand-checking answers',
          blocks: [
            { type: 'p', text: 'Most of the bank comes from deterministic PHP generators that follow a “generate forward, solve backward” pattern: pick parameters, compute the answer with a real solver, then write the question and distractors around it. Blood-relation puzzles walk a constructed family graph; seating puzzles are brute-forced to prove a unique solution before they are accepted.' },
            { type: 'p', text: 'Visual questions (matrices, rotation, mirror, paper folding, cube nets) are rendered as SVG on the server. Rotation items check that no rotation of the mirrored shape equals the original, so a “mirrored” distractor can never accidentally be correct.' },
            { type: 'p', text: 'AI-drafted questions go through a mandatory draft → admin review → publish pipeline with two independent duplicate checks (Jaccard overlap and TF-IDF cosine).' },
          ],
        },
        {
          id: 'bilingual',
          heading: 'Getting Sinhala right',
          blocks: [
            { type: 'p', text: 'Sinhala script is easy to corrupt silently: a stray code point from a neighbouring Unicode block looks almost right. I wrote a validator that builds a corpus of verified words from all seeders and locale files (1,398 words across 33 files) and rejects forbidden code points or unreviewed new words.' },
            { type: 'p', text: 'A structural check compares English and Sinhala question pairs for matching numbers, option counts and answer keys, and is documented as a structural heuristic, not as semantic understanding.' },
          ],
        },
        {
          id: 'testing',
          heading: 'Testing and validation',
          blocks: [
            {
              type: 'list',
              items: [
                '100 / 100 backend tests passing (php artisan test), run against a realistic database with exact per-test cleanup.',
                'Monte Carlo parameter recovery: 500 simulated students, 60 items, 15,013 responses. Item difficulty r = 0.991, ability r = 0.915.',
                '131 generated questions re-solved independently from their stored text, with 0 mismatches.',
                '12 / 12 unauthenticated requests to protected endpoints correctly refused with 401 / 403.',
                'TypeScript type-check clean, plus end-to-end browser checks of the landing page, admin flows, language switching and the 375 px layout.',
              ],
            },
          ],
        },
        {
          id: 'lessons',
          heading: 'Status and lessons',
          blocks: [
            { type: 'p', text: 'HelaIQ runs as three services in a development environment and has been tested by users through a tunnel. It has not yet been deployed to a public production host, and pre-test / post-test results will be reported once the real cohort is large enough.' },
            { type: 'p', text: 'The ablation study is the result I learned most from. Nine response-time features I expected to help made the model slightly worse (macro-F1 0.6764 against 0.6845 for the live 43-feature model), so the live model was not changed. Reporting that negative result honestly was more useful than shipping a feature that looked impressive.' },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'yash-pos',
    index: '02',
    name: 'YASH MOBILE POS',
    tagline: 'Point of sale and inventory for a real phone-accessories shop',
    context: 'Client system · in production',
    year: '2026',
    summary:
      'Point of sale, inventory, purchasing and profit reporting for YASH MOBILE, a mobile accessories shop in Sri Lanka. It runs on the shop PC and the owner’s phone, installs as a PWA and keeps selling when the connection drops.',
    problem:
      'A small shop needs fast billing, stock it can trust and real profit figures. Two tills selling the last unit, a double-clicked “Pay” button or a dropped connection must never corrupt stock or create a duplicate invoice.',
    whyInteresting:
      'Most of the difficulty is invisible: concurrency, idempotency, money arithmetic and an offline mode that must stay honest about what the server has really recorded.',
    built: [
      'Laravel 12 REST API, documented with an OpenAPI spec',
      'React 18 + TypeScript client with 23 screens: keyboard-first POS, products, purchases, returns, reports, audit',
      'Installable PWA with an IndexedDB offline sales queue and conflict reconciliation',
      'Thermal (80 / 58 mm), A4 and server-side PDF invoices',
      'Role-based access with per-role discount limits and supervisor approval',
      'One-command cPanel packaging, so it deploys to cheap shared hosting with no terminal',
    ],
    decisions: [
      {
        title: 'One function changes stock',
        body: 'Every stock change goes through a single service that writes a ledger row. Sales decrement with one conditional UPDATE, so two tills cannot both sell the last unit. A test fires 5 parallel sales at 2 units to prove it.',
      },
      {
        title: 'Idempotent checkout',
        body: 'Each sale carries a client request ID with a unique index. A retry, double click or offline sync returns the original sale instead of creating a second one, even when two copies race.',
      },
      {
        title: 'Money in integer cents, cost at moment of sale',
        body: 'Weighted-average cost is frozen on each sale line, so later purchases never rewrite historical profit. Invoices are immutable snapshots.',
      },
    ],
    stack: ['Laravel 12', 'PHP 8.2', 'React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'MySQL / MariaDB', 'PWA', 'IndexedDB', 'PHPUnit', 'Vitest'],
    facts: [
      { value: '23', label: 'application screens' },
      { value: '10', label: 'PHP feature-test suites' },
      { value: '0', label: 'negative stock, by construction' },
      { value: 'Live', label: 'yashenterpr.store' },
    ],
    links: [
      { label: 'Case study', href: '/work/yash-pos', kind: 'case' },
      { label: 'Live system', href: 'https://yashenterpr.store/products', kind: 'live' },
      { label: 'Source on GitHub', href: gh('YashPos-Sys'), kind: 'repo' },
    ],
    image: { base: 'yash', alt: 'YASH MOBILE POS sign-in screen: “Run the shop from one screen.” with fast billing, trusted profit and mobile access listed beside a staff login form.', browserUrl: 'yashenterpr.store' },
    caseStudy: {
      intro:
        'YASH MOBILE POS is a production system I built for a mobile phone accessories shop. Version 1 had a Node.js / Express backend; version 2 moved the API to Laravel 12 while keeping the same API contract, database tables and React client, so existing data carried over unchanged.',
      sections: [
        {
          id: 'requirements',
          heading: 'Requirements and constraints',
          blocks: [
            {
              type: 'list',
              items: [
                'Billing must be fast at the counter: keyboard shortcuts (F2 search, F9 pay) and barcode scanners that type the code and press Enter.',
                'The owner and cashiers sign in at the same time on different devices; cost and profit fields must not reach users without permission.',
                'Hosting budget is shared cPanel hosting with PHP and MySQL, with no terminal access.',
                'The internet connection is not reliable, but a sale must never be lost or duplicated.',
              ],
            },
          ],
        },
        {
          id: 'architecture',
          heading: 'Architecture',
          blocks: [
            {
              type: 'code',
              caption: 'Online-first, with a conservative offline path',
              code: `React SPA ── service worker (app shell only) ── IndexedDB
   │                                          ├─ cost-free product catalogue
   │                                          └─ offline sales queue (PENDING / CONFLICT)
   ▼
Laravel 12 API  ── Services/Inventory (the only code that changes stock)
   │            ── Services/Sales (sales, voids, returns), PDF invoices
   ▼
MySQL / MariaDB ── stock_movements ledger, document_sequences, audit log`,
            },
          ],
        },
        {
          id: 'integrity',
          heading: 'Keeping stock and money correct',
          blocks: [
            {
              type: 'code',
              caption: 'A decrement is a single conditional statement',
              code: `UPDATE products
   SET qtyOnHand = qtyOnHand - :n
 WHERE id = :id
   AND qtyOnHand - qtyReserved >= :n
-- 0 rows updated → transaction aborts with INSUFFICIENT_STOCK`,
            },
            {
              type: 'list',
              items: [
                'Increments lock the product row (SELECT … FOR UPDATE) so the moving weighted-average cost is computed from a consistent state.',
                'A sale, its items, payments, warranty records, stock movements, invoice number and audit entry are written in one transaction.',
                'Invoice numbers come from a sequence table inside the same transaction, so they are unique and gap-free per year (YM-2026-000001).',
                'Partial returns use the same conditional-update pattern, so refunds stay exact across repeated partial returns.',
              ],
            },
          ],
        },
        {
          id: 'offline',
          heading: 'An offline mode that stays honest',
          blocks: [
            { type: 'p', text: 'When the device is offline, the sale is stored in IndexedDB as PENDING, with no invoice number, and is clearly labelled as not yet recorded. The local catalogue is reduced so the same device cannot oversell its own stock.' },
            { type: 'p', text: 'On reconnect, pending sales are posted one by one with their original request ID, so a lost response can never create a duplicate. The server re-checks stock, prices and permissions. If another till already sold the item, the sale becomes CONFLICT and waits for a person to reconcile it. The client never pushes stock quantities to the server.' },
          ],
        },
        {
          id: 'testing',
          heading: 'Testing',
          blocks: [
            { type: 'p', text: 'PHPUnit feature tests run against a real MySQL test database, recreated on each run (the bootstrap refuses to reset any database whose name does not contain “test”). Suites cover auth, inventory, sales, returns and reports, stock alerts, stock undo, setup and a route smoke test. The client uses Vitest with Testing Library and fake-indexeddb for the offline queue.' },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'nithi-docket',
    index: '03',
    name: 'Nottary-Service',
    tagline: 'Secure deed-registration tracker for a notarial office',
    context: 'Client system · in production',
    year: '2026',
    summary:
      'Tracks property deeds between buyers and sellers through to Land Registry completion, with role-based access, a full audit trail, staff push notifications and bilingual SMS to buyers and sellers.',
    problem:
      'The office had a single-file HTML prototype that kept NIC numbers and legal deed data in the browser’s localStorage, with plaintext passwords, open sign-up and a “Send SMS” button that sent nothing.',
    whyInteresting:
      'It was a rebuild, not a conversion: keep every field and the visual identity staff already knew, but replace each weak point with a real control that can be shown to work.',
    built: [
      'Plain-PHP MVC with PDO, no runtime framework or Composer dependency',
      'Submitted → Reviewed → Received workflow driven by explicit, audit-logged staff actions',
      'Firebase Cloud Messaging (HTTP v1, signed with PHP’s openssl) for staff alerts',
      'Real SMS to buyers and sellers via text.lk, with admin-editable bilingual wording',
      'Security controls: CSRF on every state change, lockouts, per-IP throttling, hardened sessions and headers',
    ],
    decisions: [
      {
        title: 'Status changes are actions, not inferences',
        body: 'After client feedback, status moved from being derived from which fields were filled to explicit “Mark reviewed / Mark received” steps. Simpler for staff and impossible to drift.',
      },
      {
        title: 'Two channels for two audiences',
        body: 'Firebase reaches staff accounts, SMS reaches phone numbers. Every attempt is logged with its real outcome; nothing pretends to have been sent.',
      },
      {
        title: 'No account enumeration',
        body: 'Unknown usernames still run a full bcrypt check against a dummy hash (about 64 ms vs 67 ms), so response time does not reveal which accounts exist.',
      },
    ],
    stack: ['PHP 8', 'MySQL 8', 'PDO', 'Bootstrap 5', 'Firebase Cloud Messaging', 'text.lk SMS', 'PHPUnit', 'PHP_CodeSniffer'],
    facts: [
      { value: '3-step', label: 'explicit deed workflow' },
      { value: '2', label: 'notification channels' },
      { value: 'PSR-12', label: 'enforced code style' },
      { value: 'Live', label: 'nottary-service.online' },
    ],
    links: [
      { label: 'Case study', href: '/work/nithi-docket', kind: 'case' },
      { label: 'Live system', href: 'https://nottary-service.online/login', kind: 'live' },
      { label: 'Source on GitHub', href: gh('Law-App'), kind: 'repo' },
    ],
    image: { base: 'nithi', alt: 'Nottary-Service sign-in screen with the headline “A single, secure record of every deed from submission to registration.” and a workspace login card.', browserUrl: 'nottary-service.online' },
    caseStudy: {
      intro:
        'Nottary-Service (repository: Law-App, internal name Nithi Docket) replaced a browser-only prototype used by a legal and notarial office. I analysed the prototype, documented its weaknesses, and rebuilt it as a server-side application while preserving every field and the visual identity the staff were used to.',
      sections: [
        {
          id: 'analysis',
          heading: 'Starting from the prototype',
          blocks: [
            {
              type: 'table',
              caption: 'Weaknesses found, and what replaced them',
              head: ['Prototype', 'Rebuild'],
              rows: [
                ['All data in localStorage, no backup', 'MySQL with foreign keys, indexes and audit trail'],
                ['Plaintext passwords compared in the browser', 'password_hash / password_verify on the server'],
                ['Open self-sign-up for legal records', 'Accounts created only by an administrator'],
                ['“Send SMS” flipped a boolean', 'Real FCM push and real SMS, with true outcomes logged'],
                ['No authorization boundaries', 'RBAC checked in every controller action, not just hidden in the UI'],
              ],
            },
          ],
        },
        {
          id: 'security',
          heading: 'Security, implemented and testable',
          blocks: [
            {
              type: 'list',
              items: [
                'Every query uses PDO prepared statements with emulated prepares turned off, so MySQL’s native protocol is used.',
                'CSRF is checked centrally in the router, so a controller cannot forget it; a failure returns HTTP 419.',
                '5 failed sign-ins lock an account for 15 minutes; more than 20 failures from one IP in 10 minutes are refused.',
                'Session IDs regenerate on login; cookies are HttpOnly, SameSite=Lax and Secure over HTTPS, with a server-side idle timeout.',
                'All output escaped through one helper; security headers and CSP set in a hardened .htaccess.',
              ],
            },
          ],
        },
        {
          id: 'bugs',
          heading: 'A bug class that only shows up at runtime',
          blocks: [
            { type: 'p', text: 'Testing against a real MySQL instance, rather than relying on syntax checks, surfaced four queries that reused the same named placeholder twice. With native prepared statements MySQL rejects that, and it only appears at runtime as SQLSTATE[HY093]. All four were fixed, and the reason emulated prepares stay off is documented.' },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'beaver-creation',
    index: '04',
    name: 'Beaver Creation website',
    tagline: 'Company website built during my internship',
    context: 'Internship · Beaver Creation (Pvt) Ltd',
    year: '2025 - 2026',
    summary:
      'Marketing website for a creative technology studio working across music, gaming, animation and tech. Built with Next.js 15, React 19, TypeScript, Tailwind CSS and Framer Motion.',
    problem: 'The studio needed a fast, responsive site presenting four divisions and a portfolio, with a consistent visual identity.',
    whyInteresting: 'A brand site lives or dies on motion and image weight. The work was balancing a cinematic look with load time on mobile connections.',
    built: ['Next.js 15 App Router site with TypeScript', 'Responsive layouts and animated sections with Framer Motion', 'Deployed on Vercel'],
    decisions: [],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    facts: [],
    links: [
      { label: 'Live site', href: 'https://www.beavercreation.com/', kind: 'live' },
      { label: 'Source on GitHub', href: gh('beaver-creation'), kind: 'repo' },
    ],
    image: { base: 'beaver', alt: 'Beaver Creation homepage hero: “Turning Creativity into Reality” over dark game artwork, with navigation and call-to-action buttons.', browserUrl: 'beavercreation.com' },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'examdock',
    index: '05',
    name: 'ExamDock',
    tagline: 'Offline desktop widget for exam countdowns',
    context: 'Personal project',
    year: '2026',
    summary:
      'A Windows desktop sidebar widget that tracks exam countdowns, sends reminders and imports timetables from CSV, Excel, PDF, Word or a photo, all fully offline.',
    problem: 'Students juggle exam timetables in PDFs and photos; a widget that sits on the desktop and imports them directly removes the copying.',
    whyInteresting:
      'Pinning a window behind other apps on the Windows desktop means reparenting it into the hidden WorkerW window, done here through a pure-JS FFI call to user32.dll.',
    built: [
      'Electron main process with a narrow contextBridge API to a React renderer',
      'SQLite storage with migrations, backup and restore',
      'Import pipeline for CSV / XLSX / PDF / DOCX / TXT and offline Tesseract OCR',
      'Offline reminder scheduler with native Windows notifications',
    ],
    decisions: [],
    stack: ['Electron', 'React 18', 'Node.js', 'SQLite', 'Tesseract OCR'],
    facts: [],
    links: [{ label: 'Source on GitHub', href: gh('exam-counter'), kind: 'repo' }],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'dog-run',
    index: '06',
    name: 'Dog Run',
    tagline: 'A browser runner game you can play right here',
    context: 'Personal project · playable',
    year: '2026',
    summary:
      'An endless-runner game in plain JavaScript: jump, double-jump and slide past 20 bombs as the speed rises. Works with a keyboard or on-screen touch buttons, and saves your best score.',
    problem: 'Build a complete, polished game with no framework or engine: physics, animation, collisions, sound and controls, all hand-written.',
    whyInteresting:
      'The game world is a fixed 1920×864 stage scaled to fit any screen, so the dog, bombs and floor line up the same way on a phone or a desktop.',
    built: [
      'Frame-rate independent physics: gravity, jump, double jump and fast fall use a delta time capped at 50 ms',
      'Hitboxes tighter than the sprites, so collisions feel fair',
      'Flying bombs from the fifth bomb onward, with spawn gaps that grow with speed so every jump stays possible',
      'Sprite animation, sound with mute, pause, best score in localStorage and touch controls for phones',
    ],
    decisions: [],
    stack: ['JavaScript', 'HTML', 'CSS', 'Vercel'],
    facts: [],
    links: [
      { label: 'Play full screen', href: 'https://mini-game-rho-gray.vercel.app/', kind: 'live' },
      { label: 'Source on GitHub', href: gh('Mini-Game'), kind: 'repo' },
    ],
    image: {
      base: 'dogrun',
      alt: 'Dog Run gameplay: a cartoon dog jumps over a bomb in a torch-lit castle corridor, with score, bombs passed and best score shown at the top.',
      browserUrl: 'mini-game-rho-gray.vercel.app',
      aspect: '20/9',
    },
    play: { url: 'https://mini-game-rho-gray.vercel.app/', aspect: '20/9' },
  },
];

// Earlier and coursework projects, listed compactly.
export const archive: { name: string; stack: string; note: string; href?: string }[] = [
  { name: 'Hotel Management System', stack: 'React, CSS', note: 'Booking with room availability, authentication and an admin dashboard', href: gh('hotel-management-system') },
  { name: 'Flask email API', stack: 'Python, Flask, Brevo', note: 'Transactional email service built on the Brevo API', href: gh('flask-brevo-api') },
  { name: 'Library Management System', stack: 'Java, JavaFX, MySQL', note: 'Desktop app for books and lending with search and authentication' },
  { name: 'Courier Tracking System', stack: 'Python, PostgreSQL', note: 'Package and courier tracking with stored data management' },
  { name: 'Waste Control System', stack: 'HTML, CSS, JavaScript', note: 'User and admin roles for scheduling pickups and reporting local issues' },
  { name: '2D browser game', stack: 'JavaScript', note: 'Animations, scoring logic and event handling', href: gh('game') },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
