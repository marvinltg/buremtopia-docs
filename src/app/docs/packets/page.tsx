const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const GamepadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="8" width="20" height="12" rx="2" />
  </svg>
);
const TypeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

export default function PacketsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Core Concepts
        </div>
        <h1>Packet <span>System</span></h1>
        <p className="page-desc">
          How buremtopia encodes and decodes Growtopia's binary packet format — including
          GameUpdatePacket, TextParse strings, and the ByteStream helper.
        </p>
      </div>

      <div className="content-body">
        <div className="card">
          <h2><ListIcon /> Packet Types</h2>
          <p>
            Every packet starts with a 4-byte <strong>type field</strong> that determines
            how the rest of the payload is parsed:
          </p>
          <table className="packet-table">
            <thead>
              <tr><th>Type ID</th><th>Name</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>1</code></td>
                <td><span className="tag tag-yellow">Hello</span></td>
                <td>First packet sent by client on connect — no payload</td>
              </tr>
              <tr>
                <td><code>2</code></td>
                <td><span className="tag tag-blue">TextParse</span></td>
                <td>Key-value string packet (login info, game messages)</td>
              </tr>
              <tr>
                <td><code>3</code></td>
                <td><span className="tag tag-green">GameUpdate</span></td>
                <td>Binary GameUpdatePacket — world state, movement, actions</td>
              </tr>
              <tr>
                <td><code>4</code></td>
                <td><span className="tag tag-purple">RawText</span></td>
                <td>Plain chat or command string from client</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2><DatabaseIcon /> ByteStream</h2>
          <p>
            <code>ByteStream</code> is a cursor-based reader/writer wrapping
            <code>std::vector&lt;uint8_t&gt;</code>. It handles endianness and bounds checking
            so packet parsers don't need manual pointer arithmetic.
          </p>
          <pre>
            <span className="pre-label">C++</span>
            <code>{`ByteStream stream{ raw_data, raw_len };

uint32_t type  = stream.read<uint32_t>();   // reads 4 bytes LE
uint8_t  flags = stream.read<uint8_t>();

// Writing
ByteStream out;
out.write<uint32_t>(3);          // packet type: GameUpdate
out.write<uint8_t>(flags);
out.write_string(player_name);  // 2-byte len prefix + UTF-8`}</code>
          </pre>
          <div className="alert alert-warn">
            <WarnIcon />
            <span>
              <code>ByteStream</code> takes a <em>view</em> of the ENet packet buffer.
              Do not free the ENetPacket before finishing all reads on the stream.
            </span>
          </div>
        </div>

        <div className="card">
          <h2><GamepadIcon /> GameUpdatePacket</h2>
          <p>
            The GameUpdatePacket (type <code>3</code>) has a fixed 56-byte header followed
            by an optional variable-length extra data blob.
          </p>
          <h3>Header Fields</h3>
          <table className="packet-table">
            <thead>
              <tr><th>Offset</th><th>Size</th><th>Field</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>0</code></td><td>4B</td><td>type</td><td>Always <code>3</code></td></tr>
              <tr><td><code>4</code></td><td>1B</td><td>packet_type</td><td>Enum: move, punch, place…</td></tr>
              <tr><td><code>5</code></td><td>1B</td><td>flags</td><td>Bitmask of packet options</td></tr>
              <tr><td><code>8</code></td><td>4B</td><td>value</td><td>General-purpose value field</td></tr>
              <tr><td><code>12</code></td><td>4B</td><td>net_id</td><td>Player net ID (sender)</td></tr>
              <tr><td><code>16</code></td><td>4B</td><td>target_net_id</td><td>Target entity net ID</td></tr>
              <tr><td><code>20</code></td><td>4B</td><td>item_id</td><td>Item being used/placed</td></tr>
              <tr><td><code>24</code></td><td>4B</td><td>x</td><td>World tile X position</td></tr>
              <tr><td><code>28</code></td><td>4B</td><td>y</td><td>World tile Y position</td></tr>
              <tr><td><code>48</code></td><td>4B</td><td>extra_data_size</td><td>Bytes of extra data following header</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2><TypeIcon /> TextParse Format</h2>
          <p>
            <strong>TextParse</strong> is Growtopia's key-value encoding for game messages and
            login packets — newline-delimited, pipe-separated.
          </p>
          <pre>
            <span className="pre-label">TextParse</span>
            <code>{`action|log
message|Hello, World!

action|set_url
url|growtopia1.ubisoft.com`}</code>
          </pre>
          <pre>
            <span className="pre-label">C++</span>
            <code>{`TextParse tp{};
tp.set("action", "log");
tp.set("message", "Welcome!");
peer_send_text(peer, tp.serialize());`}</code>
          </pre>
        </div>

        <footer className="footer">// buremtopia Documentation · Packet System</footer>
      </div>
    </>
  );
}