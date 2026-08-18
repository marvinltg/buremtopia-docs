"use client";

export default function LoginPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
        <h1>Login Flow & Authentication</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>Complete sequence from ENet connect to world entry</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Sequence Diagram</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto", fontSize: "0.85rem" }}><code>{`Client                          Server
  |                                |
  +- ENet Connect ---------------->|  CONNECT event
  |                                |  allocate Player*
  |<- Welcome (type 1) ------------|  send_(peer, 1, ...)
  |                                |
  +- Login Packet (type 2) ------->|  tankIDName|user
  |   protocol|225                 |  tankIDPass|pass
  |   game_version|5.53            |  requestedName|
  |   fz|...                       |  f|1
  |   klv|...                      |  protocol|225
  |   hash|...                     |  game_version|5.53
  |   mac|...                      |  fz|23314424
  |   rid|...                      |  klv|037fbb...
  |                                |  hash|466084983
  |                                |  mac|9c:12:21:08:xx:xx:xx
  |                                |  country|us
  |                                |  RTENDMARKERBS1001
  |                                |
  |<- OnSuperMainStart (OSM) ------|  Type 4 binary
  |   (world list, user data,      |  NetID, userID,
  |    items, currency, etc.)      |  skin, clothes,
  |                                |  currency, etc.
  |                                |
  +- Join Request (type 3) ------->|  action|join_request
  |   action|join_request|WORLD    |  WORLD_NAME
  |                                |
  |<- World Data ------------------|  Type 4 packets
  |   - World blocks               |  - World header
  |   - Player spawn               |  - Tile data
  |   - Other players              |  - Player spawns
  |                                |
  |<- OnConsoleMessage ------------|  "Welcome to WORLD"
  |                                |
  +- Gameplay begins ------------->|  Type 4 binary packets`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Login Packet Fields</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Field</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Example</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>tankIDName</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>MyUsername</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Account username</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>tankIDPass</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>MyPassword</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Account password (plaintext)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>requestedName</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>""</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Name change request (usually empty)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>f</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Platform flag</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>protocol</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>225</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Protocol version (must match server)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>game_version</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>5.53</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Client game version</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>fz</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>23314424</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Fingerprint/hash</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>klv</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>037fbb624f...</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Key lineage value (64-char hex)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>hash</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>466084983</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Account hash</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>mac</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>9c:12:21:08:xx:xx:xx</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>MAC address</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>rid</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>026F4146...</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Device RID (32-char hex)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>country</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>us</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Country code</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>platformID</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0,1,1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Platform identifiers</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>OnSuperMainStart (OSM) Response</h2>
        <p>The OSM is the critical response packet sent after successful authentication. It contains all data needed for the client to begin gameplay:</p>
        <ul>
          <li><strong>Player identity:</strong> NetID, userID, skin, clothes, colors</li>
          <li><strong>Currency:</strong> Gems, World Locks, Diamond Locks, Blue Gem Locks</li>
          <li><strong>Inventory:</strong> Full item list with counts</li>
          <li><strong>World list:</strong> Available worlds, last world</li>
          <li><strong>Social:</strong> Friends list, ignored players</li>
          <li><strong>Flags:</strong> VIP, moderator, supporter, roles</li>
          <li><strong>Playmods:</strong> Active effects with timers</li>
          <li><strong>Settings:</strong> Audio, graphics, privacy</li>
        </ul>
        <p>The OSM is a type 4 binary packet built via <code>gamepacket_t</code> with structured serialization.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Server-Side Processing</h2>
        <h3>Rate Limiting</h3>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Reset counters every 6.5 seconds
if (Server_Security.login_time + 6500 < now_ms()) {
    Server_Security.login_count = 0;
    Server_Security.update_item_data = 0;
    Server_Security.login_time = now_ms();
}

// Limit concurrent logins per IP
int logged = count_peers_with_same_ip(peer->ip);
if (logged >= 3 || Server_Security.login_count > 40) {
    failed_login(peer, "Too many people logging in");
    return;
}

Server_Security.login_count++;`}</code></pre>

        <h3>Authentication</h3>
        <ol>
          <li>Parse login packet fields</li>
          <li>Check RID bans (<code>Server_Security.ridbans</code>)</li>
          <li>Load player JSON from <code>players/{"{name}"}_.json</code></li>
          <li>Verify password hash</li>
          <li>Load inventory, clothes, currency, flags</li>
          <li>Apply playmods, check expirations</li>
          <li>Build and send OSM response</li>
          <li>Set <code>pInfo(peer)-&gt;bypass = true</code> for type 3 packets</li>
        </ol>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Join Request & World Entry</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Client sends (type 3):
action|join_request|WORLD_NAME

// Server processes:
1. Load world (get_world) - creates or loads from JSON
2. Send world header (size, weather, locks, etc.)
3. Send tile data (PackBlockType for each tile)
4. Send player spawn (OnSpawn with NetID, position, clothes)
5. Send other players in world (OnSpawn for each)
6. Send OnConsoleMessage "Welcome to WORLD_NAME"`}</code></pre>
      </section>

      <section>
        <h2>Load Testing Tool</h2>
        <p>A bundled test tool simulates 60 concurrent clients:</p>
        <ul>
          <li>Generates unique names: <code>faker{"{id}"}_{"{timestamp}"}</code></li>
          <li>Sends login packet with all required fields</li>
          <li>Waits for <code>OnSuperMainStart</code> detection</li>
          <li>Sends <code>action|join_request|START</code></li>
          <li>Logs connection metrics (connected, login sent, OSM received, join sent)</li>
        </ul>
        <p>Useful for load testing and protocol debugging.</p>
      </section>
    </article>
  );
}