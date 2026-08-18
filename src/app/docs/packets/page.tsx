"use client";

export default function PacketsPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
        <h1>Packet System</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>gamepacket_t serialization, text vs binary packets, and message IDs</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>gamepacket_t Structure</h2>
        <p>The core packet builder used for all type 4 (binary) packets. Uses a large fixed buffer followed by typed data inserts.</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`class gamepacket_t {
public:
    unsigned char buffer[1024 * 256];  // 256KB packet buffer
    unsigned int index = 0;            // write cursor
    int type = 0;                      // message type
    bool encrypted = false;

    // Insert methods - typed serialization
    void Insert(unsigned char value);  // 0x00 type marker
    void Insert(int value);            // 0x01 int32
    void Insert(unsigned int value);   // 0x01 uint32
    void Insert(float value);          // 0x01 float (bit-cast)
    void Insert(string value);         // 0x02 length + bytes
    void Insert(const char* value);    // 0x02 C-string
    void Insert(vector<int> value);    // 0x03 array of ints
    void InsertRaw(...);               // raw bytes without type marker
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Type Markers (Serialization)</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Marker Byte</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Type</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Wire Format</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x00</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>byte</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x00 + 1 byte</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x01</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>int32/uint32/float</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x01 + 4 bytes LE</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x02</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>string</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x02 + int32 len + bytes</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x03</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>array (int)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x03 + int32 count + 4-byte items</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x05</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>struct/raw</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x05 + length-prefixed</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x09</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>special</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0x09 + custom format</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Message Types</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Type</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Name</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Format</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Welcome</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Text</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Connection handshake ACK</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>2</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Text</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Text (|)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Login, chat, dialogs, commands</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>3</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Extended Text</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Text (|)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Requires bypass flag; join requests, purchases</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>4</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Binary</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Serialized</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Movement, actions, world, spawn, OSM</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Binary Packet Assembly</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Example: OnSpawn packet (type 4)
gamepacket_t pack;
pack.Insert(4);                      // message type (binary)
pack.Insert(2);                      // action type (OnSpawn)
pack.Insert(player->netID);          // netID
pack.Insert(player->userID);         // userID
pack.Insert(player->characterState); // char state
pack.Insert(player->posX);           // int X
pack.Insert(player->posY);           // int Y
pack.Insert(player->posX);           // float X (for client)
pack.Insert(player->posY);           // float Y
pack.Insert(player->flags);          // flags
pack.Insert(player->guildID);        // guild
pack.Insert(player->guildRank);      // guild rank
pack.Insert(player->userName);       // string name
pack.Insert(player->userNick);       // string nick
pack.Insert(player->clothes);        // itemIDs array (7)
pack.Insert(player->hairColor);      // int
pack.Insert(player->eyeColor);       // int
pack.Insert(player->skinColor);      // int
pack.Insert(0);                      // rain strength
pack.Insert(player->hats);           // extra hats
pack.Insert(0);                      // state
pack.Insert(0);                      // pose
pack.Insert(player->renderType);     // render type

send_raw(peer, pack.buffer, pack.index);`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Text Packet Format</h2>
        <p>Text packets use pipe-delimited key-value pairs. Client to Server for type 2/3:</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`tankIDName|user|tankIDPass|pass|requestedName||f|1|protocol|225|game_version|5.53|fz|23314424|klv|...|hash|...|mac|...|rid|...|country|us|platformID|0,1,1

// Chat message
playerChat|text|Hello world

// Command
action|input|/warp spawn

// Join request (type 3 - bypass)
action|join_request|WORLD_NAME`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Action IDs</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Action ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Name</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnPlayerLeft</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnPlayerMoving</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Both</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>2</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSpawn</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>3</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnRemove</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>4</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendMapData</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>7</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendTileUpdateData</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Both</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>9</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendTileUpdateDataMultiple</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>11</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendTileDamage</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Both</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>12</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendPingRequest</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>13</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendPingResponse</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Client -&gt; Srv</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>19</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendInventoryState</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>20</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendItemDatabaseData</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>21</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendTileData</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>22</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnReconnect</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>26</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendGameModes</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>27</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>OnSendPlayerMessage</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Srv -&gt; Client</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>PlayerMoving Struct</h2>
        <p>Used for type 4 binary movement packets (action 1):</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct PlayerMoving {
    int netID;
    int characterState;
    int punchX, punchY;      // punch target
    int posX, posY;          // int position (tile-aligned)
    float posXf, posYf;      // float position (pixel)
    int plantedTree;         // tree id if planting
    int plantSeed;           // seed id if planting
    int plantFrame;          // tree frame
    int plantPosX, plantPosY;
    int isPunching;          // 1 = punching
    int isFlag;              // extra flags
    int isJiggle;            // jiggle/anim flag
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Packing/Unpacking Flow</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// CLIENT TO SERVER (incoming type 4)
// 1. Validate packet header (61-byte, 4-byte length)
// 2. Decode packed chunks with bit-reading
// 3. Unpack into PlayerMoving fields
// 4. Route to action handler

// SERVER TO CLIENT (outgoing)
// 1. Build gamepacket_t with Insert()
// 2. Pack PlayerMoving fields with bit-writer
// 3. Append to packet buffer
// 4. Send via enet_packet_create`}</code></pre>
        <p>Bit-packing reduces bandwidth for movement data - integer positions are packed with 4-bit field IDs and signed values use zigzag encoding.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Packet Counters (Anti-Flood)</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Per-peer monitoring (anti-flood)
pInfo(peer)->all_packets++;      // total received
pInfo(peer)->pps++;              // per-second counter
pInfo(peer)->last_packet = now_ms();

// Send rate tracking
pInfo(peer)->sent_packets++;
pInfo(peer)->sent_bytes += packet->dataLength;

// Limits (disconnect triggers)
all_packets >= 560  -> flood
pps >= 16           -> too many pps`}</code></pre>
      </section>
    </article>
  );
}