#!/usr/bin/env node
// /undo — revert the most recent restore operation
const { sendCommand } = require("../lib/send.js");

sendCommand({ command: "undo" });
