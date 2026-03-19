# Docker Networking Practical

## Bridge Network, Custom User‑Defined Networks & Container Communication

---

## Overview

This practical explores the networking architecture used by Docker containers. Docker networking enables containers to communicate with each other, with the host system, and with external networks.

In this lab we investigate how Docker manages network interfaces, IP allocation, DNS resolution, and connectivity between containers using different networking modes.

The experiment demonstrates:

- Inspection of Docker's default networks
- Analysis of the default bridge network configuration
- Creation of a user‑defined custom bridge network
- Deployment of multiple containers in the same network
- Container‑to‑container communication testing
- Inspection of container network configuration and assigned IP addresses
- Testing Docker's host networking mode
- Understanding differences between default bridge networks and custom bridge networks

---

## Technologies and Tools Used

| Tool                 | Purpose                                 |
| -------------------- | --------------------------------------- |
| Docker Desktop       | Container runtime environment           |
| Windows 11           | Host operating system                   |
| Command Prompt (CMD) | Command line interface                  |
| Nginx Image          | Web server container                    |
| BusyBox Image        | Lightweight Linux container for testing |
| Git                  | Version control                         |
| GitHub               | Remote repository hosting               |

---

## Learning Objectives

After completing this practical, the following networking concepts are understood:

- Docker default networking architecture
- Bridge networking and virtual network interfaces
- Container DNS name resolution
- Communication between isolated containers
- Network inspection and debugging
- Custom network creation and management
- Container IP address allocation
- Host network mode behavior

---

# Step 1 — Verify Docker Installation

Before working with Docker networking, verify that Docker is installed and running correctly.

```cmd
docker --version
docker info
```

These commands display:

- Docker Engine version
- System architecture
- Available CPU and memory resources
- Docker storage driver
- Networking configuration

This confirms that Docker is properly installed and operational.

---

# Step 2 — List Available Docker Networks

Docker automatically creates several default networks when it is installed.

To view the available networks run:

```cmd
docker network ls
```

Example output:

```
NETWORK ID     NAME      DRIVER    SCOPE
xxxxxxxxxxxx   bridge    bridge    local
xxxxxxxxxxxx   host      host      local
xxxxxxxxxxxx   none      null      local
```

### Default Docker Networks

| Network | Description                           |
| ------- | ------------------------------------- |
| bridge  | Default network used by containers    |
| host    | Container shares host networking      |
| none    | Container has no network connectivity |

These networks form the base of Docker networking.

---

# Step 3 — Inspect the Default Bridge Network

Docker assigns containers to the default bridge network if no custom network is specified.

Inspect the configuration using:

```cmd
docker network inspect bridge
```

This command returns a JSON configuration containing:

- Subnet range
- Gateway address
- Connected containers
- Network driver configuration

Example configuration values:

```
Subnet: 172.17.0.0/16
Gateway: 172.17.0.1
Driver: bridge
```

### Key Observations

- Docker automatically assigns IP addresses from the subnet
- Containers communicate through a virtual bridge interface
- Network isolation is maintained between containers

---

# Step 4 — Create a Custom Bridge Network

User‑defined networks provide better isolation and built‑in DNS resolution between containers.

Create a custom network using:

```cmd
docker network create my_bridge
```

Verify the network creation:

```cmd
docker network ls
```

Inspect the network configuration:

```cmd
docker network inspect my_bridge
```

Example configuration:

```
Subnet: 172.18.0.0/16
Gateway: 172.18.0.1
Driver: bridge
```

### Benefits of Custom Networks

- Automatic container DNS resolution
- Better isolation
- Improved container communication
- Easier service discovery

---

# Step 5 — Run Containers Inside Custom Network

Launch an Nginx container connected to the custom network.

```cmd
docker run -dit --name container1 --network my_bridge nginx
```

Launch a BusyBox container in the same network.

```cmd
docker run -dit --name container2 --network my_bridge busybox
```

Verify running containers:

```cmd
docker ps
```

Expected containers:

```
container1   nginx
container2   busybox
```

Both containers now share the same custom network.

---

# Step 6 — Test Container‑to‑Container Communication

Docker provides built‑in DNS resolution that allows containers to communicate using container names.

From the BusyBox container, ping the Nginx container:

```cmd
docker exec -it container2 ping container1
```

Example output:

```
PING container1 (172.18.0.2)
64 bytes from container1
64 bytes from container1
```

### What This Demonstrates

- Docker resolves container names internally
- Containers communicate using the internal network
- No manual IP configuration required

---

# Step 7 — Inspect Container Network Configuration

Inspect the networking details of each container.

```cmd
docker inspect container1
docker inspect container2
```

Important fields in the output:

```
"NetworkMode": "my_bridge"
"IPAddress": "172.18.0.x"
"Gateway": "172.18.0.1"
```

### Observations

- Each container receives a unique internal IP address
- Containers belong to the custom bridge network
- Docker manages routing automatically

---

# Step 8 — Test Host Network Mode

Host networking allows the container to share the host's network stack.

Run a container using host networking:

```cmd
docker run -d --network host nginx
```

### Host Networking Characteristics

- No separate container IP address
- Uses host machine ports directly
- No port mapping required

⚠ On Windows and macOS this behaves differently because Docker runs inside a virtual machine.

---

# Step 9 — Inspect Port Usage

To verify which service is using port 80:

```cmd
netstat -ano | findstr :80
```

This displays the process using the port on the host machine.

---

# Step 10 — Cleanup Docker Resources

Stop running containers:

```cmd
docker stop container1 container2
```

Remove containers:

```cmd
docker rm container1 container2
```

Remove the custom network:

```cmd
docker network rm my_bridge
```

Cleanup ensures no unused resources remain.

---

# Result

The following tasks were successfully completed:

- Docker networking environment inspected
- Default networks analyzed
- Custom bridge network created
- Multiple containers deployed within the same network
- Container‑to‑container communication verified
- Container IP addresses inspected
- Host network mode tested

---

# Key Concepts Learned

### Docker Bridge Network

- Default networking mode
- Creates a virtual Ethernet bridge
- Assigns container IP addresses automatically

### Custom Bridge Network

- User‑defined networks
- Built‑in DNS name resolution
- Better container isolation

### Container Communication

Containers communicate using:

- Container names
- Internal Docker DNS
- Virtual bridge interfaces

### Host Network Mode

- Shares host network stack
- No network isolation
- Useful for high‑performance networking

---

# Conclusion

This practical demonstrates the internal networking mechanisms used by Docker containers. Understanding Docker networking is essential for building scalable containerized applications, microservices architectures, and distributed systems.

Custom bridge networks enable secure and efficient communication between services, forming the foundation for advanced orchestration platforms such as Docker Compose and Kubernetes.
