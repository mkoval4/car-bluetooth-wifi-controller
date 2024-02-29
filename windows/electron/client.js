const net = require('net');

class Client {
    constructor(server_port, server_addr) {
        this.server_port = server_port;
        this.server_addr = server_addr;
        this.client = new net.Socket();
    }

    connect() {
        this.client.connect(this.server_port, this.server_addr, () => {
            console.log('Connected to server!');
        });
    }

    send(input) {
        this.client.write(`${input}\r\n`);
    }

    receive() {
        this.client.on('data', (data) => {
            console.log(`Received from client: ${data.toString()}`);
        });
    }

    disconnect() {
        this.client.on('end', () => {
            console.log('Disconnected from server');
        });
        this.client.destroy();
    }
}

module.exports = Client;