<h1 align="center">✈️ AirTracker - Smart Flight Booking Platform</h1>

<div align="center">
  <p><em>Your intelligent companion for affordable flight booking with advanced features</em></p>
  
  <a href="https://github.com/sudhanshu-77/AirTracker/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/sudhanshu-77/AirTracker?color=2b9348"></a>
  <a href="https://github.com/sudhanshu-77/AirTracker/issues"><img src="https://img.shields.io/github/issues/sudhanshu-77/AirTracker"></a>
  <a href="https://github.com/sudhanshu-77/AirTracker/network/members"><img src="https://img.shields.io/github/forks/sudhanshu-77/AirTracker"></a>
  <a href="https://github.com/sudhanshu-77/AirTracker/stargazers"><img src="https://img.shields.io/github/stars/sudhanshu-77/AirTracker"></a>
  <a href="https://github.com/sudhanshu-77/AirTracker/blob/master/LICENSE"><img src="https://img.shields.io/github/license/sudhanshu-77/AirTracker"></a>
  
  [![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-green.svg)](https://tailwindcss.com/)
  [![PWA](https://img.shields.io/badge/PWA-Enabled-purple.svg)](https://web.dev/progressive-web-apps/)
  
  [![](https://visitcount.itsvg.in/api?id=sudhanshu-77&label=Profile%20Views&color=1&icon=5&pretty=true)](https://visitcount.itsvg.in)
</div>

## 🚀 Live Deployments

- **⚡ Vercel**: Live Website </a> [Link](https://air-tracker-umber.vercel.app/).

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Demo & Screenshots](#demo--screenshots)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

## 🎯 Overview

AirTracker is a comprehensive flight booking platform built with modern web technologies. It offers intelligent flight search, real-time price tracking, secure payment processing, and a suite of travel companion features to enhance your booking experience.

### Key Objectives
- 🔍 **Smart Flight Search** - Find the best deals with AI-powered recommendations
- 📊 **Price Intelligence** - Track and alert on price changes
- 💳 **Secure Payments** - Multiple payment options with robust security
- 🎫 **Digital Experience** - Paperless boarding passes and travel management

## ✨ Features

### 🔥 Core Features
- **Intelligent Flight Search** with city name autocomplete
- **Real-time Price Tracking** and alerts
- **Dual Payment Integration** (Razorpay + UPI)
- **Digital Boarding Pass** with QR codes
- **Multi-city Trip Planner** with route optimization
- **Weather Insights** and travel recommendations

### 🎨 User Experience
- **Dark/Light Mode** with system preference detection
- **Responsive Design** for all devices
- **PWA Support** for offline functionality
- **Enhanced Loading States** with skeleton screens
- **Currency Converter** with real-time rates

### 🤖 Smart Features
- **AI-Powered Recommendations** for destinations
- **Flexible Date Calendar** with price heatmap
- **Alternative Airport Suggestions**
- **Travel Companion Tools** for group bookings
- **Price Alert System** with smart notifications

### 🛡️ Security & Performance
- **Environment Variable Configuration**
- **Input Validation** and sanitization
- **Error Handling** with user-friendly messages
- **Firebase Integration** for secure data storage
- **Optimized Bundle Size** with code splitting

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend & Services
- **Firebase** - Authentication and Firestore database
- **Razorpay** - Payment processing
- **OpenWeather API** - Weather data
- **ExchangeRate API** - Currency conversion

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control
- **Netlify/Vercel** - Deployment platforms

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudhanshu-77/AirTracker.git
   cd AirTracker/AirTracker01
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# API Keys
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
REACT_APP_WEATHER_API_KEY=your_openweather_key
REACT_APP_EXCHANGE_API_KEY=your_exchange_api_key
```

### API Setup Guide

1. **Firebase**: [Console](https://console.firebase.google.com/) → Create Project → Get Config
2. **Razorpay**: [Dashboard](https://dashboard.razorpay.com/) → Settings → API Keys
3. **OpenWeather**: [API](https://openweathermap.org/api) → Sign up → Get API Key
4. **ExchangeRate**: [API](https://exchangerate-api.com/) → Free Plan → Get Key

## 📁 Project Structure

```
AirTracker01/
├── public/                 # Static assets
├── src/
│   ├── Components/         # React components
│   │   ├── Home/          # Home page components
│   │   ├── Booking/       # Booking flow
│   │   ├── Payment/       # Payment processing
│   │   └── ...            # Other features
│   ├── Config/            # Configuration files
│   ├── constants.js       # App constants
│   └── App.jsx           # Main app component
├── .env.example          # Environment template
├── package.json          # Dependencies
└── README.md            # Documentation
```

## 🔌 API Integration

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Deployment Commands

```bash
# Vercel
npm run build
vercel --prod

# Netlify
npm run build
# Deploy dist/ folder
```

## 🎬 Demo & Screenshots

### 📹 Project Demonstration
[**Watch Full Demo Video**](https://youtu.be/O0dEew24_XM?si=XBNtTMTE5BO2LzJH) - Complete walkthrough of all features

### 📱 Application Screenshots

<div align="center">

#### 🔐 Authentication
![Login Interface](ImagesOutput/login.png)
*Secure user authentication with modern UI*

#### 🏠 Home Dashboard
![Home Page](ImagesOutput/home.png)
*Intelligent search with AI recommendations*

#### 🔍 Search Results
![Flight Results](ImagesOutput/result.png)
*Advanced filtering and real-time price comparison*

#### ✈️ Booking Process
![Passenger Booking](ImagesOutput/book.png)
*Streamlined booking with payment integration*

#### 🌍 Explore Features
![Explore Page](ImagesOutput/explore.png)
*Travel insights and destination discovery*

</div>

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

<div align="center">

| Developer | Role | GitHub |
|-----------|------|--------|
| **Sudhanshu Tripathi** | Lead Developer & UI/UX | [@sudhanshu-77](https://github.com/sudhanshu-77) |
| **Pankaj Ajmera** | Full Stack Developer | [@pankaj-ajmera](https://github.com/pankaj-ajmera) |
| **Rishit Gupta** | Frontend Developer | [@rishit-gupta](https://github.com/rishit-gupta) |
| **Akshat Maheswari** | Backend Developer | [@akshat-maheswari](https://github.com/akshat-maheswari) |

</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- Razorpay for payment processing
- OpenWeather for weather data
- Tailwind CSS for styling
- React community for amazing tools

## 📞 Support

If you have any questions or need help:
- 📧 Email: sudhanshu.tripathi77@example.com
- 💼 LinkedIn: [Sudhanshu Tripathi](https://www.linkedin.com/in/sudhanshu-tripathi77)
- 🐛 Issues: [GitHub Issues](https://github.com/sudhanshu-77/AirTracker/issues)

## 🗺️ Roadmap

- [ ] Real-time flight API integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Machine learning recommendations
- [ ] Blockchain loyalty program

---

<div align="center">
  <p><strong>Made with ❤️ by the AirTracker Team</strong></p>
  <p><a href="#top">⬆️ Back to Top</a></p>
</div>
