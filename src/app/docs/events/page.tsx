"use client";

export default function EventsPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #333" }}>
        <h1>Game Events</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>Hide & Seek, Beach Party, Crypto, Daily Quests, and timers</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Event System Overview</h2>
        <p>GTPS3 supports several scheduled in-game events. Each has global state, timer configuration, and world integration. Events are triggered from the main loop based on time thresholds.</p>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct EventManager {
    // Hide & Seek
    struct {
        bool active;
        long long start_time;
        long long duration;
        string world_name;
        int seeker_netid;
        int countdown;
    } hide_n_seek;

    // Beach Party
    struct {
        bool active;
        long long start_time;
        long long duration;
        string world_name;
        vector<int> rewards;
    } beach_party;

    // Crypto
    struct {
        bool active;
        int price;            // current crypto value
        long long last_fetch; // HTTP refresh
        bool prices_changed;
    } crypto;

    // Daily Quests
    struct {
        vector<Quest> quests; // per-player quest state
        long long reset_time;
    } daily_quests;

    // Timers
    long long next_event_check;
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Hide & Seek Event</h2>
        <h3>Rules</h3>
        <ol>
          <li>Event runs in a dedicated world</li>
          <li>One player is the "seeker"; others hide</li>
          <li>Seeker counts down, then searches</li>
          <li>Found players become seekers too</li>
          <li>Last hider wins rewards</li>
        </ol>
        <h3>Flow</h3>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Start
start_hide_n_seek();
  - pick event world
  - teleport players
  - pick seeker
  - announce rules

// Tick
process_hide_n_seek_tick();
  - check countdown (seeker frozen during count)
  - check catches (seeker near hider)
  - handle caught hider -> becomes seeker
  - check timer expiry

// End
end_hide_n_seek();
  - award gems/locks to winners
  - teleport back to spawn
  - broadcast results`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Beach Party Event</h2>
        <ul>
          <li>Scheduled festival in a beach world</li>
          <li>Players gather, dance, socialize</li>
          <li>Rewards granted for participation</li>
          <li>Special blocks/items spawn during event</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Crypto Price Update</h2>
        <p>The server fetches crypto prices over HTTP and displays them in-game:</p>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Periodic HTTP fetch
void update_crypto_prices() {
    if (now_ms() - crypto.last_fetch < CYCLE) return;

    string body = http_get(crypto_api_url);
    auto json = nlohmann::json::parse(body);
    crypto.price = json["price"];
    crypto.prices_changed = true;
    crypto.last_fetch = now_ms();
}

// Broadcast to players
if (crypto.prices_changed) {
    send_crypto_update_all();   // updates in-game board
    crypto.prices_changed = false;
}`}</code></pre>
        <p>Prices integrate with in-world boards and trading mechanics.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Daily Quests</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct Quest {
    int questID;
    string title;
    string description;
    int target;        // required amount
    int progress;      // current progress
    int reward_item;   // reward item id
    int reward_count;
    bool completed;
    long long reset_time;   // daily reset
};

// Daily reset check
if (now_ms() >= quest.reset_time) {
    quest.progress = 0;
    quest.completed = false;
    quest.reset_time = now_ms() + 24h;
    send_quest_update(player);
}`}</code></pre>
        <p>Quests track actions like placing blocks, breaking blocks, chatting, trading, and visiting worlds.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Timer Configuration</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Timer</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Interval</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Event Check</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>30s</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Scan scheduled event triggers</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>World Tick</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>~1.45s</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>NPCs, machines, crops</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Crypto Fetch</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>configurable</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>HTTP price refresh</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Auto-Save</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>~5 min</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Persist worlds/players</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Event Announcements</h2>
        <p>All event transitions broadcast to players:</p>
        <ul>
          <li>Start/end announcements via <code>OnConsoleMessage</code></li>
          <li>Countdowns via periodic messages</li>
          <li>Reward deliveries via item delivery system</li>
          <li>Teleportation handled through world entry/exit</li>
        </ul>
      </section>
    </article>
  );
}