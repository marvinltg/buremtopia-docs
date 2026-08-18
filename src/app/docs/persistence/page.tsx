"use client";

export default function PersistencePage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
        <h1>Data Persistence</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>JSON storage, world save, player save, and file structure</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Storage Overview</h2>
        <p>The server uses plain JSON files for all persistent state. No external database is required.</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`base-gt3/
├── gtps3.exe              # server binary
├── items.dat              # item database
├── worlds/
│   ├── START_.json        # world data
│   ├── FARM_.json
│   └── ...                # {NAME}_.json per world
├── players/
│   ├── admin_.json        # player data
│   ├── user123_.json
│   └── ...                # {name}_.json per player
├── guilds/
│   └── {guildID}.json     # guild data
└── db/
    ├── bans.json          # server bans
    ├── reports.json       # player reports
    └── settings.json      # global settings`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Player Save Format</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`{
  "userName": "admin",
  "userID": 12345,
  "password_hash": "...",
  "admin": true,
  "role": 1,
  "gems": 1000000,
  "world_locks": 500,
  "diamond_locks": 10,
  "bluegem_locks": 0,
  "items": [
    { "id": 18, "count": 100 },
    { "id": 242, "count": 5 }
  ],
  "clothes": [18, 224, 240, 260, 0, 0, 0],
  "hairColor": 0,
  "eyeColor": 0,
  "skinColor": 0,
  "guildID": 1,
  "guildRank": 3,
  "playmods": [],
  "friends": [],
  "ignored": [],
  "settings": {
    "sfx": true,
    "bgm": true
  }
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Save Triggers</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Trigger</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Data Saved</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Guard</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Auto-save timer</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>All worlds + players</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>f_saving_ flag prevents re-entry</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Disconnect</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Player data + world</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>-</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>World change</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Player position</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>-</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Server shutdown</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Everything</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Graceful flag</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Guild update</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Guild data</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>-</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Save Loop</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Main loop save check
void auto_save_loop() {
    if (f_saving_) return;      // avoid re-entrant save
    f_saving_ = true;

    for (World& w : worlds)
        if (w.modified) save_world(w);

    for (auto& p : all_players)
        if (p.modified) save_player(p);

    save_guilds();
    f_saving_ = false;
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Serialization Libraries</h2>
        <ul>
          <li><strong>nlohmann/json</strong> - primary JSON parser/serializer (modern C++, header-only)</li>
          <li><strong>RapidJSON</strong> - high-performance JSON for bulk world data</li>
          <li><strong>proton/rtparam</strong> - parameter parser for text packets</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Database Files (db/)</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>File</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>bans.json</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Permanent + temporary bans (by name, IP, RID)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>reports.json</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Player reports for moderation</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>settings.json</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Global server settings, event schedules</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>items.dat</h2>
        <p>The item database file is loaded once at startup into the global <code>items</code> vector. Format is a compact binary/text record set containing every ItemDB field. Item data is also sent to clients via <code>OnSendItemDatabaseData</code>.</p>
      </section>
    </article>
  );
}