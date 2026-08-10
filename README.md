# ReCall Plugins

Plugin marketplace for [ReCall](https://rowrecall.com) — local version control
for AI agentic workflows. Track every file change with byte-level deltas, then
checkpoint, rollback, undo, redo, diff, and branch — without Git.

## Plugins

| Plugin | Host | What you get |
|--------|------|--------------|
| [`row-recall`](plugins/claude-code/) | Claude Code | 17 MCP tools, 4 slash commands (`/checkpoint` `/rollback` `/undo` `/redo`), auto-checkpoint hook before every file write |
| [`row-recall`](plugins/codex/) | OpenAI Codex | MCP server registration (`npx @rowai/mcp-server`) |

## Claude Code install

```
/plugin marketplace add rowstudios/recall-plugins
/plugin install row-recall@recall-plugins
```

Requires the ReCall desktop app (or `recall watch`) running on
`ws://127.0.0.1:9876`, and Node.js 18+.

## Codex install

Add the MCP server to `~/.codex/config.toml`:

```toml
[mcp_servers.recall]
command = "npx"
args = ["-y", "@rowai/mcp-server"]
```

## Update

- Claude Code: `/plugin update row-recall` (or `/plugin marketplace update recall-plugins`)
- Releases are versioned in the plugin manifest; check [rowrecall.com](https://rowrecall.com) for the app.

## License

AGPL-3.0 (commercial licensing available — see [licensing@rowrecall.com](mailto:licensing@rowrecall.com)).
