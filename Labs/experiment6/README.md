# Project Title

A brief description of what this project does and who it's for

# 🐳 Docker Run vs Docker Compose Lab

## 📌 Objective

To understand the difference between Docker Run and Docker Compose and deploy single & multi-container applications.

---

## ⚙️ Prerequisites

- Docker installed
- Docker Compose installed

---

# 🚀 Task 1: Single Container

## ▶ Docker Run

```bash
docker run -d --name lab-nginx -p 8081:80 nginx:alpine
```

### 📸 Output Screenshot

![](Screenshots/task1-1.png)
![](Screenshots/task1-2.png)
![](Screenshots/task1-3.png)
![](Screenshots/task1-4.png)

---

## ▶ Docker Compose

```yaml
version: "3.8"
services:
  nginx:
    image: nginx:alpine
    ports:
      - "8081:80"
```

```bash
docker compose up -d
```

### 📸 Output Screenshot

![Docker compose Output](Screenshots/task1-5.png)
![](Screenshots/task1-6.png)
![](Screenshots/task1-7.png)
![](Screenshots/task1-8.png)
![](Screenshots/task1-9.png)
![](Screenshots/task1-10.png)

---

# 🌐 Task 2: Multi-Container (WordPress + MySQL)

## ▶ Docker Run Approach

### 📸 Screenshot

![Docker Run Multi](Screenshots/task2-1.png)

---

## ▶ Docker Compose Approach

```yaml
services:
  mysql:
    image: mysql:5.7

  wordpress:
    image: wordpress:latest
    ports:
      - "8082:80"
```

### 📸 Screenshot

![Compose Multi](Screenshots/task2-2.png)

---

# 🔄 Task 3: Conversion

## Docker Run → Compose

### 📸 Screenshot

![Conversion](Screenshots/Task3.png)

---

# 💾 Task 4: Volume + Network

### 📸 Screenshot

![Volume Network](Screenshots/Task4.png)

---

# 🏗️ Task 5: Dockerfile + Compose

## ▶ app.js

```javascript
// Node server
```

## ▶ Dockerfile

```dockerfile
FROM node:18-alpine
```

## ▶ Run

```bash
docker compose up --build -d
```

### 📸 Screenshot

![Node App](Screenshots/task5-1.png)
![In Browser](Screenshots/task5-2.png)

---

# 📊 Key Learnings

- Docker Run is **imperative**
- Docker Compose is **declarative**
- Compose simplifies multi-container apps
- Volumes ensure persistence
- Networks enable communication

---

# 🧾 Conclusion

Docker Compose is more efficient for managing complex applications compared to Docker Run.
