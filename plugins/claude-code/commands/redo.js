#!/usr/bin/env node
// /redo — re-apply the most recently undone operation
const { sendCommand } = require("../lib/send.js");

sendCommand({ command: "redo" });
