## Docker Experiment: Containerizing a Java Application (Windows Environment)

---

## Overview

This practical session demonstrates how to containerize a simple Java application using Docker.
The experiment covers writing a Dockerfile, building a custom image, running a container, and verifying successful execution.
The objective is to understand how Docker packages applications along with their runtime dependencies to ensure portability and consistency.

---

## Aim

To create a Docker image for a Java application using a Dockerfile, build the image, and execute it successfully inside a container.

---

## Tools & Technologies Used

- Windows 11
- Docker Desktop
- Command Prompt (CMD)
- Ubuntu 22.04 Base Image
- OpenJDK 17
- Git & GitHub

---

## Project Structure

Class Practical 28 Jan/
│
├── Container-Codes/
│ ├── Dockerfile
│ └── Hello.java

---

## Java Source Code (Hello.java)

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Docker!");
    }
}
```

---

## Dockerfile Configuration

```dockerfile
FROM ubuntu:22.04

RUN apt update && apt install -y openjdk-17-jdk

WORKDIR /home/app

COPY Hello.java .

RUN javac Hello.java

CMD ["java", "Hello"]
```

---

## Step-by-Step Execution

### Build Docker Image

```cmd
docker build -t java-app:1.0 .
```

Explanation:

- `-t` assigns a tag to the image
- `java-app` is the image name
- `1.0` is the version
- `.` indicates current directory as build context

---

### Verify Image Creation

```cmd
docker images
```

---

### Run the Container

```cmd
docker run java-app:1.0
```

Expected Output:

```
Hello, Docker!
```

---

## Key Docker Concepts Demonstrated

- Base Image Selection
- Layered Image Architecture
- Package Installation within Image
- Working Directory Configuration
- File Copying into Container
- Image Building Process
- Container Runtime Execution

---

## Result

- Successfully created a Docker image containing a Java program.
- Image built without errors.
- Container executed successfully.
- Java application ran inside isolated Docker environment.

---

## Conclusion

This experiment illustrates how Docker encapsulates an application along with its runtime and dependencies into a portable image.
By containerizing the Java program, we ensured environment consistency, simplified deployment, and improved application portability across systems.

Docker plays a crucial role in modern DevOps practices by enabling lightweight virtualization, scalable deployments, and reproducible environments.
