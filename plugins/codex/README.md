# ReCall for OpenAI Codex

Codex integration for [ReCall](https://rowrecall.com) — local
version control for AI agentic workflows. Exposes checkpoint, rollback, undo,
redo, diff, and branching to Codex agents as MCP tools.

## Prerequisites

- The ReCall daemon must be running (desktop app or `recall watch`), listening
  on `ws://127.0.0.1:9876`.
- Node.js 18+.

## Install

```bash
npm install -g @rowai/mcp-server
```

Add the MCP server to `~/.codex/config.toml` (or a project-local
`.codex/config.toml`):

```toml
[mcp_servers.recall]
command = "npx"
args = ["-y", "@rowai/mcp-server"]
```

Restart Codex. The agent gains 17 tools:

| Tool | Purpose |
|------|---------|
| `checkpoint` | Snapshot the workspace before risky changes |
| `rollback` / `restore_file` | Restore workspace or one file to a past event |
| `undo` / `redo` | Reverse or re-apply the last restore |
| `undo_redo_state` | Query undo/redo availability |
| `diff` | Unified diff between events |
| `changed_files` | Files changed since the last checkpoint |
| `status` | Engine stats |
| `license_status` | Free/Pro plan, events used, days left |
| `workspace_list` / `workspace_switch` | Multi-workspace management |
| `ai_sessions` | Recorded AI agent sessions (what each agent touched) |
| `webhook_status` | Team webhook configuration |
| `branch` / `branch_switch` / `branch_list` | Parallel branches |

## Suggested workflow for Codex

Add a note to your `AGENTS.md` (or project instructions):

> Before making large or destructive changes, call the `checkpoint` tool.
> If a change goes wrong, use `rollback` to return to the checkpoint's
> `event_id`. If you're not sure what changed, call `changed_files` first.

## Troubleshooting

- **"ReCall daemon not connected"** — start the desktop app or `recall watch`.
- **Codex does not load MCP servers** — verify your Codex version supports MCP
  (`codex --version`), and that `npx` is on `PATH`.
