"use client";

export default function GuildsPage() {
  return (
    <article style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.7 }}>
      <header style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #333" }}>
        <h1>Guild System</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>Guild creation, members, roles, ranks, and leaderboards</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Guild Struct</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`struct Guild {
    int guildID;               // unique guild id
    string guildName;          // guild display name
    string tag;                // short tag [TAG]
    int leaderID;              // leader userID
    string leaderName;         // leader name
    vector<GuildMember> members;  // member roster
    long long totalGems;       // cumulative gems earned
    long long totalLocks;      // cumulative locks
    vector<int> leaderboard;   // sorted member ids
    long long created_at;
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Guild Flags (Enum)</h2>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`enum GuildFlags {
    GUILD_FLAG_NONE       = 0,
    GUILD_FLAG_INVITE     = 1,   // can invite
    GUILD_FLAG_KICK       = 2,   // can kick members
    GUILD_FLAG_PROMOTE    = 4,   // can promote ranks
    GUILD_FLAG_DEMOTE     = 8,   // can demote ranks
    GUILD_FLAG_EDIT_TAG   = 16,  // can change tag
    GUILD_FLAG_EDIT_NAME  = 32,  // can rename guild
    GUILD_FLAG_LEADER     = 64,  // leader only
};`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Member Roles</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Role</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Rank ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Leader</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>0</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>All flags; transfer leadership</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Vice</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>1</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Invite, kick, promote, demote</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Officer</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>2</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Invite, kick</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Member</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>3</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Standard member</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Guild Operations</h2>
        <h3>Commands</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1c1c1c" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Command</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #333" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild create [name]</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Create a guild (requires currency)</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild invite [name]</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Invite player to guild</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild accept</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Accept pending invitation</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild kick [name]</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Remove member</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild promote [name]</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Raise member rank</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild demote [name]</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Lower member rank</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild tag [TAG]</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Set guild tag</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild info</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Show guild details</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild leave</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Leave current guild</td></tr>
            <tr><td style={{ padding: "0.75rem", border: "1px solid #333" }}>/guild disband</td><td style={{ padding: "0.75rem", border: "1px solid #333" }}>Delete guild (leader only)</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Guild Leaderboard</h2>
        <p>The server maintains guild leaderboards ranking by total gems and locks earned. Leaderboard data is refreshed during guild ticks:</p>
        <pre style={{ background: "#1c1c1c", padding: "1rem", borderRadius: "4px", overflow: "auto" }}><code>{`// Refresh leaderboard periodically
void update_guild_leaderboard() {
    for (Guild& g : guilds) {
        long long score = g.totalLocks;
        g.leaderboard = sort_members_by_score(g);
    }
    // Persist sorted list
    save_guilds_to_disk();
}`}</code></pre>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Guild Persistence</h2>
        <ul>
          <li>Guilds stored as JSON in the guilds directory: <code>{"{guildID}"}.json</code></li>
          <li>Member list contains userID, name, rank, join date, gems contributed</li>
          <li>Auto-saved alongside world saves on the same cadence</li>
          <li>On login, guild info (guildID + guildRank) is loaded into the player</li>
        </ul>
      </section>

      <section>
        <h2>Guild Rank Display</h2>
        <p>Player guild affiliation appears in the OnSpawn packet (guildID + guildRank) and the name render with the guild tag. Roles gate which commands are available and which flag permissions apply.</p>
      </section>
    </article>
  );
}