import socket
import json
import picar_4wd as fc
import time
import subprocess

HOST = "192.168.2.18" # IP address of your Raspberry PI
PORT = 65433          # Port to listen on (non-privileged ports are > 1023)

speed = 15
left_angle = 90
right_angle = 90
distance_travlled = 0


def cpu_temperature():          # cpu_temperature
    raw_cpu_temperature = subprocess.getoutput("cat /sys/class/thermal/thermal_zone0/temp")
    cpu_temperature = round(float(raw_cpu_temperature)/1000,2)               # convert unit
    #cpu_temperature = 'Cpu temperature : ' + str(cpu_temperature)
    return cpu_temperature

def power_read():
    from picar_4wd.adc import ADC
    power_read_pin = ADC('A4')
    power_val = power_read_pin.read()
    power_val = power_val / 4095.0 * 3.3
    # print(power_val)
    power_val = power_val * 3
    power_val = round(power_val, 2)
    return power_val

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
                    command = data.decode().strip()
                    if not data:
                        print("Connection closed by", clientInfo)
                        break

                    if command == "forward":
                        fc.forward(speed)
                        time.sleep(1.5)
                        fc.stop()
                        # At this speed - 40.64 cm is travelled in 1.5 seconds
                        distance_travlled += 40.64

                    elif command == "reverse":
                        fc.backward(speed)
                        time.sleep(1.5)
                        fc.stop()
                        
                        # At this speed - 40.64 cm is travelled in 1.5 seconds
                        distance_travlled += 40.64

                    elif command == "right":
                        fc.turn_right(speed)
                        # It takes approx 1.27 seconds to turn 90 degrees
                        time.sleep(right_angle*(1.27/90))
                        fc.stop()

                    elif command =="left":
                        fc.turn_left(speed)
                        # It takes approx 1.27 seconds to turn 90 degrees
                        time.sleep(left_angle*(1.27/90))
                        fc.stop()

                    elif command.startswith("leftAngle:"):
                        angle_str = command.split(":")[1]
                        left_angle=int(angle_str)
                        print("Updated Angle:", left_angle)

                    elif command.startswith("rightAngle:"):
                        angle_str = command.split(":")[1]
                        right_angle=int(angle_str)
                        print("Updated Angle:", right_angle)

                    elif command == "get":
                        print("Getting stats")
                        stats = {
                            "temperature": cpu_temperature(),
                            "battery": power_read(),
                            "distance": distance_travlled
                        }
                        json_data = json.dumps(stats)
                        client.sendall(json_data.encode())
                        print("Sent:", json_data)

                    else:
                        print("Received:", data.decode())
                        client.sendall(data)  # Echo back to client

        except KeyboardInterrupt:
            print("Server interrupted by user")
            break
        except Exception as e:
            print("Error occurred:", e)

print("Closing socket")