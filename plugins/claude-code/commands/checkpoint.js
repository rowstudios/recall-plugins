#!/usr/bin/env node
// /checkpoint [label] — snapshot the current workspace state
const { sendCommand } = require("../lib/send.js");

const label = process.argv[2] || "checkpoint from Claude Code";
sendCommand({ command: "checkpoint", label });
