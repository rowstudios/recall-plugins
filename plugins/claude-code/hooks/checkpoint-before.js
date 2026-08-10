#!/usr/bin/env node
// PreToolUse hook: checkpoint before Claude Code writes to the workspace.
// Wire it up in ~/.claude/settings.json:
//
//   {
//     "hooks": {
//       "PreToolUse": [{
//         "matcher": "Write|Edit|NotebookEdit",
//         "command": "node <path-to>/hooks/checkpoint-before.js"
//       }]
//     }
//   }
const { sendCommand } = require("../lib/send.js");

sendCommand({ command: "checkpoint", label: "auto: before Claude Code tool use" });
