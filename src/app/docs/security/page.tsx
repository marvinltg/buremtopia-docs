"use client";

export default function SecurityPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
        <h1>Security & Anti-Cheat</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>Rate limiting, bypass detection, bans, and flood protection</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Security State (Server_Security)</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct Server_Security {
    int login_count = 0;            // logins this window
    long long login_time = 0;       // window start

    vector<string> ridbans;         // device RID bans
    vector<string> namebans;        // account name bans
    vector<pair<string,long long>> banned_ip_temporary;

    int update_item_data = 0;       // item delivery count

    // Restart handling
    bool restart_server_status = false;
    long long restart_timer = 0;
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Login Rate Limiting</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Window reset every 6.5 seconds
if (login_time + 6500 < now_ms()) {
    login_count = 0;
    update_item_data = 0;
    login_time = now_ms();
}

// Per-IP concurrent login cap
if (count_peers_with_same_ip(peer->ip) >= 3) {
    failed_login(peer, "Too many people logging in");
    return;
}

// Global login burst cap
if (login_count > 40) {
    failed_login(peer, "Too many people logging in");
    return;
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Packet Flood Protection</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Counter</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Limit</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>all_packets</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>560</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>enet_peer_disconnect_later</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>pps (per second)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>16</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>enet_peer_disconnect_later</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>item_delivery_count</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>15 / window</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Block item delivery (anti-dupe)</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Bypass (Type 3) Mechanism</h2>
        <p>Type 3 (Extended Text) packets require the <code>bypass</code> flag which is only set after successful login:</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// On login success:
pInfo(peer)->bypass = true;

// On packet type 3:
if (packet->type == 3 && pInfo(peer)->bypass == false) {
    // reject - prevents join_request spam pre-login
    return;
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Ban System</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Ban Type</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Key</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Storage</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Enforcement</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Name</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>userName</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>bans.json</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Login block</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>IP</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>ip</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>in-memory temp list</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Connect block</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>RID</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>rid (device)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>ridbans vector</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Login block</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Logging</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Console logging patterns
[INFO]  player connected: name (ip)
[LOGIN] user:admin logged in
[WARN]  flood detected: ip
[BAN]   banned player: name
[EVENT] event started: hide_n_seek`}</code></pre>
        <p>All security events are logged to the console for operator visibility.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Server Restart Protection</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Graceful restart: block new logins, save, shutdown
if (restart_server_status) {
    // reject new connections
    // save all worlds/players
    // broadcast "Server restarting"
    exit(0);
}`}</code></pre>
      </section>

      <section>
        <h2>Best Practices & Caveats</h2>
        <ul>
          <li>Passwords are stored hashed; never log plaintext credentials</li>
          <li>Port 80 resolver requires Administrator; avoid in production without HTTPS</li>
          <li>Type 2 login and type 3 actions should always validate lengths to prevent buffer overflows</li>
          <li>Packet counters reset per window; tune limits to player count</li>
          <li>World tile bounds always validated before array access (world edits)</li>
        </ul>
      </section>
    </article>
  );
}