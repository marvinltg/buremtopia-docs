"use client";

export default function EnetPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
        <h1>ENet & Network Protocol</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>UDP networking with reliability, compression, and custom packet protocol</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>ENet Initialization</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`int init_enet(int port) {
    if (enet_initialize() != 0) {
        printf("[ENET] enet_initialize failed\\n");
        return -1;
    }
    
    ENetAddress address;
    memset(&address, 0, sizeof(address));
    address.type = ENET_ADDRESS_TYPE_IPV4;
    address.port = port;
    
    // Retry up to 5 times if port is busy
    for (int attempt = 0; attempt < 5; attempt++) {
        server = enet_host_create(ENET_ADDRESS_TYPE_IPV4, &address, 1024, 2, 0, 0);
        if (server != NULL) break;
        Sleep(2000);
    }
    
    if (server == NULL) return -1;
    
    // Critical settings
    server->checksum = enet_crc32;                    // CRC32 integrity
    enet_host_compress_with_range_coder(server);      // Range Coder compression
    server->usingNewPacketForServer = 1;              // New packet protocol
    
    printf("[ENET] listening on 0.0.0.0:%d (new packet protocol)\\n", port);
    return 0;
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Configuration Parameters</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Setting</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Value</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Max Peers</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1024</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Concurrent connections</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Channels</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>2</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Reliable (0) + Unreliable (1)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Incoming Bandwidth</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0 (unlimited)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Downstream throttle</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Outgoing Bandwidth</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>0 (unlimited)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Upstream throttle</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Checksum</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>enet_crc32</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Packet integrity</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Compression</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Range Coder</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Payload compression</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>New Protocol</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>enabled (1)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Growtopia fork format</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>New Packet Protocol Format</h2>
        <p>The Growtopia fork uses a custom packet format with integrity checking and compression:</p>
        
        <h3>Wire Format (UDP Datagram)</h3>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`[6 bytes integrity][2 bytes peerID][2 bytes sentTime][4 bytes CRC32][compressed payload]

Total header: 14 bytes minimum`}</code></pre>

        <h3>Integrity Header (6 bytes = 3 x uint16)</h3>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`integrity[0]: 0x16EC (constant)
integrity[1]: 0xD951 (constant) 
integrity[2]: 0x0000 (reserved/flags)`}</code></pre>

        <h3>Peer ID Encoding (2 bytes)</h3>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`Bits:  [15:14] flags    [13:12] sessionID  [11:0] peerID
Flags: 0xC000 = connect, 0x8000 = disconnect, 0x4000 = acknowledge`}</code></pre>

        <h3>Decompression Pipeline</h3>
        <ol>
          <li>Verify CRC32 over [header(10) + zero slot(4) + decompressed payload]</li>
          <li>Range Coder decompress payload</li>
          <li>Process decompressed ENet commands</li>
        </ol>

        <h3>Diagnostic Tools</h3>
        <ul>
          <li><code>enet_decode2</code> - Decode captured packets</li>
          <li><code>enet_test_server</code> - Standard ENet server with intercept callback</li>
          <li><code>enet_test2</code> - Fork-specific test (usingNewPacketForServer=1)</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Event Loop</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`ENetEvent event;
while (true) {
    // 3ms timeout for responsive processing
    while (enet_host_service(server, &event, 3000) > 0) {
        if (f_saving_ == false && auto_save == false) {
            switch (event.type) {
                case ENET_EVENT_TYPE_CONNECT:
                    handle_connect(event.peer);
                    break;
                case ENET_EVENT_TYPE_RECEIVE:
                    handle_receive(event.peer, event.packet);
                    enet_packet_destroy(event.packet);
                    break;
                case ENET_EVENT_TYPE_DISCONNECT:
                    handle_disconnect(event.peer);
                    break;
            }
        }
    }
    // Game tick processing outside event loop
    loop_worlds();
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Peer Data Management</h2>
        <p>Each connected peer stores a Player* in peer->data:</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{// On CONNECT:
peer->data = new Player;
pInfo(peer)->ip = client_ip;
pInfo(peer)->id = peer->connectID;

// Access macro
#define pInfo(peer) ((Player*)(peer->data))

// On DISCONNECT:
delete (Player*)peer->data;
peer->data = NULL;`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Packet Types & Message IDs</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Message ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Name</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Direction</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>ENet Connect ACK</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>S->C</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Initial handshake</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>2</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Text Packet</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>C->S</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Login, chat, dialogs, commands</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>3</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Extended Text</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>C->S</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Bypass-protected actions</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>4</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Binary Packet</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Both</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Movement, actions, world data</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Rate Limiting & Protection</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{// Per-peer limits
if (pInfo(peer)->all_packets >= 560) {
    enet_peer_disconnect_later(peer, 0);  // Flood protection
}
if (pInfo(peer)->pps >= 16) {              // Packets per second
    enet_peer_disconnect_later(peer, 0);
}

// Login rate limiting
if (Server_Security.login_count > 40 || Server_Security.update_item_data > 15) {
    failed_login(peer, "Too many people logging in");
}`}</code></pre>
      </section>
    </article>
  );
}