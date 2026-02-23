# 🚀 IUT Cafeteria Observability Lab 

### *High-Availability Monitoring for the "Ramadan Rush"*

This repository contains a microservice-based architecture designed to solve the **"Thundering Herd"** problem during peak hours (like Iftar). The project focuses on **Distributed Observability**, ensuring that developers can track system health, identify latency spikes, and manage "Chaos" in real-time.

---

## 🛠 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Microservices** | Node.js / Express | Non-blocking service logic. |
| **Log Management** | Grafana Loki | Log aggregation and indexing. |
| **Metrics Engine** | Prometheus | Time-series data (Request rates, CPU). |
| **Data Collector** | Grafana Alloy | The "Messenger" piping data to Grafana. |
| **Visualization** | Grafana Dashboards | Centralized command center. |
| **Containerization** | Docker & Compose | Infrastructure as code. |

---

## 🏗 System Architecture

The system is designed to be **fault-tolerant**. Instead of a monolith that crashes under load, we use a decoupled monitoring layer where services remain fast while Alloy handles the observability overhead.



1.  **Application Layer:** Services emit JSON logs and Prometheus metrics.
2.  **Collection Layer:** Alloy tails the `.log` files and scrapes `/metrics`.
3.  **Storage Layer:** Loki and Prometheus act as the "brain" for logs and metrics.
4.  **Visualization Layer:** Grafana provides real-time insights and alerts.

---

## ⚡ Features & Chaos Engineering

- **JSON-Structured Logging:** Uses `Winston` to ensure logs are machine-readable for complex analytics.
- **Latency Tracking:** Real-time monitoring of request durations (critical for identifying "choke points").
- **Chaos Simulation:** A built-in toggle to simulate database failures and 5-second delays, allowing for testing of "Graceful Degradation."
- **Unified Dashboard:** One screen to view Logs, Metrics, and Service Health.

---

## 🚀 Quick Start

### 1. Prerequisites
- Docker & Docker Desktop
- Node.js (v18+)

### 2. Launch the Infrastructure

#Start the Monitoring Stack (Grafana, Loki, Prometheus, Alloy)
docker-compose up -d
### 3. Run the Services
Bash
# Start Order Service (Port 3001)
cd order-service && npm install && node index.js

# Start Inventory Service (Port 4000)
cd ../inventory-service && npm install && node index.js
### 4. Key Endpoints
Grafana: http://localhost:3000 (User: admin | Pass: admin)

Place Order: http://localhost:3001/place-order

Toggle Chaos: http://localhost:4000/toggle-chaos

### 📊 Monitoring Workflow
Step 1: Generate Traffic
Spam the place-order endpoint. In the browser, you will see "Order Created."

Step 2: Trigger Chaos
Hit the /toggle-chaos endpoint. You will notice the place-order requests now take 5 seconds.

Step 3: Observe in Grafana
Go to Explore and select Loki. Use this query to see the latency spike:

Code snippet
avg_over_time({service="order-service"} | json | unwrap durationMs [1m])
🛡 Fault Tolerance Strategy
This project proves that even if the Inventory Service slows down, the Order Gateway detects the spike via Prometheus and logs the specific error in Loki, preventing the entire "Spaghetti Monolith" from crashing.

Developed for the IUT Hackathon Series.

