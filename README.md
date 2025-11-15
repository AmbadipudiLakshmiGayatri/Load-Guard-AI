# 🚚 Load Guardian – Smart Transport Compliance System  
### “Protecting Roads, Lives, and Laws with AI Precision.”

Load Guardian is an AI-powered Smart Transport Compliance System designed to enhance road safety by detecting overloading, illegal cargo substitution, and passenger overcrowding in public transport. The platform integrates **IoT sensors**, **computer vision**, **blockchain logging**, and **real-time analytics** to create an end-to-end, automated monitoring ecosystem for transport authorities, fleet operators, and public safety departments.

---

## 🌟 Key Features

### 1. **IoT-Based Smart Load Detection**
- Real-time vehicle weight monitoring using load sensors.
- Two-stage warning system for drivers.
- Automatic violation alert to nearby police if overloading continues.
- Fully aligned with Transport Department legal weight limits.

### 2. **AI Vision Surveillance**
- YOLO/OpenCV-based detection of:
  - Bus overcrowding  
  - Cargo type identification  
  - Illegal material transport  
  - Cargo tampering or substitution  
- Supports cabin, exterior, and cargo-bay camera feeds.

### 3. **Blockchain Logbook**
- Stores every alert, weight entry, and camera detection immutably.
- Ensures tamper-proof evidence for authorities.
- Reduces corruption in enforcement.

### 4. **Real-Time Admin Dashboard**
- Live map with moving vehicles (green = safe, red = violation)
- GPS tracking, AI alerts, and analytics
- Status filtering (resolved / pending / under review)
- Integrated Google Maps API

### 5. **Driver Companion App**
- Voice alerts for overload, safety warnings, and violations.
- Load summary, driving score, and legal awareness.
- Route and vehicle compliance status.

### 6. **Public Transport Overcrowding Control**
- Passenger counting using AI vision.
- Automatic escalation to depot managers and police.
- Optional LED “Bus Overloaded” sign trigger.

### 7. **Emergency & Enforcement Integration**
- Extreme violations trigger instant police + RTO notifications.
- Optional future integrations:
  - Ignition lock
  - Predictive maintenance
  - Digital penalty wallet

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- TailwindCSS  
- @react-google-maps/api  
- Axios / WebSockets  

### **Backend**
- Node.js / Express  
- MongoDB  
- WebSocket Server  
- Blockchain (IPFS / Hash-based logging)

### **AI / ML**
- YOLOv8, OpenCV  
- Python API (optional)  
- Anomaly detection models  

### **IoT**
- ESP32 / Arduino  
- Weight sensors (Load Cell + HX711)

---

## 🚀 Getting Started

### Install dependencies:
```bash
npm install
