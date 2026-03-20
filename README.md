# 🎓 Student Dropout Risk Prediction System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.5.0-emerald.svg)
![Deployment](https://img.shields.io/badge/platform-Vercel-black.svg)
![Tailwind](https://img.shields.io/badge/CSS-Tailwindv4-38bdf8.svg)

A premium, ML-powered analytical dashboard designed to forecast student dropout risks using key academic, behavioral, and financial metrics. Built with a focus on modern aesthetics (Glassmorphism 2.0), actionable insights, and high-performance data visualization.

---

## ✨ Key Features

- **🚀 Intelligent Risk Forecasting**: Real-time neural prediction engine analyzing student behavior and performance.
- **📊 Interactive Analytics Hub**: Comprehensive overview of student cohorts with interactive charts and historical trends.
- **🔍 Deep Factor Analysis**: Detailed diagnostic breakdown using 4 core vectors (Attendance, Sem 1 CGPA, Sem 2 CGPA, and Financial Status).
- **📥 Mass Data Stream**: Support for bulk CSV processing to analyze entire departments or college batches instantly.
- **💎 Premium Dashboard Experience**: Clean dark-mode UI powered by Framer Motion, featuring progressive blur headers and aurora-grid backgrounds.
- **💡 Context-Aware Recommendations**: Automated behavioral guidance based on specific risk factors identified.

---

## 🛠️ Tech Stack

### **Frontend (Modern SPA)**
- **React 18 + Vite**: Lightning-fast development and optimized production builds.
- **TypeScript**: Strict type-safety across the entire frontend architecture.
- **Tailwind CSS v4**: Next-gen utility-first styling with high-performance CSS-in-JS.
- **Framer Motion**: Smooth, high-end micro-animations and page transitions.
- **Lucide React**: Premium icon set for consistent visual language.

### **Backend (High-Performance API)**
- **FastAPI**: Asynchronous Python framework for rapid, scalable API development.
- **Weighted Sigmoid Model**: Sophisticated heuristic-based regression algorithm for precise probability forecasting.
- **Pandas**: Advanced data manipulation for bulk processing and CSV analysis.
- **Pydantic**: Robust data validation and automated documentation.

---

## 🏗️ Intelligence Architecture

The system utilizes a multi-vector heuristic model to calculate the `Dropout Probability Index`:

1.  **Attendance Vector (40% Weighting)**: Critical threshold monitored at 60% with exponential risk scaling.
2.  **Academic Vector (40% Weighting)**: Joint analysis of Semantic 1 and 2 performance, tracking stability and trends.
3.  **Financial Vector (20% Weighting)**: Binary assessment of outstanding fees and their impact on retention.

Each profile is categorized into one of four risk tiers: **Low**, **Moderate**, **High**, or **Critical**, generating immediate intervention protocols.

---

## 🚀 Installation & Local Development

### **1. Clone the repository**
```bash
git clone https://github.com/Ram6023/Student-Dropout-Risk-Prediction-System.git
cd Student-Dropout-Risk-Prediction-System
```

### **2. Setup Backend (Virtual Env recommended)**
```bash
# From root
pip install -r requirements.txt
uvicorn api.main:app --reload
```

### **3. Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 👥 Team Members

This project was developed by the following team members:

- **SRIRAM**
- **PRAVALIKA REDDY** 
- **SRINIVAS**

---

## ☁️ Deployment

Optimized for **Vercel** as a unified monorepo:
- **Client**: React / Vite (Root: `frontend`)
- **API**: FastAPI Serverless functions (Path: `api/`)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ for Advanced Student Success Monitoring.
