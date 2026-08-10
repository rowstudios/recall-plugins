---
name: rollback
description: Roll back the workspace to a ReCall event
allowed-tools: mcp__plugin_row-recall_recall__rollback
---

Roll back the workspace to a specific ReCall event by calling the `rollback` MCP tool from the `recall` MCP server. The user must provide the event id (or ask you to look it up via the `status`/`diff` tools or the desktop timeline first). Warn that the rollback is undoable and can be reverted with `undo`.
