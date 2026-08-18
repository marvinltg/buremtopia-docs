const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const RadioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14" />
  </svg>
);
const TableIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

export default function HttpPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          Networking
        </div>
        <h1>HTTP <span>Resolver</span></h1>
        <p className="page-desc">
          How buremtopia's embedded HTTP server handles Growtopia client resolver requests
          to redirect clients to your private server address.
        </p>
      </div>

      <div className="content-body">
        <div className="card">
          <h2><SearchIcon /> What is the Resolver?</h2>
          <p>
            Before connecting via ENet, the Growtopia client sends an HTTP POST to a
            hardcoded URL to discover the server address. On official Growtopia this points
            to Ubisoft's servers — buremtopia intercepts this by running its own HTTP server.
          </p>
          <div className="alert alert-info">
            <InfoIcon />
            <span>
              Players need to redirect their client's DNS (via <code>hosts</code> file or
              custom DNS server) to the machine running buremtopia.
            </span>
          </div>
        </div>

        <div className="card">
          <h2><RadioIcon /> Resolver Endpoint</h2>
          <p>The client sends a POST request to:</p>
          <pre>
            <span className="pre-label">HTTP Request</span>
            <code>{`POST /growtopia/server_data.php HTTP/1.1
Host: www.growtopia1.com
Content-Type: application/x-www-form-urlencoded

version=3.98&platform=0&country=US`}</code>
          </pre>
          <p>buremtopia responds with a plain-text body:</p>
          <pre>
            <span className="pre-label">HTTP Response</span>
            <code>{`server|127.0.0.1
port|17091
type|1
#maint|
loginurl|`}</code>
          </pre>
        </div>

        <div className="card">
          <h2><TableIcon /> Response Fields</h2>
          <table className="packet-table">
            <thead>
              <tr><th>Field</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>server</code></td><td>Public IP or hostname of the buremtopia ENet server</td></tr>
              <tr><td><code>port</code></td><td>ENet UDP port (default <code>17091</code>)</td></tr>
              <tr><td><code>type</code></td><td>Server type flag (<code>1</code> = normal)</td></tr>
              <tr><td><code>#maint</code></td><td>Maintenance message shown to client if non-empty</td></tr>
              <tr><td><code>loginurl</code></td><td>URL for web-based GrowID login (optional)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2><TerminalIcon /> Implementation</h2>
          <pre>
            <span className="pre-label">C++</span>
            <code>{`httplib::Server http;

http.Post("/growtopia/server_data.php",
    [&](const httplib::Request&, httplib::Response& res) {
        std::string body =
            "server|" + config_.server_ip + "\n"
            "port|"   + std::to_string(config_.port) + "\n"
            "type|1\n"
            "#maint|\n"
            "loginurl|\n";

        res.set_content(body, "text/html");
    }
);

resolver_thread_ = std::thread([&] {
    http.listen("0.0.0.0", config_.http_port);
});`}</code>
          </pre>
          <div className="alert alert-warn">
            <WarnIcon />
            <span>
              Port <code>80</code> requires elevated privileges on Linux/macOS. Use
              <code>iptables</code> to redirect port <code>80</code> to an unprivileged port.
            </span>
          </div>
        </div>

        <div className="card">
          <h2><GlobeIcon /> DNS / Hosts Setup</h2>
          <pre>
            <span className="pre-label">hosts file</span>
            <code>{`# Windows: C:\\Windows\\System32\\drivers\\etc\\hosts
# Linux/macOS: /etc/hosts

<YOUR_SERVER_IP>  www.growtopia1.com
<YOUR_SERVER_IP>  www.growtopia2.com`}</code>
          </pre>
          <div className="alert alert-success">
            <CheckIcon />
            <span>
              Alternatively, run a <strong>dnsmasq</strong> server on your local network so
              all devices are automatically redirected without editing individual hosts files.
            </span>
          </div>
        </div>

        <footer className="footer">// buremtopia Documentation · HTTP Resolver</footer>
      </div>
    </>
  );
}