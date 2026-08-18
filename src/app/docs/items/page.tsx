"use client";

export default function ItemsPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #333" }}>
        <h1>Items & Blocks</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>ItemDB, block types, clothing, and item properties</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>ItemDB</h2>
        <p>The server maintains a global item database loaded from <code>items.dat</code> at startup. Each entry defines an item's properties.</p>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct ItemDB {
    int id;                 // item id (1..many)
    string name;            // item display name
    string texture;         // texture file name
    int textureX, textureY; // atlas offset
    int flags;              // bitmask properties
    int category;           // block/foreground/etc
    int collisions;         // collision flags
    int drops[3];           // drop item ids
    int drop_chance;        // drop chance percent
    int seed_color;         // seed render color
    int seed_overlay;       // seed overlay id
    int tree;               // tree type for seeds
    int fruit;              // fruit id (harvestable)
    int punch;              // punch effect
    int sound;              // placement sound
    int visual_options;     // vfx
    int grow_time;          // tree growth ms
    int rarity;             // trade value tier
    int max_count;          // stack size
    int buy_cost;           // store price
    int sell_cost;          // shop refund
    string description;     // item description
    bool is_plantable;      // seed-like
    bool is_breakable;      // harvestable
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Block Types (Enum)</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`enum BlockTypes {
    BT_NONE = 0,
    BT_BLOCK = 1,          // solid block
    BT_ACTION = 2,         // action block
    BT_SEED = 3,           // seed (plantable)
    BT_SIGN = 4,           // sign (text tile)
    BT_TREE = 5,           // tree/plant
    BT_SPAWN = 6,          // spawn point
    BT_BEDROCK = 7,        // unbreakable
    BT_CHEMICAL = 8,       // chem combiner
    BT_GEIGER = 9,         // geiger counter
    BT_DOOR = 10,          // door
    BT_MAIN_DOOR = 11,     // main door
    BT_PLATFORM = 12,      // one-way platform
    BT_VENDING = 13,       // vending machine
    BT_MAILBOX = 14,       // mailbox
    BT_FOREGROUND = 15,    // foreground obj
    BT_CANVAS = 16,        // painting
    BT_DICE = 17,          // dice
    BT_PROVIDER = 18,      // weather provider
    BT_NPCS = 19,          // NPC spawner
    BT_SIGN_TEXT = 20,     // large sign
    BT_ONE_WAY = 21,       // one-way block
    BT_MUSIC = 22,         // music player
    BT_TOMORROW = 23,      // tomorrow machine
    // ... extended types
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Clothing System</h2>
        <p>Character appearance uses 7 base clothing slots plus hat extras:</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Index</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Slot</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>0</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Hair (hat)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Shirt</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>2</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Pants</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>3</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Feet (shoes)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>4</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Face (mask)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>5</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Hand (hand item)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>6</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Back (back item)</td></tr>
          </tbody>
        </table>
        <p>Color fields (hair, eyes, skin) are separate int values. The <code>hats</code> vector holds additional wearable hats (meta items).</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Special Item Behaviors</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Item</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>World Lock</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Ownership tile locking; reserved tile count</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Seeds</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Plant -&gt; grow over time -&gt; harvest fruit</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Signs</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Stores text in tile_strings; renders on canvas</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Vending Machine</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Sells items for currency; stock tracking</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Chemical Combiner</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Combines inputs into output item</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Geiger Counter</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Detects radioactive items; counter value</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Tomorrow Machine</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>RNG machine; roll chances -&gt; output</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Dice</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Random 1-6; message broadcast</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Music Player</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Plays audio track; sets world music</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Weather Provider</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Sets world weather effect</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Item Flags</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Bitmask values (subset)
const int ITEM_FLAG_BLOCK       = 1;    // placeable block
const int ITEM_FLAG_FOREGROUND  = 2;    // foreground object
const int ITEM_FLAG_BACKGROUND  = 4;    // background tile
const int ITEM_FLAG_SEED        = 8;    // plantable seed
const int ITEM_FLAG_SIGN        = 16;   // text sign
const int ITEM_FLAG_TOOL        = 32;   // usable tool
const int ITEM_FLAG_WEARABLE    = 64;   // clothing item
const int ITEM_FLAG_BREAKABLE   = 128;  // harvestable/breakable
const int ITEM_FLAG_FRUIT       = 256;  // fruit harvest
const int ITEM_FLAG_SHIELD      = 512;  // special vfx`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Drops & Harvesting</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// On block break, roll drops:
for (int i = 0; i < 3; i++) {
    if (item->drops[i] != 0) {
        // drop_chance% chance to drop item
        if (rand() % 100 < item->drop_chance) {
            give_item(player, item->drops[i], 1);
        }
    }
}

// Seeds -> plant -> grow
// tree:  BT_TREE with grow_time
// On grow_time elapsed: update frame (plantFrame)
// Harvest: remove tree, give fruit item`}</code></pre>
      </section>
    </article>
  );
}