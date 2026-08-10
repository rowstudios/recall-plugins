# ReCall for Claude Code

Claude Code integration for [ReCall](https://rowrecall.com) —
local version control for AI agentic workflows. Checkpoint, rollback, undo,
redo, diff, and branch your workspace directly from Claude Code — with an
auto-checkpoint hook before every file write.

## Prerequisites

- The ReCall daemon must be running (desktop app or `recall watch`), listening
  on `ws://127.0.0.1:9876`.
- Node.js 22+ (the bundled MCP server needs Node 18+; the auto-checkpoint hook
  uses the built-in WebSocket, so Node 22+ is recommended).

## Install (one command)

The plugin ships from the **ReCall plugin marketplace**. In Claude Code:

```
/plugin marketplace add rowstudios/recall-plugins
/plugin install row-recall@recall-plugins
```

That's it. You get:

- **17 MCP tools** the agent can call on its own: `checkpoint`, `rollback`,
  `restore_file`, `undo`, `redo`, `undo_redo_state`, `diff`, `changed_files`,
  `status`, `license_status`, `workspace_list`, `workspace_switch`,
  `ai_sessions`, `webhook_status`, `branch`, `branch_switch`, `branch_list`
- **4 slash commands** for humans:

  | Command | What it does |
  |---------|--------------|
  | `/checkpoint` | Snapshot the workspace |
  | `/rollback <event_id>` | Restore to an event |
  | `/undo` | Undo the last restore |
  | `/redo` | Redo the last undo |

- **Auto-checkpoint hook** — Claude Code snapshots the workspace before every
  file write (`Write`/`Edit`/`NotebookEdit`), so any risky edit is one command
  away from a clean rollback.

## Install (manual, no marketplace)

```bash
npm install -g @rowai/mcp-server
```

Then add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "recall": {
      "command": "npx",
      "args": ["@rowai/mcp-server"]
    }
  }
}
```

For the slash commands and hook, copy this folder to `~/.claude/plugins/row-recall/`
and re-enter the session.

## Suggested workflow for Claude Code

1. Before a big refactor: `/checkpoint` (or just ask — the agent will call the
   MCP tool on its own).
2. Let the agent edit.
3. If something breaks: `/rollback <event_id>` back to the checkpoint.
4. Changed your mind? `/redo`. Every restore is itself undoable.
5. Check what an agent touched after a session: ask for "AI sessions" — the
   desktop app shows exactly which files each agent edited, with one-click
   restore to before the session.

## Troubleshooting

- **"Cannot connect to ReCall daemon"** — start the desktop app or `recall
  watch` first.
- **"No workspace configured"** — set the workspace in the ReCall desktop UI.
- **Hook doesn't fire** — after installing, restart the Claude Code session
  (plugins load on session start).
