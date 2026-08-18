"use client";

export default function HttpPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
        <h1>HTTP Resolver (Server Data)</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>TCP server on port 80 returning server connection data to clients</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Overview</h2>
        <p>The HTTP resolver is a separate TCP server that runs on port 80. It responds to client requests with server connection information (IP, port, type) in the format expected by the Growtopia client (<code>server_data.php</code> format).</p>
        <p><strong>Thread:</strong> Detached std::thread (commented out in main, but can be enabled)</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Implementation</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`static void resolver_loop(int game_port) {
    WSADATA wsadata;
    if (WSAStartup(MAKEWORD(2, 2), &wsadata) != 0) return;
    
    SOCKET srv = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (srv == INVALID_SOCKET) return;
    
    int yes = 1;
    setsockopt(srv, SOL_SOCKET, SO_REUSEADDR, (const char*)&yes, sizeof(yes));
    
    sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    addr.sin_port = htons(80);
    
    if (::bind(srv, (sockaddr*)&addr, sizeof(addr)) == SOCKET_ERROR) {
        cout << "[Resolver] Failed to bind port 80 (needs Administrator)" << endl;
        closesocket(srv);
        return;
    }
    
    listen(srv, SOMAXCONN);
    
    // Response format (pipe-delimited)
    string response = "server|127.0.0.1\\n"
                    + "port|" + to_string(game_port) + "\\n"
                    + "type|1\\n"
                    + "type2|1\\n"
                    + "beta_server|127.0.0.1\\n"
                    + "beta_port|" + to_string(game_port) + "\\n"
                    + "beta_type|1\\n"
                    + "meta|localhost\\n"
                    + "RTENDMARKERBS1001";
    
    cout << "[Resolver] Listening on port 80 (server_data.php -> 127.0.0.1:" << game_port << ")" << endl;
    
    while (true) {
        SOCKET c = accept(srv, nullptr, nullptr);
        if (c == INVALID_SOCKET) continue;
        
        char buf[1024] = { 0 };
        recv(c, buf, sizeof(buf), 0);
        
        string http = "HTTP/1.1 200 OK\\r\\n"
                    + "Content-Type: text/plain\\r\\n"
                    + "Content-Length: " + to_string(response.size()) + "\\r\\n"
                    + "Connection: close\\r\\n\\r\\n"
                    + response;
        send(c, http.c_str(), (int)http.size(), 0);
        closesocket(c);
    }
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Response Format</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Field</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Example Value</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #eee" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>server</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>127.0.0.1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Main game server IP</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>port</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>53181</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Game UDP port</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>type</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Server type (1=main)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>type2</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Secondary type</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>beta_server</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>127.0.0.1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Beta server IP</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>beta_port</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>53181</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Beta server port</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>beta_type</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Beta server type</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>meta</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>localhost</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>Metadata identifier</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>RTENDMARKERBS1001</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>(fixed)</td><td style={{ padding: "0.75rem", border: "1px solid #eee" }}>End-of-response marker</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Client Request Flow</h2>
        <ol>
          <li>Game client starts, resolves server domain</li>
          <li>Client sends HTTP GET to <code>http://server_domain/</code> (port 80)</li>
          <li>Resolver returns pipe-delimited response above</li>
          <li>Client parses response, extracts <code>server</code> and <code>port</code></li>
          <li>Client initiates ENet connection to game server UDP port</li>
        </ol>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Requirements & Caveats</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <div style={{ border: "1px solid #ffcccc", background: "#fff5f5", borderRadius: "8px", padding: "1rem" }}>
            <h4 style={{ marginTop: 0, color: "#c00" }}>Administrator Required</h4>
            <p>Binding to port 80 requires elevated privileges on Windows. Run server as Administrator.</p>
          </div>
          <div style={{ border: "1px solid #ccccff", background: "#f5f5ff", borderRadius: "8px", padding: "1rem" }}>
            <h4 style={{ marginTop: 0, color: "#00c" }}>HTTPS Not Supported</h4>
            <p>Resolver uses plain HTTP. Modern clients may require HTTPS or certificate pinning.</p>
          </div>
          <div style={{ border: "1px solid #ccffcc", background: "#f5fff5", borderRadius: "8px", padding: "1rem" }}>
            <h4 style={{ marginTop: 0, color: "#080" }}>Thread Safety</h4>
            <p>Resolver runs in detached thread. Uses read-only access to <code>server_port</code>.</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Enabling the Resolver</h2>
        <p>The resolver thread is currently commented out in <code>main()</code>:</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// std::thread resolver(resolver_loop, server_port);
// resolver.detach();`}</code></pre>
        <p>Uncomment and ensure the server is run as Administrator to enable.</p>
      </section>

      <section>
        <h2>HTTP Client Utility</h2>
        <p>The codebase includes a full HTTP client implementation used for outbound requests (e.g., crypto price fetching). Features:</p>
        <ul>
          <li>Sync HTTP/1.1 client with chunked encoding support</li>
          <li>Timeout handling, redirect following</li>
          <li>Cross-platform (Windows/Linux/macOS)</li>
          <li>Used in crypto price updates</li>
        </ul>
      </section>
    </article>
  );
}