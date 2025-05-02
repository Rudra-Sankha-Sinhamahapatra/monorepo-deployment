import db from "@repo/db/db";

console.log("Starting WebSocket server...");
const server = Bun.serve({
    port: 8081,
    fetch(req, server) {
        const url = new URL(req.url);
        console.log(`Fetch request received for path: ${url.pathname}`);
        
        // upgrade the request to a WebSocket
        const success = server.upgrade(req);
        if (success) {
            console.log("WebSocket upgrade successful");
            return; // do not return a Response
        }
        console.log("WebSocket upgrade failed", { status: 500 });
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        open(ws) {
            console.log("WebSocket connection opened");
        },
        async message(ws, message) {
            console.log("WebSocket message received");
            try {
                console.log("Received message:", message);
                
                const user = await db.user.create({
                    data: {
                        email: `${Math.random().toString()}@example.com`,
                        name: Math.random().toString(),
                    }
                });
                
                console.log("Created user:", user);
                ws.send(JSON.stringify({ success: true, user }));
            } catch (error: any) {
                console.error("Error in WebSocket message handler:", error);
                ws.send(JSON.stringify({ success: false, error: error.message }));
            }
        },
        close(ws) {
            console.log("WebSocket connection closed");
        },
    },
});

console.log(`WebSocket server is running at http://localhost:${server.port}`);