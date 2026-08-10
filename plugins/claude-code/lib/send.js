// Shared helper for ReCall slash commands: sends one command to the
// local ReCall daemon over WebSocket and prints the JSON response.
// Uses Node's built-in WebSocket (Node >= 22); falls back to the `ws`
// package when available.

const WS_URL = process.env.RECALL_WS_URL || "ws://127.0.0.1:9876";

function createSocket() {
  if (typeof WebSocket !== "undefined") {
    return new WebSocket(WS_URL);
  }
  try {
    return new (require("ws"))(WS_URL);
  } catch {
    throw new Error(
      "No WebSocket implementation found. Use Node 22+ or install the 'ws' package.",
    );
  }
}

function sendCommand(command, timeoutMs = 10_000) {
  const ws = createSocket();
  const timer = setTimeout(() => {
    console.error(JSON.stringify({ status: "error", error: "Timed out waiting for ReCall daemon" }));
    process.exit(1);
  }, timeoutMs);

  ws.onopen = () => ws.send(JSON.stringify(command));
  ws.onmessage = (event) => {
    clearTimeout(timer);
    const data = typeof event.data === "string" ? event.data : String(event.data);
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch {
      console.log(data);
    }
    ws.close();
    process.exit(0);
  };
  ws.onerror = () => {
    clearTimeout(timer);
    console.error(JSON.stringify({
      status: "error",
      error: `Cannot connect to ReCall daemon at ${WS_URL}. Start the ReCall desktop app or run 'recall watch'.`,
    }));
    process.exit(1);
  };
}

module.exports = { sendCommand, WS_URL };
