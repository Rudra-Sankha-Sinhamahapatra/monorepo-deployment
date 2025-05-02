const ws = new WebSocket("ws://localhost:8081");

ws.addEventListener("open", () => {
    console.log("Connected to WebSocket server");
    ws.send("Hello Server!");
});

ws.addEventListener("message", (event) => {
    console.log("Received message from server:", event.data);
});

ws.addEventListener("close", () => {
    console.log("Disconnected from WebSocket server");
});

ws.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
}); 