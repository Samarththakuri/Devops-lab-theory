## Multi‑Stage Docker Builds for C and Java Applications (Production‑Style Containers)

---

# Overview

This practical demonstrates **real-world DevOps container development workflows** using Docker.  
The objective is to understand how modern production containers are built using **multi-stage builds**, **minimal runtime environments**, and **secure container execution**.

Two different containerized applications are implemented:

1️ **C Application Containerization**

- Static binary compilation
- Multi-stage Docker build
- Ultra‑small runtime container using **scratch image**

2️ **Java Application Containerization**

- Maven-based build system
- Multi-stage Docker build
- Secure runtime container using **non-root user**
- Runtime optimization using **Eclipse Temurin JRE**

These techniques are commonly used in **enterprise DevOps pipelines, microservices architectures, and cloud-native deployments**.

---

# Technologies Used

| Technology                | Purpose                   |
| ------------------------- | ------------------------- |
| Docker Desktop            | Container runtime         |
| Docker CLI                | Container management      |
| Ubuntu 22.04              | Builder environment for C |
| GCC Compiler              | Compiling C program       |
| Scratch Image             | Minimal runtime container |
| Maven                     | Java build automation     |
| OpenJDK 11                | Java compilation          |
| Eclipse Temurin JRE       | Production runtime        |
| Multi‑Stage Docker Builds | Image size optimization   |
| Linux Containers          | Runtime environment       |

---

# Project Structure

```
Class Practical 10 Feb
│
├── c-multistage-container
│   ├── hello.c
│   └── Dockerfile
│
├── java-multistage-container
│   ├── Dockerfile
│   ├── pom.xml
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── HelloWorld.java
│
└── README.md
```

---

# PART 1 — Containerized C Application

## Objective

The objective of this experiment is to containerize a **C program** using Docker and optimize the final image using a **multi-stage build process**.

Key concepts demonstrated:

- Builder containers
- Static binary compilation
- Scratch minimal runtime containers
- Image size optimization

---

# C Program (hello.c)

```c
#include <stdio.h>
#include <string.h>

int main() {

    char stored_sapid[] = "500125960";
    char user_sapid[50];

    while (1) {

        printf("Enter your SAP ID: ");
        scanf("%s", user_sapid);

        if(strcmp(user_sapid, stored_sapid) == 0) {
            printf("Matched\n");
        } else {
            printf("Not Matched\n");
        }

    }

    return 0;
}
```

---

# Dockerfile — Multi‑Stage Build

```dockerfile
# -------- Stage 1 : Builder --------
FROM ubuntu:22.04 AS builder

RUN apt-get update && apt-get install -y gcc

WORKDIR /app

COPY hello.c .

RUN gcc -static -o hello hello.c


# -------- Stage 2 : Minimal Runtime --------
FROM scratch

COPY --from=builder /app/hello /hello

CMD ["/hello"]
```

---

# Build Docker Image

```
docker build -t sapid-checker .
```

Docker performs the following internally:

1. Pulls Ubuntu image
2. Installs GCC compiler
3. Compiles C source code
4. Creates static binary
5. Copies binary into scratch runtime image

---

# Run Container

```
docker run -it sapid-checker
```

Example execution:

```
Enter your SAP ID:
500125960
Matched
```

---

# Verify Image Size

```
docker images
```

Example output:

```
sapid-checker     latest      ~1MB
```

This proves that **multi-stage builds drastically reduce container size**.

---

# Concepts Demonstrated

- Multi‑Stage Docker Builds
- Builder Pattern
- Static Binary Compilation
- Scratch Runtime Containers
- Ultra‑Minimal Container Images
- Runtime Image Optimization

---

# PART 2 — Java Multi‑Stage Container

## Objective

The objective of this experiment is to build a **Java application container** using a multi-stage Docker workflow.

The container separates:

**Build Environment**

- Maven
- JDK
- Source code compilation

**Runtime Environment**

- Lightweight JRE
- Compiled application only
- Non-root execution for security

---

# Java Project Structure

```
java-multistage-container
│
├── Dockerfile
├── pom.xml
└── src
    └── main
        └── java
            └── com
                └── example
                    └── HelloWorld.java
```

---

# Java Application

```java
package com.example;

public class HelloWorld {

    public static void main(String[] args) {

        System.out.println("Hello from MultiStage Docker Java Container!");

    }

}
```

---

# Maven Configuration (pom.xml)

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
 http://maven.apache.org/xsd/maven-4.0.0.xsd">

 <modelVersion>4.0.0</modelVersion>

 <groupId>com.example</groupId>
 <artifactId>helloapp</artifactId>
 <version>1.0</version>

 <build>

  <plugins>

   <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.8.1</version>

    <configuration>
     <source>11</source>
     <target>11</target>
    </configuration>

   </plugin>

   <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.2.0</version>

    <configuration>

     <archive>

      <manifest>
       <mainClass>com.example.HelloWorld</mainClass>
      </manifest>

     </archive>

    </configuration>

   </plugin>

  </plugins>

 </build>

</project>
```

---

# Multi‑Stage Dockerfile

```dockerfile
# -------- Stage 1 : Builder --------
FROM maven:3.8-openjdk-11 AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests


# -------- Stage 2 : Runtime --------
FROM eclipse-temurin:11-jre-jammy

WORKDIR /app

COPY --from=builder /app/target/helloapp-1.0.jar app.jar

RUN useradd -m appuser

USER appuser

CMD ["java", "-jar", "app.jar"]
```

---

# Build Java Container

```
docker build -t java-multistage-app .
```

---

# Run Container

```
docker run java-multistage-app
```

Output:

```
Hello from MultiStage Docker Java Container!
```

---

# Docker Image Layer Analysis

```
docker history java-multistage-app
```

Observation:

- Builder stage layers are removed
- Final image contains only runtime layers
- Reduced image size compared to Maven image

---

# Key Docker Concepts Demonstrated

- Multi‑Stage Docker Builds
- Builder vs Runtime Environment Separation
- Static Binary Compilation
- Secure Container Execution (Non‑Root User)
- Runtime Container Optimization
- Docker Layer Caching
- Production Container Design

---

# Learning Outcomes

After completing this practical:

- Understanding container build pipelines
- Learning multi-stage Docker workflows
- Reducing container image sizes
- Implementing container security best practices
- Deploying optimized runtime containers

---

# Result

Successfully implemented optimized Docker containers for:

- C application using **scratch runtime image**
- Java application using **secure multi-stage container build**

Both containers demonstrate **real-world DevOps container optimization techniques** used in modern cloud-native systems.

---

# Conclusion

This practical demonstrates how multi-stage Docker builds enable developers to separate build dependencies from runtime environments. By compiling applications in builder containers and deploying only compiled artifacts into minimal runtime images, it is possible to create **secure, lightweight, and production-ready containers** suitable for scalable cloud infrastructure.
