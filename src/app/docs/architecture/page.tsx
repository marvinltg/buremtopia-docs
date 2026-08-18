const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const LayoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);
const ThreadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

export default function ArchitecturePage() {
  return (
    <>
      <div className="page-header">
        <div className="page-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
          </svg>
          Core Concepts
        </div>
        <h1>Server <span>Architecture</span></h1>
        <p className="page-desc">
          High-level overview of buremtopia — module structure, event loop design,
          and the threading model.
        </p>
      </div>

      <div className="content-body">
        <div className="card">
          <h2><LayoutIcon /> Design Philosophy</h2>
          <p>
            buremtopia is built around a <strong>single-threaded event loop</strong> per network host,
            with clean separation between the networking layer (ENet), the game logic layer,
            and the scripting layer (Lua). The goal is minimal coupling and maximum testability.
          </p>
          <ul className="doc-list">
            <li><strong>ENet Host</strong> — Manages all peer connections and raw packet I/O</li>
            <li><strong>Packet Dispatcher</strong> — Decodes binary packets and routes to handlers</li>
            <li><strong>Lua Runtime</strong> — Executes scripts registered for packet types or events</li>
          </ul>
        </div>

        <div className="card">
          <h2><FolderIcon /> Module Layout</h2>
          <p>The project follows a layered directory structure:</p>
          <pre>
            <span className="pre-label">tree</span>
            <code>{`src/
├── core/
│   ├── Server.cpp        # Main server loop
│   ├── PacketHandler.cpp # Routes packet types to handlers
│   └── EventBus.cpp      # Publish/subscribe for internal events
├── network/
│   ├── ENetHost.cpp      # ENet host/peer lifecycle wrapper
│   ├── ByteStream.cpp    # Binary read/write helper
│   └── Packet.cpp        # GameUpdatePacket & TextParse types
├── scripting/
│   ├── LuaRuntime.cpp    # sol2 state and script loader
│   ├── LuaPacketAPI.cpp  # Lua bindings for packet access
│   └── Scheduler.cpp     # Periodic & deferred task runner
├── http/
│   └── Resolver.cpp      # cpp-httplib login resolver
└── config/
    └── Config.cpp        # JSON config loader`}</code>
          </pre>
        </div>

        <div className="card">
          <h2><RefreshIcon /> Event Loop</h2>
          <p>
            The main loop polls ENet at a configurable tick rate (default <code>16 ms</code>).
            Each poll drains all pending network events before yielding to the scheduler.
          </p>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>ENet Poll</h4>
                <p><code>enet_host_service()</code> blocks for up to the tick interval, returning events.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Event Dispatch</h4>
                <p>CONNECT/DISCONNECT events update the peer map; RECEIVE events go to PacketHandler.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Packet Decode</h4>
                <p>PacketHandler reads the type header and calls the registered C++ or Lua handler.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>Scheduler Tick</h4>
                <p>Pending timers and deferred Lua tasks are executed after network events drain.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2><ThreadIcon /> Threading Model</h2>
          <p>
            buremtopia intentionally avoids multi-threading on the hot path to eliminate lock
            contention. The HTTP resolver runs on a separate thread managed by
            <code>cpp-httplib</code>, but all ENet and Lua execution happens on the main thread.
          </p>
          <div className="alert alert-warn">
            <WarnIcon />
            <span>
              Never call ENet or Lua APIs from the HTTP thread. Use a thread-safe queue to
              post events back to the main event loop.
            </span>
          </div>
        </div>

        <footer className="footer">// buremtopia Documentation · Server Architecture</footer>
      </div>
    </>
  );
}