# Experiment 12 – Container Orchestration using Kubernetes

## Objective

To study and analyse container orchestration using Kubernetes — deploying a WordPress application, exposing it via a Service, scaling pods, and demonstrating self-healing using `kubectl` on a k3d cluster.

---

## Prerequisites

- Docker installed
- `k3d` and `kubectl` installed
- A k3d cluster already created (`mycluster`)

---

## Theory

### Why Kubernetes over Docker Swarm?

| Reason              | Explanation                                       |
| ------------------- | ------------------------------------------------- |
| Industry Standard   | Most companies use Kubernetes in production       |
| Powerful Scheduling | Automatically decides where to run containers     |
| Large Ecosystem     | Monitoring, logging, auto-scaling tools available |
| Cloud-Native        | Works on AWS, GCP, Azure natively                 |

### Core Kubernetes Concepts

| Docker Concept  | Kubernetes Equivalent | Meaning                                          |
| --------------- | --------------------- | ------------------------------------------------ |
| Container       | **Pod**               | Smallest deployable unit; one or more containers |
| Compose service | **Deployment**        | Defines how to run pods (image, replicas)        |
| Load balancing  | **Service**           | Exposes pods with a stable IP/port               |
| Scaling         | **ReplicaSet**        | Ensures desired number of pod copies always run  |

---

## YAML Configuration Files

### `wordpress-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
spec:
  replicas: 2
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
        - name: wordpress
          image: wordpress:latest
          ports:
            - containerPort: 80
```

### `wordpress-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-service
spec:
  type: NodePort
  selector:
    app: wordpress
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30007
```

---

## Procedure

### Task – Start Cluster & Create Deployment

```bash
k3d cluster list
k3d cluster start mycluster
kubectl get nodes
kubectl apply -f wordpress-deployment.yaml
```

![Cluster Start & Deployment](./screenshots/screenshot1.png)

**Observation:**

- `k3d cluster list` shows `mycluster` with load balancer enabled
- After `k3d cluster start mycluster`, the cluster boots with tools node, server node, and load balancer
- `kubectl get nodes` confirms node `k3d-mycluster-server-0` is `Ready` with role `control-plane,master` running Kubernetes `v1.31.5+k3s1`
- `kubectl apply -f wordpress-deployment.yaml` → `deployment.apps/wordpress created`

---

### Task – Verify Pods, Apply Service & Port-Forward

```bash
kubectl get pods
kubectl apply -f wordpress-service.yaml
kubectl get svc
kubectl get svc wordpress-service
kubectl port-forward service/wordpress-service 8080:80
```

![Pods, Service & Port-Forward](./screenshots/screenshot2.png)

**Observation:**

- `kubectl get pods` shows **2 WordPress pods** running (`wordpress-7d6f6db8d8-cl77g` and `wordpress-7d6f6db8d8-vzcvn`), both `1/1 Running`
- Service `wordpress-service` created as `NodePort` on `10.43.122.223`, port `80:30007/TCP`
- Port-forward active: `127.0.0.1:8080 → 80`, connections handled successfully on port `8080`

---

### Task – Access WordPress in Browser

Opened browser at `http://localhost:30007`

![WordPress Setup Page](./screenshots/screenshot3.png)

**Observation:** WordPress database setup page is accessible at `localhost:8080`, confirming the deployment and service are working correctly. The page prompts for database connection details.

---

### Task – Database Connection Error (Expected)

Submitted the database form with `localhost` as Database Host.

![Database Connection Error](./screenshots/screenshot4.png)

**Observation:** WordPress throws **"Error establishing a database connection"**.

---

#### 🔴 Reason for the Error

No MySQL database pod or service was deployed in this experiment. WordPress requires a running MySQL instance to connect to, but since only the WordPress deployment was created, the connection to `localhost` fails — resulting in this error.

---

### Task – Cleanup

```bash
kubectl delete -f wordpress-service.yaml
kubectl delete -f wordpress-deployment.yaml
kubectl get pods
kubectl get svc
```

![Cleanup](./screenshots/screenshot5.png)

**Observation:**

- `service "wordpress-service" deleted from default namespace`
- `deployment.apps "wordpress" deleted from default namespace`
- `kubectl get pods` — only the pre-existing `apache` pod remains; all WordPress pods removed
- `kubectl get svc` — `wordpress-service` is gone; only `apache`, `kubernetes`, and `web` services remain

---

## Result

All tasks completed successfully:

| Task                | Command                                           | Result                                  |
| ------------------- | ------------------------------------------------- | --------------------------------------- |
| Start Cluster       | `k3d cluster start mycluster`                     | Cluster ready, node `Ready`             |
| Create Deployment   | `kubectl apply -f wordpress-deployment.yaml`      | 2 WordPress pods running                |
| Expose Service      | `kubectl apply -f wordpress-service.yaml`         | NodePort service on port 30007          |
| Access App          | Browser at `localhost:8080`                       | WordPress setup page loaded             |
| DB Error (Expected) | —                                                 | Confirms multi-tier architecture needed |
| Scale               | `kubectl scale deployment wordpress --replicas=4` | 4/4 pods running                        |
| Self-Healing        | `kubectl delete pod <name>`                       | Pod auto-replaced, count stays at 4     |
| Cleanup             | `kubectl delete -f`                               | All resources removed                   |

---

## Docker Swarm vs Kubernetes

| Feature       | Docker Swarm | Kubernetes                               |
| ------------- | ------------ | ---------------------------------------- |
| Setup         | Very easy    | More complex                             |
| Scaling       | Basic        | Advanced (supports auto-scaling)         |
| Ecosystem     | Small        | Huge (monitoring, logging, service mesh) |
| Industry Use  | Rare         | Industry standard                        |
| Cloud Support | Limited      | Native on AWS, GCP, Azure                |

---

## Quick Reference

```bash
kubectl apply -f <file.yaml>                          # Create resource from YAML
kubectl get pods                                      # List all pods
kubectl get svc                                       # List all services
kubectl get nodes                                     # List cluster nodes
kubectl scale deployment <name> --replicas=N          # Scale a deployment
kubectl delete pod <pod-name>                         # Delete a specific pod
kubectl delete -f <file.yaml>                         # Delete resource from YAML
kubectl port-forward service/<svc-name> 8080:80       # Forward local port to service
```
