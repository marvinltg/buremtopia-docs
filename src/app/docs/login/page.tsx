const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);
const TableIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

export default function LoginPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Networking
        </div>
        <h1>Login <span>Flow</span></h1>
        <p className="page-desc">
          Step-by-step breakdown of how a Growtopia client authenticates with buremtopia,
          from initial ENet connect to world entry.
        </p>
      </div>

      <div className="content-body">
        <div className="card">
          <h2><MapIcon /> Overview</h2>
          <p>
            The Growtopia login sequence involves two systems: the <strong>HTTP Resolver</strong>
            (provides the server address) and the <strong>ENet handshake</strong> (authenticates
            the player).
          </p>
          <div className="alert alert-info">
            <InfoIcon />
            <span>
              The client first fetches the server IP/port from the HTTP resolver, then opens an
              ENet connection to that address. All packet exchange happens over ENet.
            </span>
          </div>
        </div>

        <div className="card">
          <h2><RefreshIcon /> Handshake Sequence</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>HTTP Resolver Request</h4>
                <p>
                  Client POSTs to <code>/growtopia/server_data.php</code>. buremtopia responds
                  with the ENet server IP, port, and type.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>ENet Connect</h4>
                <p>
                  Client opens UDP connection. buremtopia receives
                  <code>ENET_EVENT_TYPE_CONNECT</code> and adds the peer to the peer map.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Hello Packet (type 1)</h4>
                <p>
                  Client sends an empty Hello packet. buremtopia responds with a
                  <code>TextParse</code> containing <code>action|hello</code> and server info.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>Login Request</h4>
                <p>
                  Client sends <code>action|login</code> TextParse with credentials:
                  <code>tankIDName</code>, <code>tankIDPass</code>, <code>requestedName</code>,
                  game version, and platform.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">5</div>
              <div className="step-content">
                <h4>Authentication</h4>
                <p>
                  buremtopia validates credentials. On success, a player session is created
                  and a world selection packet is sent.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">6</div>
              <div className="step-content">
                <h4>World Entry</h4>
                <p>
                  Server sends a <code>GameUpdatePacket</code> with world data.
                  Player is now in-game.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2><TableIcon /> Login Packet Fields</h2>
          <table className="packet-table">
            <thead>
              <tr><th>Key</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>tankIDName</code></td><td>string</td><td>Player username (empty for guest)</td></tr>
              <tr><td><code>tankIDPass</code></td><td>string</td><td>Password hash (GrowID) or empty</td></tr>
              <tr><td><code>requestedName</code></td><td>string</td><td>Guest name requested</td></tr>
              <tr><td><code>f</code></td><td>string</td><td>Platform identifier (<code>0</code> = PC)</td></tr>
              <tr><td><code>protocol</code></td><td>integer</td><td>ENet protocol version (should be <code>209</code>)</td></tr>
              <tr><td><code>game_version</code></td><td>string</td><td>Client version string</td></tr>
              <tr><td><code>country</code></td><td>string</td><td>2-letter country code from client</td></tr>
            </tbody>
          </table>
          <div className="alert alert-success" style={{ marginTop: '14px' }}>
            <CheckIcon />
            <span>
              buremtopia supports both <strong>GrowID</strong> (hashed password) and
              <strong>Guest</strong> login modes. Guest mode is the simplest way to test
              connectivity without setting up an account database.
            </span>
          </div>
        </div>

        <div className="card">
          <h2><CodeIcon /> Handling in Code</h2>
          <pre>
            <span className="pre-label">C++</span>
            <code>{`void PacketHandler::on_login(ENetPeer* peer, TextParse& tp) {
    auto name = tp.get("tankIDName");
    auto pass = tp.get("tankIDPass");

    if (name.empty()) {
        name = tp.get("requestedName");
        if (!is_valid_name(name)) {
            send_log(peer, "Invalid name.");
            return;
        }
    } else {
        if (!auth_.verify(name, pass)) {
            send_log(peer, "Wrong password.");
            enet_peer_disconnect_later(peer, 0);
            return;
        }
    }

    sessions_[peer->connectID] = PlayerSession{ name };
    send_world_select(peer);
}`}</code>
          </pre>
        </div>

        <footer className="footer">// buremtopia Documentation · Login Flow</footer>
      </div>
    </>
  );
}