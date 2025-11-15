# LoadGuardian - AI-Powered Smart Transport Compliance System

**"Protecting Roads, Lives, and Laws with AI Precision."**

## Overview

LoadGuardian is a comprehensive web application that uses simulated IoT sensors, AI vision, and blockchain technology to monitor and prevent overloading, illegal cargo substitution, and passenger crowding in public transport. The system features real-time alerts, smart dashboards, and secure data transmission to authorities.

## Features

### 1. **Smart Load Detection Module**
- IoT-based weight sensors simulation
- 2-stage warning system for drivers
- Automatic GPS alerts to police stations
- Transport Department weight compliance

### 2. **AI Vision Surveillance**
- Real-time camera feed simulation with YOLOv8-style detection
- Passenger counting for public buses
- Cargo type identification
- Visual anomaly detection

### 3. **Blockchain-based Logbook**
- Tamper-proof records of all events
- Immutable weight entries and violations
- Complete audit trail for authorities
- Transparent and corruption-free

### 4. **Live Violation Analytics Dashboard**
- Real-time map with vehicle tracking
- Color-coded status (Green=Safe, Yellow=Warning, Red=Violation)
- Automated fine calculation
- Interactive charts and analytics

### 5. **Driver Companion App**
- Voice-based alerts and warnings
- Real-time load/passenger monitoring
- Safe driving score
- Legal awareness section (Motor Vehicle Act)

### 6. **AI Cargo Detection**
- Camera feed analysis simulation
- Before/after cargo comparison
- Tampering detection alerts

### 7. **Public Transport Safety Mode**
- Passenger count monitoring for RTC buses
- 3-tier warning system (1st warning → 2nd warning → police alert)
- Automated fine calculation based on overcrowding
- LED display integration

### 8. **Police Control Center**
- Real-time violation alerts with sound
- GPS coordinates and vehicle details
- Instant alert dispatch system
- Case management and resolution tracking

## Live Features

✅ **Camera View** - Real-time AI detection visualization  
✅ **Report Generation** - Automatic violation reports  
✅ **Alarm Sounds** - Audio alerts for violations  
✅ **Live Map** - Moving vehicles with status colors  
✅ **Blockchain Log** - Immutable event records  
✅ **Analytics** - Charts and insights  

## Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4.0
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## How to Use

### Landing Page
Choose from three main dashboards:
1. **Admin Dashboard** - Complete system overview
2. **Driver Companion** - Real-time driver assistance
3. **Police Control** - Law enforcement panel

### Admin Dashboard
Navigate through 5 tabs:
- **Live Map** - Track all vehicles in real-time
- **Violations** - Manage and review violations
- **Camera Feeds** - AI vision surveillance
- **Blockchain Log** - View immutable records
- **Analytics** - Performance insights

### Driver App
- Monitor current load/passenger count
- Receive voice alerts for violations
- View safe driving score
- Access legal awareness resources

### Police Panel
- Receive instant violation alerts
- View vehicle details and GPS location
- Dispatch enforcement units
- Manage case resolution

## Fine Calculation System

Fines are calculated based on:
- **Violation Type**: Overload (₹10,000+), Overcrowding (₹5,000+)
- **Severity**: Medium (×1.5), High (×2), Critical (×3)
- **Excess Weight/Passengers**: Additional penalties
- **Motor Vehicle Act** compliance

## Simulated Features

This is a demonstration/prototype application with simulated:
- IoT weight sensors (random data generation)
- GPS vehicle tracking (animated movement)
- AI camera detection (canvas-based visualization)
- Blockchain hashing (cryptographic simulation)
- Real-time violations (automated detection)

## Color Coding

- 🟢 **Green** - Safe vehicles (within limits)
- 🟡 **Yellow** - Warning (1st violation)
- 🔴 **Red** - Violation (2+ warnings, alert sent to police)

## Warning System

1. **First Warning** - Yellow alert, driver notification
2. **Second Warning** - Red alert, final warning
3. **Third Violation** - Automatic police alert with GPS + fine

## Compliance Rules

Based on **Motor Vehicle Act** and **Central Motor Vehicle Rules**:
- Overloading penalties: ₹20,000+ (Section 194)
- Passenger overcrowding: ₹1,000 per excess passenger (Section 194A)
- Cargo verification: Up to ₹1,00,000 for illegal goods

## Demo Flow

The application continuously:
1. Updates vehicle positions every 3 seconds
2. Simulates weight/passenger changes every 5 seconds
3. Detects violations every 2 seconds
4. Plays audio alerts for warnings
5. Adds blockchain entries for all events
6. Updates analytics in real-time

## Future Extensions

- Physical IoT hardware integration (ESP32/Arduino)
- Real GPS tracking APIs
- Actual AI model deployment (YOLOv8)
- SMS/Email notifications (Twilio)
- Digital payment integration
- Ignition lock system
- AR dashboard visualization
- Voice recognition for drivers

---

**Built for hackathon demonstration - All features working live!** 🚀
