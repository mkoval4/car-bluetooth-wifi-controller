import socket

HOST = "192.168.2.29" # IP address of your Raspberry PI
PORT = 65432          # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()

    while True:
        try:
            client, clientInfo = s.accept()
            print("Connected to:", clientInfo)

            with client:
                while True:
                    data = client.recv(1024)
                    if not data:
                        print("Connection closed by", clientInfo)
                        break
                    print("Received:", data.decode())
                    client.sendall(data)  # Echo back to client
        except KeyboardInterrupt:
            print("Server interrupted by user")
            break
        except Exception as e:
            print("Error occurred:", e)

print("Closing socket")