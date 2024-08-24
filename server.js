const WebSocket = require('ws');

const PORT = process.env.PORT || 8080; // Use the port provided by Koyeb

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT });

// Broadcast function to send messages to all connected clients
function broadcast(sender, message) {
    wss.clients.forEach(client => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Handle connection events
wss.on('connection', ws => {
    console.log('Client connected');

    // Handle incoming messages
    ws.on('message', message => {
        console.log('Received message:', message);
        broadcast(ws, message);
    });

    // Handle disconnection events
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`Signaling server is running on port ${PORT}`);
