#!/usr/bin/env node
// /rollback <event_id> [file_path] — restore workspace (or one file) to an event
const { sendCommand } = require("../lib/send.js");

const eventId = process.argv[2];
if (!eventId || !/^\d+$/.test(eventId)) {
  console.error("Usage: /rollback <event_id> [file_path]");
  process.exit(1);
}
const filePath = process.argv[3] || "";
sendCommand({ command: "rollback", event_id: Number(eventId), file_path: filePath });
