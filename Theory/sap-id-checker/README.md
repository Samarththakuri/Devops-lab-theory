# 🐳 Containerizing a Python-Based SAP ID Verification App using Docker

## 📌 Overview

This hands-on class test demonstrates how to containerize a Python-based SAP ID verification application using Docker. The objective is to understand real-world application packaging, dependency management, and execution inside isolated container environments.

---

## 🎯 Objectives

- Use an official Docker base image (Python 3.10 Slim)
- Containerize a Python application
- Install dependencies inside the container (NumPy)
- Build and run a custom Docker image
- Execute the application interactively inside a container
- Understand the difference between Image and Container
- Learn the DevOps workflow for application packaging and deployment

---

## 🛠️ Tech Stack

- Python 3.10
- Docker
- NumPy

---

## 📂 Project Structure

---

## 🧾 Application Description

The Python application verifies SAP IDs based on predefined logic and demonstrates how such a system can be packaged and deployed using Docker.

---

## ⚙️ Step-by-Step Implementation

### 1️⃣ Create Python Application (`app.py`)

```python
import numpy as np

def verify_sap_id(sap_id):
    if len(sap_id) == 11 and sap_id.isdigit():
        return "Valid SAP ID"
    return "Invalid SAP ID"

if __name__ == "__main__":
    sap_id = input("Enter SAP ID: ")
    print(verify_sap_id(sap_id))


```
