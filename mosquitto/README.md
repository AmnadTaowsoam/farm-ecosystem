# mosquitto on linux
## Installation 

    sudo apt update
    sudo apt install mosquitto mosquitto-clients
    sudo systemctl enable mosquitto
    sudo systemctl start mosquitto
    sudo systemctl status mosquitto



## 2. ทดสอบ Broker ว่ายังทำงานได้หรือไม่:
2.1 Terminal A

    mosquitto_sub -h localhost -t test/topic

2.2 Terminal B

    mosquitto_pub -h localhost -t test/topic -m "hello world"


## 3. ตรวจสอบพอร์ตที่ Mosquitto ฟังอยู่

    sudo netstat -tulnp | grep mosquitto
    หรือ
    ss -tulnp | grep mosquitto

- ต้องเห็น mosquitto ฟังที่พอร์ต 1883

## 4. แก้ไข config

    sudo nano /etc/mosquitto/mosquitto.conf

    เพิ่ม

    GNU nano 7.2                                                                     /etc/mosquitto/mosquitto.conf                                                                              
    # Place your local configuration in /etc/mosquitto/conf.d/
    #
    # A full description of the configuration file is at
    # /usr/share/doc/mosquitto/examples/mosquitto.conf.example
    #pid_file /run/mosquitto/mosquitto.pid

    persistence true
    persistence_location /var/lib/mosquitto/

    log_dest file /var/log/mosquitto/mosquitto.log

    include_dir /etc/mosquitto/conf.d
    listener 1883
    # bind_address 0.0.0.0

    allow_anonymous false
    password_file /etc/mosquitto/passwd

## สร้าง username/password สำหรับ MQTT Broker (ถ้ายังไม่มี)

- เปิด command line


        sudo mosquitto_passwd -c /etc/mosquitto/passwd <yourusername>

- ระบบจะถาม password
- ระบบจะให้ยืนยัน password

## เกี่ยวกับ สิทธิ์ (permission)
- ตรวจสอบสิทธิ์ไฟล์และโฟลเดอร์สำคัญ
    - สิทธิ์ไฟล์ password ถ้าใช้

            sudo chmod 600 /etc/mosquitto/passwd
            sudo chown mosquitto:mosquitto /etc/mosquitto/passwd

    - สิทธิ์โฟลเดอร์ log และ run
    
            sudo chown -R mosquitto:mosquitto /var/log/mosquitto
            sudo chown -R mosquitto:mosquitto /run/mosquitto

- ตรวจสอบว่าไฟล์ config ไม่มี syntax ผิดพลาด
    - รันคำสั่งตรวจสอบ

            mosquitto -c /etc/mosquitto/mosquitto.conf -v

