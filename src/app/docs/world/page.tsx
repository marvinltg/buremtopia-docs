"use client";

export default function WorldPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #333" }}>
        <h1>World System</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>World loading, blocks, machines, NPCs, and world persistence</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>World Struct</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct World {
    string name;                 // world name (uppercase)
    string owner;                // owner account name
    bool is_lock;                // requires world lock
    bool is_public;              // visible in world list
    bool is_restricted;          // access-list world
    vector<string> access_list;  // allowed names
    vector<string> banned;       // banned from world

    int width;                   // tiles (max 100)
    int height;                  // tiles (max 100)
    int gravity;                 // tile gravity effect
    int background;              // bg color id
    int weather;                 // weather id
    vector<int> front;           // front tile layers [w*h]
    vector<int> background_tiles;// back layers [w*h]
    vector<int> foreground;      // object layer [w*h]
    vector<int> extra;           // extra data per tile
    vector<int> flags;           // per-tile flags
    vector<int> parents;         // tile parent ids
    vector<string> tile_strings; // per-tile strings
    vector<int> tile_damage;     // HP for breakables

    // Data
    vector<int> world_data;      // lock positions, drop seeds
    vector<int> world_owners;    // owner flags
    vector<int> seed_data;       // planted trees

    // Machines (tomorrow machines, etc.)
    vector<Machine> machines;

    // NPCs
    vector<NPC> npcs;

    // Players currently inside
    vector<ENetPeer*> players;

    // Timers
    long long last_update;       // last tick
    int update_interval;         // tick cadence
    int save_interval;           // auto-save cadence
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>World Loading</h2>
        <ol>
          <li><strong>get_world(name)</strong> - lookup loaded world; if absent, load from disk</li>
          <li><strong>Load JSON</strong> from the worlds folder: <code>{"{name}"}_.json</code></li>
          <li><strong>Default world</strong> - if missing, create 100x100 empty world with default background</li>
          <li><strong>Parse layers</strong> - front, background_tiles, foreground (objects)</li>
          <li><strong>Restore data</strong> - locks, weather, NPCs, machines, access list</li>
        </ol>
        <p><strong>Note:</strong> New worlds default to 100x100 tiles. World file naming uses the format <code>{"{name}"}_.json</code> (uppercase name + trailing underscore).</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Tile Layer Model</h2>
        <p>Each world maintains four parallel arrays indexed by <code>y * width + x</code>:</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Layer</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>front</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Physical blocks (walls, floors, main blocks)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>background_tiles</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Background objects (back walls, windows)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>foreground</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Foreground items (trees, seeds, signs)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>flags / parents</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Tile metadata and linkage</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Block Placement & Break</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Placement flow (from type 4 action handler)
1. Validate tile bounds (0 <= x < width, 0 <= y < height)
2. Check permissions (owner / access list / lock)
3. Validate item is a placeable block
4. Deduct item from inventory
5. Apply to front/background/foreground layer
6. Handle specials (seeds -> tree spawn, signs -> tile_strings)
7. Broadcast tile update to all players in world

// Break flow
1. Validate bounds + permissions
2. Check tile damage (breakable requires hits)
3. Remove from layer
4. Grant item back (or drop in world)
5. Broadcast tile update`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>World Tick & Auto-Save</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Main loop calls loop_worlds() each iteration
for (World& w : worlds) {
    if (now_ms() - w.last_update >= w.update_interval) {
        // Process NPCs, machines, crops, timers
        process_world_tick(w);
        w.last_update = now_ms();
    }

    // Auto-save worlds periodically
    if (now_ms() - w.last_save >= w.save_interval) {
        save_world(w);   // serialize JSON to disk
        w.last_save = now_ms();
    }
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>World Permissions</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Type</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Public</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Anyone can join, place, break</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Locked</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Requires world lock item to edit</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Restricted</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Only access_list members can join</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Private</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Only owner + access_list; invisible in list</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>World Locks & Access</h2>
        <p>World locks are special items with their own storage:</p>
        <ul>
          <li>World lock placement records ownership in <code>world_data</code></li>
          <li>Lock count in world determines reserved tiles for owner</li>
          <li>Adding a lock increases owner tile count</li>
          <li>Breaking a lock frees tiles back to public</li>
          <li>World lock balancing prevents editing locked tiles</li>
        </ul>
      </section>

      <section>
        <h2>World Persistence Format</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// JSON structure
{
  "name": "START",
  "owner": "admin",
  "is_lock": false,
  "is_public": true,
  "access_list": [],
  "banned": [],
  "width": 100,
  "height": 100,
  "background": 1,
  "weather": 0,
  "front": [...],          // width*height ints
  "background_tiles": [...],
  "foreground": [...],
  "flags": [...],
  "tile_damage": [...],
  "machines": [...],
  "npcs": [...]
}`}</code></pre>
        <p>Files are stored as <code>{"{name}"}_.json</code> under the worlds directory. Empty/untouched worlds are not written to disk until first modification.</p>
      </section>
    </article>
  );
}