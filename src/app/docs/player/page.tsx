"use client";

export default function PlayerPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #333" }}>
        <h1>Player System</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>Player state, inventory, clothes, playmods, and roles</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Player Struct (Core Fields)</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct Player {
    // Identity
    int netID;                    // network peer id
    int userID;                   // account id
    string userName;              // account name
    string userNick;              // display nickname
    string password_hash;         // stored password hash
    bool admin;                   // is admin (role 1)
    int role;                     // role: 1=admin, 2=dev, 3=mod, 4=sup
    bool bypass;                  // type 3 packet bypass flag
    bool logged_in;               // login completed

    // Connection
    string ip;                    // client IP
    bool isBot;                   // fakeclient flag
    int all_packets;              // flood counter
    int pps;                      // packets per second
    long long last_packet;        // ms timestamp
    int sent_packets;             // outbound count
    int sent_bytes;               // outbound bytes

    // World state
    bool in_world;                // currently in a world
    string world_name;            // joined world name
    int posX, posY;               // tile position
    float posXf, posYf;           // pixel position
    int characterState;           // animation state
    int punchX, punchY;           // punch target
    int isPunching;               // punch flag
    int isJiggle;                 // jiggle flag

    // Appearance
    vector<int> clothes;          // item ids (7 slots)
    vector<int> hats;             // extra hat ids
    int hairColor, eyeColor, skinColor;

    // Currency
    long long gems;               // normal currency
    long long world_locks;        // world lock value
    long long diamond_locks;      // diamond lock value
    long long bluegem_locks;      // blue gem lock value

    // Inventory
    vector<InventoryItem> items;  // item id + count pairs

    // Playmods (active effects)
    vector<Playmod> playmods;     // type + expiry

    // Guild
    int guildID;
    int guildRank;
    string guildName;

    // Social
    vector<int> friends;          // friend userIDs
    vector<int> ignored;          // ignored userIDs

    // Session
    long long join_time;          // login timestamp
    int item_delivery_count;      // anti-dupe
    bool sfx_enabled, bgm_enabled;  // settings
    string privacy_settings;
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Roles & Permissions</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Role</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Admin</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>All commands, /setrole, world ownership override</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Developer</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>2</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Dev items, world edit tools</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Moderator</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>3</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Mute, kick, ban, vanish</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Supporter</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>4</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Basic helper commands</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Currency System</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Currency</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Field</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Gems</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>gems</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Primary soft currency</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>World Locks</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>world_locks</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Hard currency (WL)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Diamond Locks</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>diamond_locks</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Rare currency (DL)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Blue Gem Locks</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>bluegem_locks</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>High-tier currency (BGL)</td></tr>
          </tbody>
        </table>
        <p>Currency is persisted in the player JSON and synced to the client via the OSM packet and item deliveries.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Playmods</h2>
        <p>Playmods are timed player effects applied to avatars:</p>
        <ul>
          <li><strong>Invisible:</strong> Hide player from others (command)</li>
          <li><strong>Music Note:</strong> Visual effect above head</li>
          <li><strong>Sneaking:</strong> Hide from vanish detection</li>
          <li><strong>Sleeping:</strong> Zzz effect while AFK</li>
          <li><strong>Bubble:</strong> Underwater bubble effect</li>
          <li><strong>Frozen:</strong> Stun effect (events)</li>
          <li><strong>Crystalized:</strong> Ice effect (events)</li>
        </ul>
        <p>Each playmod stores a type and expiration timestamp. The client is notified of playmod changes via <code>OnSetPlaymod</code> and the server re-sends playmods on login.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Inventory Model</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct InventoryItem {
    int itemID;
    long long count;
};

// Operations
void give_item(Player* p, int id, long long count);
bool remove_item(Player* p, int id, long long count);
bool has_item(Player* p, int id, long long count = 1);
long long item_count(Player* p, int id);

// Item delivery (sends OnItemChange packet)
void item_delivery(Player* p, int itemID, long long count, int type);`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Save & Restore</h2>
        <p>Player state is serialized to JSON on:</p>
        <ul>
          <li>Auto-save loop (every ~5 minutes)</li>
          <li>Disconnect (player_leave)</li>
          <li>Server shutdown</li>
        </ul>
        <p>On login, the JSON is loaded and all fields restored (inventory, clothes, currency, playmods, roles, settings). New accounts get default values: 0 gems, empty inventory, default appearance.</p>
      </section>
    </article>
  );
}