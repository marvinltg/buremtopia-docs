/* ── Inline SVG helpers (reused across pages) ── */
const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const Github = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Cpu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);
const Package = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const Lock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const Globe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="page-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          Documentation
        </div>
        <h1>GTPS<span>3</span></h1>
        <p className="page-desc">
          Technical documentation for buremtopia — a high-performance Growtopia Private Server
          written in <strong>C++23</strong>, powered by ENet UDP networking and a Lua scripting engine.
        </p>
      </div>

      <div className="content-body">
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">C++23</div>
            <div className="stat-label">Language</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">ENet</div>
            <div className="stat-label">Networking</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">Lua</div>
            <div className="stat-label">Scripting</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">UDP</div>
            <div className="stat-label">Protocol</div>
          </div>
        </div>

        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">Private Server Implementation</div>
          <h1>Build your own<br /><span>Growtopia</span><br />server.</h1>
          <p className="hero-desc">
            buremtopia is a clean, modular foundation for custom Growtopia server experiences.
            Fully scriptable, fully documented, fully open.
          </p>
          <div className="hero-actions">
            <a href="/docs/architecture" className="btn btn-primary">
              <ArrowRight /> Get Started
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Github /> View on GitHub
            </a>
          </div>
        </div>

        {/* Browse */}
        <div className="card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
            Browse Documentation
          </h2>
          <div className="feature-grid">
            <a href="/docs/architecture" className="feature-card">
              <div className="feature-card-icon"><Cpu /></div>
              <h3>Architecture</h3>
              <p>Server design, threading model, and module layout.</p>
            </a>
            <a href="/docs/enet" className="feature-card">
              <div className="feature-card-icon"><LinkIcon /></div>
              <h3>ENet Connection</h3>
              <p>Reliable UDP peers, channels, and event handling.</p>
            </a>
            <a href="/docs/packets" className="feature-card">
              <div className="feature-card-icon"><Package /></div>
              <h3>Packet System</h3>
              <p>Binary encoding, GameUpdatePacket, ByteStream.</p>
            </a>
            <a href="/docs/login" className="feature-card">
              <div className="feature-card-icon"><Lock /></div>
              <h3>Login Flow</h3>
              <p>Authentication handshake between client and server.</p>
            </a>
            <a href="/docs/http" className="feature-card">
              <div className="feature-card-icon"><Globe /></div>
              <h3>HTTP Resolver</h3>
              <p>Embedded HTTP server for client redirect requests.</p>
            </a>
          </div>
        </div>

        {/* Stack */}
        <div className="card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
            Technology Stack
          </h2>
          <ul className="doc-list">
            <li><strong>C++23</strong> — Modern standard with ranges, structured bindings, concepts</li>
            <li><strong>ENet 1.3.x</strong> — Reliable UDP networking library (used by Growtopia itself)</li>
            <li><strong>sol2 / Lua 5.4</strong> — High-level Lua bindings for server scripting</li>
            <li><strong>cpp-httplib</strong> — Lightweight embedded HTTP/HTTPS server</li>
            <li><strong>nlohmann/json</strong> — JSON configuration and data serialization</li>
            <li><strong>Conan 2 + CMake</strong> — Package management and build system</li>
            <li><strong>Google Test</strong> — Unit testing for packet serialization and core logic</li>
          </ul>
          <div className="alert alert-info" style={{ marginTop: '14px' }}>
            <InfoIcon />
            <span>
              buremtopia is for educational and research purposes. Comply with Ubisoft's terms of service.
            </span>
          </div>
        </div>

        <footer className="footer">// buremtopia Documentation · MIT License</footer>
      </div>
    </>
  );
}
