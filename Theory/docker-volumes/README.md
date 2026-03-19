## Docker Storage Mechanisms: Volumes, Bind Mounts, tmpfs & MySQL Persistence

---

## Overview

This practical experiment explores Docker storage mechanisms and demonstrates how containerized applications can maintain persistent and temporary data. Containers are typically ephemeral, meaning that data inside them can be lost when the container stops or is removed. Docker provides multiple storage mechanisms to overcome this limitation.

This lab focuses on three major Docker storage approaches:

- **Named Volumes** for persistent container data
- **Bind Mounts** for direct host-container file sharing
- **tmpfs Mounts** for high‑speed in‑memory temporary storage

Additionally, a **MySQL container** is used to demonstrate persistent database storage using Docker volumes.

---

## Objectives

- Understand the concept of Docker storage mechanisms
- Create and manage Docker named volumes
- Run a MySQL container with persistent storage
- Demonstrate container lifecycle management
- Inspect Docker volumes and verify storage location
- Implement bind mounts for live file synchronization
- Use tmpfs mounts for temporary in‑memory storage
- Compare Volume vs Bind Mount vs tmpfs behavior

---

## Environment Configuration

| Component          | Details              |
| ------------------ | -------------------- |
| Operating System   | Windows 11           |
| Container Platform | Docker Desktop       |
| Container Runtime  | Docker Engine        |
| CLI Interface      | Command Prompt       |
| Database Image     | MySQL                |
| Web Server Image   | NGINX                |
| Storage Drivers    | Docker Volume Driver |

---

## Step 1 — Verify Docker Installation

Before performing any container operations, Docker must be verified to ensure the engine and services are running properly.

### Command

```cmd
docker info
```

### Description

This command displays detailed information about:

- Docker client configuration
- Docker server status
- Container runtime details
- Number of containers and images
- Storage drivers used by Docker
- Volume drivers configured on the system

Successful execution confirms Docker is running correctly.

---

## Step 2 — Create a Docker Named Volume

Docker volumes are the recommended method for storing persistent container data.

### Command

```cmd
docker volume create myvolume
```

### Verify Volume Creation

```cmd
docker volume ls
```

### Explanation

- Creates a Docker-managed storage location
- Stored internally by Docker
- Independent of container lifecycle
- Allows persistent storage even if containers are deleted

Example output:

```
DRIVER    VOLUME NAME
local     myvolume
```

---

## Step 3 — Run MySQL Container with Persistent Volume

A MySQL container is launched with a mounted volume so that database data is stored persistently.

### Command

```cmd
docker run -d ^
--name mysql-container ^
--mount source=myvolume,target=/var/lib/mysql ^
-e MYSQL_ROOT_PASSWORD=root123 ^
mysql
```

### Explanation

| Parameter             | Purpose                         |
| --------------------- | ------------------------------- |
| `-d`                  | Runs container in detached mode |
| `--name`              | Assigns name to container       |
| `--mount`             | Attaches Docker volume          |
| `MYSQL_ROOT_PASSWORD` | Sets root password              |
| `mysql`               | MySQL Docker image              |

### Container Data Path

MySQL stores its data at:

```
/var/lib/mysql
```

By mounting the volume to this directory, all database data becomes persistent.

---

## Step 4 — Container Lifecycle Management

To demonstrate persistence, the container is stopped and removed.

### View Containers

```cmd
docker ps -a
```

### Stop Container

```cmd
docker stop mysql-container
```

### Remove Container

```cmd
docker rm mysql-container
```

Even after removal, the **Docker volume still exists**.

---

## Step 5 — Recreate MySQL Container Using Same Volume

The MySQL container is recreated using the same volume.

```cmd
docker run -d ^
--name mysql-container ^
--mount source=myvolume,target=/var/lib/mysql ^
-e MYSQL_ROOT_PASSWORD=root123 ^
mysql
```

### Observation

Because the same volume is mounted:

- Previous database files remain intact
- MySQL loads existing data automatically
- Demonstrates **stateful container behavior**

---

## Step 6 — Inspect Docker Volume

Docker volumes can be inspected to view internal details.

### Command

```cmd
docker volume inspect myvolume
```

### Information Displayed

- Volume creation timestamp
- Volume driver type
- Mountpoint location
- Metadata

Typical mount location:

```
/var/lib/docker/volumes/myvolume/_data
```

---

## Step 7 — Bind Mount with NGINX

Bind mounts allow host directories to be directly shared with containers.

### Create Host Directory

```cmd
mkdir html
```

### Create Web Page

```cmd
notepad html/index.html
```

### HTML Content

```html
<h1>Hello from Docker Bind Mount</h1>
<p>This page is served from the host machine.</p>
```

### Run NGINX Container

```cmd
docker run -d ^
--name nginx-bind ^
-v "%cd%/html:/usr/share/nginx/html" ^
-p 8080:80 ^
nginx
```

### Explanation

| Option                  | Purpose                   |
| ----------------------- | ------------------------- |
| `-v`                    | Bind mount host directory |
| `%cd%/html`             | Host path                 |
| `/usr/share/nginx/html` | Container web directory   |
| `-p`                    | Port mapping              |

Access the webpage:

```
http://localhost:8080
```

Any change to the host HTML file immediately updates the container output.

---

## Step 8 — tmpfs Mount (In-Memory Storage)

tmpfs mounts store container data directly in RAM.

### Command

```cmd
docker run -d ^
--name temp-container ^
--mount type=tmpfs,target=/app/cache ^
nginx
```

### Characteristics

- Data stored in RAM
- Extremely fast read/write speeds
- Data removed when container stops
- Ideal for cache or sensitive temporary files

---

## Comparison of Docker Storage Types

| Feature                | Volume    | Bind Mount  | tmpfs     |
| ---------------------- | --------- | ----------- | --------- |
| Managed by Docker      | Yes       | No          | No        |
| Persistent Storage     | Yes       | Yes         | No        |
| Host System Dependency | No        | Yes         | No        |
| Performance            | Good      | Good        | Very High |
| Security               | High      | Medium      | Very High |
| Best Use Case          | Databases | Development | Caching   |

---

## Observations

- Docker volumes maintain data even when containers are deleted
- MySQL database files remain intact across container restarts
- Bind mounts enable real-time file synchronization between host and container
- tmpfs provides extremely fast but temporary storage

---

## Result

- Docker volume created successfully
- MySQL container used persistent storage
- Volume reuse verified after container deletion
- Bind mount demonstrated live file updates
- tmpfs mount implemented for RAM-based storage

---

## Conclusion

This experiment demonstrates the flexibility of Docker's storage mechanisms. Docker volumes are the preferred solution for persistent application data such as databases. Bind mounts provide real-time host-container synchronization, which is highly useful during development workflows. tmpfs mounts offer high-performance temporary storage suitable for caching and sensitive data operations.

Understanding these storage strategies is essential for designing scalable, reliable, and production-ready containerized systems.
