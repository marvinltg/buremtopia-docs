"use client";

export default function ArchitecturePage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
        <h1>System Architecture</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>High-level overview of GTPS3 server components and data flow</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Component Diagram</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto", fontSize: "0.85rem" }}><code>{`┌─────────────────────────────────────────────────────────────────┐
│                        GTPS3 SERVER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  ENet Host   │◄─│  HTTP        │  │  Main Thread           │ │
│  │  (UDP 53181) │  │  Resolver    │  │  ┌──────────────────┐  │ │
│  │  ┌────────┐  │  │  (TCP 80)    │  │  │ Game Loop        │  │ │
│  │  │ Peer   │  │  └──────────────┘  │  │  ├─ World Updates │  │ │
│  │  │ Manager│  │                   │  │  ├─ Player Logic  │  │ │
│  │  └────────┘  │                   │  │  ├─ Events        │  │ │
│  └──────────────┘                   │  │  ├─ Save Loop     │  │ │
│         ▲                           │  │  └────────────────┘  │ │
│         │                           │  └────────────────────────┘ │
│  ┌──────────────┐                   │                               │
│  │  Packet      │                   │  ┌────────────────────────┐  │
│  │  Processor   │                   │  │ Data Stores            │  │
│  │  ┌────────┐  │                   │  │  ├─ worlds/            │  │
│  │  │ Text   │  │                   │  │  ├─ players/           │  │
│  │  │ (Type 2,3)    │                   │  │  ├─ guilds/            │  │
│  │  │ Binary │  │                   │  │  ├─ db/                │  │
│  │  │ (Type 4)    │                   │  │  └─ items.dat         │  │
│  │  └────────┘  │                   │  └────────────────────────┘  │
│  └──────────────┘                   │                               │
└─────────────────────────────────────────────────────────────────┘`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Core Modules</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>ENet Network Layer</h3>
            <ul>
              <li>UDP-based reliable/unreliable channels</li>
              <li>CRC32 checksum + Range Coder compression</li>
              <li>New Packet Protocol (14-byte header + payload)</li>
              <li>1024 max peers, 2 channels</li>
            </ul>
          </div>
          <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>Game Loop (Main Thread)</h3>
            <ul>
              <li>Single-threaded event loop</li>
              <li>ENet service with 3ms timeout</li>
              <li>World tick processing (~1450ms interval)</li>
              <li>Player state updates</li>
              <li>Scheduled events &amp; saves</li>
            </ul>
          </div>
          <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>Packet Processor</h3>
            <ul>
              <li>Text packets (type 2, 3): dialog, chat, commands</li>
              <li>Binary packets (type 4): movement, actions</li>
              <li>gamepacket_t builder system</li>
              <li>PlayerMoving struct serialization</li>
            </ul>
          </div>
          <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>HTTP Resolver</h3>
            <ul>
              <li>TCP server on port 80</li>
              <li>Returns server_data.php format</li>
              <li>Requires Admin privileges</li>
              <li>Thread detached from main loop</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Data Flow</h2>
        <ol>
          <li><strong>Client Connect</strong> → ENet CONNECT event → allocate Player struct → send welcome</li>
          <li><strong>Login</strong> → Type 2/3 packet with tankIDName/tankIDPass → player_login() → validate → send OSM</li>
          <li><strong>World Entry</strong> → join_request → load world JSON → send world data → spawn player</li>
          <li><strong>Gameplay</strong> → Type 4 binary packets → unpack PlayerMoving → process action → broadcast</li>
          <li><strong>Save</strong> → Periodic (5 min) + on disconnect → serialize to JSON</li>
        </ol>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Threading Model</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Thread</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Purpose</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Sync</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}><strong>Main</strong></td>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>ENet service, game logic, world updates, player processing</td>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Single-threaded</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}><strong>Resolver</strong></td>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>HTTP server on port 80</td>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Detached, read-only access</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}><strong>Auto-save</strong></td>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Periodic world/player saves</td>
              <td style={{ padding: "0.75rem", border: "1px solid #eee" }}>f_saving_ flag</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Key Global State</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Network
ENetHost* server;                    // ENet server instance
int server_port = 53181;             // UDP port

// Game State
vector<World> worlds;                // All loaded worlds
vector<ItemDB> items;                // Item database from items.dat
vector<Guild> guilds;                // Guild system

// Security
struct Server_Security {
    int login_count = 0;
    long long login_time = 0;
    vector<string> ridbans;
    vector<pair<string, long long>> banned_ip_temporary;
    bool restart_server_status = false;
    // ...
} Server_Security;

// Events
struct Hide_N_Seek { ... };
struct Crypto_Update { ... };
struct World_Stuff { ... };`}</code></pre>
      </section>
    </article>
  );
}