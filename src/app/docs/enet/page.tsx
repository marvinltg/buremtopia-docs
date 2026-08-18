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
const RadioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14" />
  </svg>
);
const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function EnetPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
          Networking
        </div>
        <h1>ENet <span>Connection</span></h1>
        <p className="page-desc">
          How buremtopia uses ENet to manage reliable UDP peers, channel multiplexing,
          connection lifecycle, and packet transmission.
        </p>
      </div>

      <div className="content-body">
        <div className="card">
          <h2><RadioIcon /> What is ENet?</h2>
          <p>
            <strong>ENet</strong> is a thin reliability layer on top of UDP, providing ordered
            delivery, packet fragmentation, and optional reliability per-channel. Growtopia uses
            ENet natively, so buremtopia can talk directly to unmodified game clients.
          </p>
          <ul className="doc-list">
            <li><span className="tag tag-blue">Reliable</span> — Guaranteed delivery with retransmission</li>
            <li><span className="tag tag-yellow">Unreliable</span> — Fire-and-forget, low latency</li>
            <li><span className="tag tag-purple">Sequenced</span> — Ordered but not guaranteed delivery</li>
          </ul>
        </div>

        <div className="card">
          <h2><ServerIcon /> Host Initialization</h2>
          <p>
            The server creates a single <code>ENetHost</code> bound to a configurable port
            (default <code>17091</code>). Peer limits and bandwidth caps come from the JSON config.
          </p>
          <pre>
            <span className="pre-label">C++</span>
            <code>{`ENetAddress address{};
address.host = ENET_HOST_ANY;
address.port = config.port;          // default: 17091

host_ = enet_host_create(
    &address,
    config.max_peers,                // default: 1024
    2,                               // channel count
    0, 0                             // no bandwidth limits
);

if (!host_) throw std::runtime_error("ENet host creation failed");`}</code>
          </pre>
        </div>

        <div className="card">
          <h2><RadioIcon /> Channel Layout</h2>
          <p>buremtopia uses <strong>2 ENet channels</strong>, matching Growtopia's own usage:</p>
          <table className="packet-table">
            <thead>
              <tr>
                <th>Channel</th><th>ID</th><th>Delivery</th><th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Game</td>
                <td><code>0</code></td>
                <td><span className="tag tag-blue">Reliable</span></td>
                <td>GameUpdatePackets, TextParse, login packets</td>
              </tr>
              <tr>
                <td>World</td>
                <td><code>1</code></td>
                <td><span className="tag tag-yellow">Unreliable</span></td>
                <td>World tile updates, movement, bulk data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2><RefreshIcon /> Peer Lifecycle</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>CONNECT event</h4>
                <p>A new <code>ENetPeer*</code> is inserted into the peer map. A Lua <code>on_connect</code> event fires.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>RECEIVE event</h4>
                <p>Raw <code>ENetPacket</code> data is wrapped in a <code>ByteStream</code> and dispatched to PacketHandler.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>DISCONNECT event</h4>
                <p>Peer is removed from the map, session data cleaned up, and <code>on_disconnect</code> fires.</p>
              </div>
            </div>
          </div>
          <div className="alert alert-info">
            <InfoIcon />
            <span>
              Always call <code>enet_peer_reset()</code> rather than <code>enet_peer_disconnect()</code>
              when the client is in an invalid state, to avoid the graceful disconnect timeout.
            </span>
          </div>
        </div>

        <div className="card">
          <h2><SendIcon /> Sending Packets</h2>
          <pre>
            <span className="pre-label">C++</span>
            <code>{`auto data = packet.serialize();

ENetPacket* ep = enet_packet_create(
    data.data(),
    data.size(),
    ENET_PACKET_FLAG_RELIABLE
);

enet_peer_send(peer, /*channel=*/0, ep);
enet_host_flush(host_);  // optional: force immediate send`}</code>
          </pre>
        </div>

        <footer className="footer">// buremtopia Documentation · ENet Connection</footer>
      </div>
    </>
  );
}