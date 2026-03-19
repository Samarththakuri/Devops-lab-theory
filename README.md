<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SAMARTH.exe — DevOps Lab</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Anton&display=swap"
      rel="stylesheet"
    />
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        --bg: #f0ede6;
        --black: #0d0d0d;
        --yellow: #f5e642;
        --blue: #4f6ef7;
        --pink: #f07baa;
        --green: #3ddc84;
        --white: #ffffff;
        --border: 3px solid #0d0d0d;
        --border-thick: 4px solid #0d0d0d;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        font-family: "Space Mono", monospace;
        background: var(--bg);
        color: var(--black);
        min-height: 100vh;
        overflow-x: hidden;
        cursor: crosshair;
      }

      /* DOT GRID */
      body::before {
        content: "";
        position: fixed;
        inset: 0;
        background-image: radial-gradient(circle, #0d0d0d 1px, transparent 1px);
        background-size: 28px 28px;
        opacity: 0.18;
        pointer-events: none;
        z-index: 0;
      }

      /* FLOATING SHAPES */
      .shape {
        position: fixed;
        pointer-events: none;
        z-index: 0;
      }
      .shape-square {
        width: 90px;
        height: 90px;
        background: var(--blue);
        border: var(--border-thick);
        top: 22%;
        left: 5%;
        animation: float1 6s ease-in-out infinite;
      }
      .shape-circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: var(--pink);
        border: var(--border-thick);
        top: 40%;
        right: 6%;
        animation: float2 7s ease-in-out infinite;
      }
      .shape-triangle {
        width: 0;
        height: 0;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        border-bottom: 70px solid var(--yellow);
        bottom: 20%;
        left: 3%;
        animation: float3 5s ease-in-out infinite;
      }
      .shape-dot {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--green);
        border: var(--border-thick);
        bottom: 30%;
        right: 8%;
        animation: float1 8s ease-in-out infinite reverse;
      }

      @keyframes float1 {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-18px) rotate(5deg);
        }
      }
      @keyframes float2 {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(14px) rotate(-4deg);
        }
      }
      @keyframes float3 {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-12px) rotate(8deg);
        }
      }

      /* NAVBAR */
      nav {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--bg);
        border-bottom: var(--border-thick);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px;
        height: 64px;
      }

      .nav-logo {
        font-family: "Space Mono", monospace;
        font-weight: 700;
        font-size: 1rem;
        border: var(--border-thick);
        padding: 6px 14px;
        letter-spacing: 1px;
        background: var(--white);
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 0;
        border: var(--border-thick);
        background: var(--white);
      }

      .nav-links a {
        font-family: "Space Mono", monospace;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 1px;
        text-decoration: none;
        color: var(--black);
        padding: 10px 18px;
        border-right: var(--border);
        transition: background 0.15s;
      }
      .nav-links a:hover {
        background: var(--yellow);
      }
      .nav-links a:last-child {
        border-right: none;
      }
      .nav-links .cta {
        background: var(--yellow);
        font-weight: 700;
      }
      .nav-links .cta:hover {
        background: #e8d800;
      }

      /* HERO */
      .hero {
        position: relative;
        z-index: 1;
        min-height: calc(100vh - 64px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 40px 80px;
        text-align: center;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: var(--border-thick);
        background: var(--white);
        padding: 8px 20px;
        font-family: "Space Mono", monospace;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 2px;
        margin-bottom: 32px;
      }

      .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--green);
        border: 2px solid var(--black);
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(61, 220, 132, 0.5);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(61, 220, 132, 0);
        }
      }

      .hero-title {
        font-family: "Anton", sans-serif;
        font-size: clamp(4rem, 12vw, 9rem);
        line-height: 0.9;
        letter-spacing: -2px;
        text-transform: uppercase;
        margin-bottom: 0;
      }
      .hero-title .solid {
        color: var(--black);
      }
      .hero-title .outline {
        color: transparent;
        -webkit-text-stroke: 3px var(--black);
      }

      .hero-tagline {
        background: var(--yellow);
        border: var(--border-thick);
        padding: 20px 36px;
        margin: 28px auto 0;
        max-width: 680px;
        font-family: "Space Mono", monospace;
        font-size: clamp(0.85rem, 2vw, 1rem);
        line-height: 1.7;
        font-weight: 400;
      }
      .hero-tagline strong {
        font-weight: 700;
        letter-spacing: 1px;
      }

      .hero-btns {
        display: flex;
        gap: 0;
        margin-top: 32px;
      }

      .btn {
        font-family: "Space Mono", monospace;
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        padding: 16px 36px;
        border: var(--border-thick);
        cursor: pointer;
        text-decoration: none;
        transition:
          transform 0.1s,
          box-shadow 0.1s;
      }
      .btn:hover {
        transform: translate(-3px, -3px);
        box-shadow: 5px 5px 0 var(--black);
      }
      .btn-black {
        background: var(--black);
        color: var(--white);
      }
      .btn-outline {
        background: var(--white);
        color: var(--black);
        border-left: none;
      }
      .btn-outline:hover {
        background: var(--yellow);
      }

      /* STUDENT CARD */
      .student-section {
        position: relative;
        z-index: 1;
        padding: 0 40px 60px;
      }

      .section-label {
        font-family: "Space Mono", monospace;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: var(--black);
        background: var(--yellow);
        border: var(--border-thick);
        display: inline-block;
        padding: 6px 16px;
        margin-bottom: -3px;
        position: relative;
        z-index: 2;
      }

      .student-card {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border: var(--border-thick);
        background: var(--white);
        max-width: 800px;
      }

      .student-field {
        padding: 20px 24px;
        border-right: var(--border);
      }
      .student-field:last-child {
        border-right: none;
      }

      .student-label {
        font-family: "Space Mono", monospace;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #666;
        margin-bottom: 6px;
      }

      .student-value {
        font-family: "Space Mono", monospace;
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--black);
      }

      /* MAIN CONTENT */
      .content {
        position: relative;
        z-index: 1;
        padding: 0 40px 80px;
      }

      /* FOLDER ROOT */
      .folder-root {
        border: var(--border-thick);
        background: var(--white);
        margin-bottom: 24px;
      }

      .folder-root-header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 18px 24px;
        cursor: pointer;
        user-select: none;
        transition: background 0.15s;
        border-bottom: var(--border-thick);
      }
      .folder-root-header:hover {
        background: var(--yellow);
      }
      .folder-root-header.open {
        background: var(--yellow);
      }

      .folder-root-icon {
        font-size: 1.4rem;
      }

      .folder-root-name {
        font-family: "Bebas Neue", sans-serif;
        font-size: 1.6rem;
        letter-spacing: 3px;
        flex: 1;
      }

      .folder-root-meta {
        font-family: "Space Mono", monospace;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 1px;
        padding: 4px 12px;
        border: var(--border);
        background: var(--bg);
      }

      .chevron {
        font-family: "Space Mono", monospace;
        font-size: 1rem;
        font-weight: 700;
        transition: transform 0.2s;
      }
      .open .chevron {
        transform: rotate(90deg);
      }

      .root-children {
        display: none;
        flex-direction: column;
        padding: 16px;
        gap: 8px;
        background: var(--bg);
      }
      .root-children.visible {
        display: flex;
      }

      /* FOLDER ROW */
      .folder-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        background: var(--white);
        border: var(--border);
        cursor: pointer;
        user-select: none;
        transition: all 0.15s;
      }
      .folder-row:hover {
        background: var(--yellow);
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0 var(--black);
      }
      .folder-row.open {
        background: var(--yellow);
        border-bottom: none;
      }

      .folder-row-name {
        font-family: "Space Mono", monospace;
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 1px;
        flex: 1;
      }

      .folder-row-path {
        font-family: "Space Mono", monospace;
        font-size: 0.7rem;
        color: #666;
      }

      /* TAGS */
      .tag {
        font-family: "Space Mono", monospace;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 2px;
        padding: 3px 10px;
        border: 2px solid var(--black);
      }
      .tag-blue {
        background: var(--blue);
        color: var(--white);
      }
      .tag-purple {
        background: #9b5cf6;
        color: var(--white);
      }
      .tag-green {
        background: var(--green);
        color: var(--black);
      }
      .tag-pink {
        background: var(--pink);
        color: var(--black);
      }

      /* LEAF GRID */
      .leaf-grid {
        display: none;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 0;
        border: var(--border);
        border-top: none;
        margin-bottom: 4px;
      }
      .leaf-grid.visible {
        display: grid;
      }

      .leaf-card {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 16px 18px;
        background: var(--white);
        border-right: var(--border);
        border-bottom: var(--border);
        text-decoration: none;
        color: var(--black);
        transition: all 0.15s;
      }
      .leaf-card:hover {
        background: var(--pink);
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0 var(--black);
        z-index: 2;
        position: relative;
      }

      .leaf-card-icon {
        font-size: 1.2rem;
      }
      .leaf-card-name {
        font-family: "Space Mono", monospace;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.5px;
      }
      .leaf-card-path {
        font-family: "Space Mono", monospace;
        font-size: 0.62rem;
        color: #666;
        font-style: italic;
      }

      /* WATERMARK */
      .watermark {
        position: fixed;
        right: -60px;
        top: 50%;
        transform: translateY(-50%) rotate(90deg);
        font-family: "Anton", sans-serif;
        font-size: 10rem;
        color: transparent;
        -webkit-text-stroke: 2px rgba(13, 13, 13, 0.06);
        pointer-events: none;
        z-index: 0;
        letter-spacing: 10px;
        white-space: nowrap;
      }

      /* FOOTER */
      footer {
        position: relative;
        z-index: 1;
        border-top: var(--border-thick);
        background: var(--black);
        color: var(--white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        flex-wrap: wrap;
        gap: 12px;
      }

      .footer-left {
        font-family: "Space Mono", monospace;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 2px;
      }

      footer a {
        font-family: "Space Mono", monospace;
        font-size: 0.75rem;
        color: var(--yellow);
        text-decoration: none;
        font-weight: 700;
        letter-spacing: 1px;
      }
      footer a:hover {
        text-decoration: underline;
      }

      /* SLIDE-IN ANIMATION */
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .hero {
        animation: slideIn 0.5s ease both;
      }
      .student-section {
        animation: slideIn 0.5s ease 0.1s both;
      }
      .content {
        animation: slideIn 0.5s ease 0.2s both;
      }

      @media (max-width: 640px) {
        nav {
          padding: 0 16px;
        }
        .nav-links a {
          padding: 10px 10px;
          font-size: 0.68rem;
        }
        .student-card {
          grid-template-columns: repeat(2, 1fr);
        }
        .student-field {
          border-bottom: var(--border);
        }
        .hero {
          padding: 40px 20px 60px;
        }
        .content,
        .student-section {
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>

  </head>
  <body>
    <!-- FLOATING SHAPES -->
    <div class="shape shape-square"></div>
    <div class="shape shape-circle"></div>
    <div class="shape shape-triangle"></div>
    <div class="shape shape-dot"></div>

    <!-- WATERMARK -->
    <div class="watermark">DEVOPS</div>

    <!-- NAVBAR -->
    <nav>
      <div class="nav-logo">SAMARTH.exe</div>
      <div class="nav-links">
        <a href="#theory">/THEORY</a>
        <a href="#labs">/LABS</a>
        <a href="#assignment" class="cta">ASSIGNMENT ↗</a>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="status-pill">
        <span class="status-dot"></span>
        SYSTEM STATUS: ONLINE
      </div>

      <h1 class="hero-title">
        <span class="solid">CONTAINER</span><br />
        <span class="outline">&amp; DEVOPS</span><br />
        <span class="solid">LAB</span>
      </h1>

      <div class="hero-tagline">
        Theoretical resources &amp; hands-on experiments.<br />
        <strong>Docker · Networks · Volumes · Compose · CI/CD</strong>
      </div>

      <div class="hero-btns">
        <a class="btn btn-black" href="#">↗ VIEW REPO</a>
        <a class="btn btn-outline" href="#theory">EXPLORE ↓</a>
      </div>
    </section>

    <!-- STUDENT RECORD -->
    <section class="student-section">
      <div class="section-label">// STUDENT RECORD</div>
      <div class="student-card">
        <div class="student-field">
          <div class="student-label">Name</div>
          <div class="student-value">Samarth Thakuri</div>
        </div>
        <div class="student-field">
          <div class="student-label">SAP ID</div>
          <div class="student-value">500119430</div>
        </div>
        <div class="student-field">
          <div class="student-label">Theory</div>
          <div class="student-value">6 Topics</div>
        </div>
        <div class="student-field">
          <div class="student-label">Labs</div>
          <div class="student-value">5 Exps</div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="content">
      <!-- THEORY -->
      <div class="folder-root" id="theory">
        <div class="folder-root-header" onclick="toggleRoot(this)">
          <span class="folder-root-icon">📖</span>
          <span class="folder-root-name">THEORY</span>
          <span class="folder-root-meta">6 TOPICS</span>
          <span class="chevron">▶</span>
        </div>
        <div class="root-children">
          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">JAVA APP</span>
            <span class="tag tag-blue">THEORY</span>
            <span class="folder-row-path">Theory/java-app/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Theory/java-app">
              <span class="leaf-card-icon">☕</span>
              <span class="leaf-card-name">Java App</span>
              <span class="leaf-card-path">Theory/java-app</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">C APP</span>
            <span class="tag tag-blue">THEORY</span>
            <span class="folder-row-path">Theory/c-app/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Theory/c-app">
              <span class="leaf-card-icon">⚙️</span>
              <span class="leaf-card-name">C App</span>
              <span class="leaf-card-path">Theory/c-app</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">SAP-ID CHECKER</span>
            <span class="tag tag-blue">THEORY</span>
            <span class="folder-row-path">Theory/sap-id-checker/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Theory/sap-id-checker">
              <span class="leaf-card-icon">🔍</span>
              <span class="leaf-card-name">SAP-ID Checker</span>
              <span class="leaf-card-path">Theory/sap-id-checker</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">DOCKER VOLUMES</span>
            <span class="tag tag-blue">THEORY</span>
            <span class="folder-row-path">Theory/docker-volumes/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Theory/docker-volumes">
              <span class="leaf-card-icon">💾</span>
              <span class="leaf-card-name">Docker Volumes</span>
              <span class="leaf-card-path">Theory/docker-volumes</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">DOCKER NETWORKS</span>
            <span class="tag tag-blue">THEORY</span>
            <span class="folder-row-path">Theory/docker-networks/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Theory/docker-networks">
              <span class="leaf-card-icon">🌐</span>
              <span class="leaf-card-name">Docker Networks</span>
              <span class="leaf-card-path">Theory/docker-networks</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">DOCKER COMPOSE</span>
            <span class="tag tag-blue">THEORY</span>
            <span class="folder-row-path">Theory/docker-compose/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Theory/docker-compose">
              <span class="leaf-card-icon">🐳</span>
              <span class="leaf-card-name">Docker Compose</span>
              <span class="leaf-card-path">Theory/docker-compose</span>
            </a>
          </div>
        </div>
      </div>

      <!-- LAB EXPERIMENTS -->
      <div class="folder-root" id="labs">
        <div class="folder-root-header" onclick="toggleRoot(this)">
          <span class="folder-root-icon">🔬</span>
          <span class="folder-root-name">LAB EXPERIMENTS</span>
          <span class="folder-root-meta">5 EXPERIMENTS</span>
          <span class="chevron">▶</span>
        </div>
        <div class="root-children">
          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">LAB 1 — PERFORMANCE COMPARISON</span>
            <span class="tag tag-green">EXP</span>
            <span class="folder-row-path">Labs/experiment1/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Labs/experiment1/README.md">
              <span class="leaf-card-icon">📄</span>
              <span class="leaf-card-name">README.md</span>
              <span class="leaf-card-path">Labs/experiment1/README.md</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">LAB 2 — NGINX IN DOCKER</span>
            <span class="tag tag-green">EXP</span>
            <span class="folder-row-path">Labs/experiment2/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Labs/experiment2/README.md">
              <span class="leaf-card-icon">📄</span>
              <span class="leaf-card-name">README.md</span>
              <span class="leaf-card-path">Labs/experiment2/README.md</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name"
              >LAB 3 — UBUNTU LAYERS &amp; FASTAPI</span
            >
            <span class="tag tag-green">EXP</span>
            <span class="folder-row-path">Labs/experiment3/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Labs/experiment3/README.md">
              <span class="leaf-card-icon">📄</span>
              <span class="leaf-card-name">README.md</span>
              <span class="leaf-card-path">Labs/experiment3/README.md</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name">LAB 4 — DOCKER ESSENTIALS</span>
            <span class="tag tag-green">EXP</span>
            <span class="folder-row-path">Labs/experiment4/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Labs/experiment4/README.md">
              <span class="leaf-card-icon">📄</span>
              <span class="leaf-card-name">README.md</span>
              <span class="leaf-card-path">Labs/experiment4/README.md</span>
            </a>
          </div>

          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name"
              >LAB 5 — VOLUMES, ENV, MONITORING &amp; NETWORKS</span
            >
            <span class="tag tag-green">EXP</span>
            <span class="folder-row-path">Labs/experiment5/</span>
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a class="leaf-card" href="Labs/experiment5/README.md">
              <span class="leaf-card-icon">📄</span>
              <span class="leaf-card-name">README.md</span>
              <span class="leaf-card-path">Labs/experiment5/README.md</span>
            </a>
          </div>
        </div>
      </div>

      <!-- ASSIGNMENT -->
      <div class="folder-root" id="assignment">
        <div class="folder-root-header" onclick="toggleRoot(this)">
          <span class="folder-root-icon">📝</span>
          <span class="folder-root-name">ASSIGNMENT</span>
          <span class="folder-root-meta">1 SUBMISSION</span>
          <span class="chevron">▶</span>
        </div>
        <div class="root-children">
          <div class="folder-row" onclick="toggleRow(this)">
            <span>📂</span>
            <span class="folder-row-name"
              >ASSIGNMENT 1 — DOCKER WEBAPP PROJECT</span
            >
            <span class="tag tag-pink">ASGN</span>
            <span class="folder-row-path"
              >Assignments/docker-webapp-project/</span
            >
            <span class="chevron">▶</span>
          </div>
          <div class="leaf-grid">
            <a
              class="leaf-card"
              href="Assignments/docker-webapp-project/README.md"
            >
              <span class="leaf-card-icon">📄</span>
              <span class="leaf-card-name">README.md</span>
              <span class="leaf-card-path"
                >Assignments/docker-webapp-project/README.md</span
              >
            </a>
          </div>
        </div>
      </div>

      <!-- NOTES -->
      <div class="folder-root">
        <div class="folder-root-header" onclick="toggleRoot(this)">
          <span class="folder-root-icon">📌</span>
          <span class="folder-root-name">NOTES</span>
          <span class="folder-root-meta">3 NOTES</span>
          <span class="chevron">▶</span>
        </div>
        <div class="root-children">
          <div class="folder-row" style="cursor: default; pointer-events: none">
            <span>📁</span>
            <span class="folder-row-name"
              >Theory materials → <code>class/</code> directory</span
            >
          </div>
          <div class="folder-row" style="cursor: default; pointer-events: none">
            <span>🔬</span>
            <span class="folder-row-name"
              >Lab experiments → <code>lab/</code> directory</span
            >
          </div>
          <div class="folder-row" style="cursor: default; pointer-events: none">
            <span>🔗</span>
            <span class="folder-row-name"
              >Each link points to a detailed Markdown file</span
            >
          </div>
        </div>
      </div>
    </main>

    <footer>
      <span class="footer-left">SAMARTH THAKURI · SAP 500119430</span>
      <span
        style="
          font-family: &quot;Space Mono&quot;, monospace;
          font-size: 0.75rem;
          color: #888;
          letter-spacing: 1px;
        "
      >
        CONTAINERIZATION &amp; DEVOPS LAB
      </span>
    </footer>

    <script>
      function toggleRoot(el) {
        el.classList.toggle("open");
        el.nextElementSibling.classList.toggle("visible");
      }

      function toggleRow(el) {
        const siblings = el.parentElement.querySelectorAll(".folder-row.open");
        siblings.forEach((s) => {
          if (s !== el) {
            s.classList.remove("open");
            const next = s.nextElementSibling;
            if (next && next.classList.contains("leaf-grid"))
              next.classList.remove("visible");
          }
        });
        el.classList.toggle("open");
        const grid = el.nextElementSibling;
        if (grid && grid.classList.contains("leaf-grid")) {
          grid.classList.toggle("visible");
        }
      }
    </script>

  </body>
</html>
