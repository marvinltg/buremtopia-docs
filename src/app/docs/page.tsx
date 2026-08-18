"use client";

import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/docs/architecture", title: "Architecture", desc: "High-level system architecture and components" },
  { href: "/docs/enet", title: "ENet &amp; Network Protocol", desc: "ENet configuration, packet protocol, peer management" },
  { href: "/docs/http", title: "HTTP Resolver", desc: "Server data resolver on port 80" },
  { href: "/docs/login", title: "Login Flow", desc: "Authentication, OSM, world entry sequence" },
  { href: "/docs/packets", title: "Packet System", desc: "gamepacket_t, serialization, packet types" },
  { href: "/docs/player", title: "Player System", desc: "Player state, inventory, clothes, playmods" },
  { href: "/docs/world", title: "World System", desc: "World loading, blocks, machines, NPCs" },
  { href: "/docs/items", title: "Items &amp; Blocks", desc: "ItemDB, block types, clothing, properties" },
  { href: "/docs/guilds", title: "Guild System", desc: "Guilds, members, roles, leaderboards" },
  { href: "/docs/events", title: "Game Events", desc: "Hide &amp; Seek, Beach Party, Crypto, Daily Quests" },
  { href: "/docs/persistence", title: "Data Persistence", desc: "JSON storage, world save, player save" },
  { href: "/docs/security", title: "Security &amp; Anti-Cheat", desc: "Rate limiting, bypass detection, logging" },
];

export default function DocsIndexPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          GTPS3 Documentation
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "700px" }}>
          Technical documentation for the GTPS3 Growtopia Private Server.
          Covers ENet networking, packet protocol, HTTP resolver, login flow,
          world/player systems, and server architecture.
        </p>
      </header>

      <nav style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "block",
              padding: "1.5rem",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              e.currentTarget.style.borderColor = "#0070f3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e0e0e0";
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>{item.title}</h3>
            <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{item.desc}</p>
          </Link>
        ))}
      </nav>

      <hr style={{ margin: "3rem 0" }} />

      <section>
        <h2>Quick Start</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`# Build & Run Server
cd base-gt3
# Open SecretSrc.sln in Visual Studio 2022
# Build Release x64
# Run gtps3.exe

# Run Documentation Site
cd gtps3-docs
npm install
npm run dev
# Open http://localhost:3000`}</code></pre>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Key Technologies</h2>
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", listStyle: "none", padding: 0 }}>
          <li style={{ padding: "1rem", background: "#fafafa", borderRadius: "8px", border: "1px solid #333" }}>
            <strong>ENet 1.3.18 Fork</strong><br />
            <small>UDP with reliability, CRC32, Range Coder compression, New Packet Protocol</small>
          </li>
          <li style={{ padding: "1rem", background: "#fafafa", borderRadius: "8px", border: "1px solid #333" }}>
            <strong>C++17</strong><br />
            <small>Modern C++, nlohmann/json, RapidJSON, custom string crypter</small>
          </li>
          <li style={{ padding: "1rem", background: "#fafafa", borderRadius: "8px", border: "1px solid #333" }}>
            <strong>JSON Persistence</strong><br />
            <small>World files (worlds/*.json), Player data, Guild data</small>
          </li>
          <li style={{ padding: "1rem", background: "#fafafa", borderRadius: "8px", border: "1px solid #333" }}>
            <strong>Visual Studio 2022</strong><br />
            <strong>Windows Sockets (Winsock)</strong>
          </li>
        </ul>
      </section>
    </div>
  );
}