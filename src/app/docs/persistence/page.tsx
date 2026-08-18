"use client";

export default function PersistencePage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #333" }}>
        <h1>Data Persistence</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>JSON storage, world save, player save, and file structure</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Storage Overview</h2>
        <p>The server uses plain JSON files for all persistent state. No external database is required.</p>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`base-gt3/
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
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`{
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
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Trigger</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Data Saved</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Guard</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Auto-save timer</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>All worlds + players</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>f_saving_ flag prevents re-entry</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Disconnect</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Player data + world</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>-</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>World change</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Player position</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>-</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Server shutdown</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Everything</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Graceful flag</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Guild update</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Guild data</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>-</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Save Loop</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Main loop save check
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
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>File</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>bans.json</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Permanent + temporary bans (by name, IP, RID)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>reports.json</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Player reports for moderation</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>settings.json</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Global server settings, event schedules</td></tr>
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