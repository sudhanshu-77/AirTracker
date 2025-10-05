# 🛫 AirTracker - Modern Flight Booking Platform

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-green.svg)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple.svg)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive, modern flight booking platform built with React, featuring real-time flight tracking, price alerts, multi-city planning, and PWA capabilities.

## 🌟 Features

### ✈️ Core Functionality
- **Smart Flight Search** - AI-powered search with personalized recommendations
- **Real-time Booking** - Instant flight booking with multiple payment options
- **Multi-city Planning** - Complex itinerary planning with route optimization
- **Price Alerts** - Smart price monitoring with notifications
- **Flight Tracking** - Real-time flight status and updates

### 🎯 Advanced Features
- **Weather Insights** - Destination weather and travel recommendations
- **Group Booking** - Travel companion features with split payments
- **Boarding Pass Wallet** - Digital boarding pass management
- **Currency Converter** - Multi-currency support
- **Dark Mode** - System preference detection

### 📱 Modern Experience
- **Progressive Web App (PWA)** - App-like experience with offline support
- **Responsive Design** - Optimized for all devices
- **Enhanced Loading States** - Skeleton screens and smooth animations
- **Push Notifications** - Real-time alerts and updates

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudhanshu-77/AirTracker.git
   cd AirTracker/AirTracker/AirTracker01
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── Components/           # React components
│   ├── Core/            # Core functionality components
│   ├── Features/        # Feature-specific components
│   ├── Layout/          # Layout components
│   └── UI/              # Reusable UI components
├── hooks/               # Custom React hooks
├── services/            # API and external services
├── utils/               # Utility functions
├── styles/              # Global styles
└── assets/              # Static assets
```

## 🛠️ Built With

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome
- **Routing**: React Router
- **State Management**: React Context
- **Notifications**: React Toastify
- **Build Tool**: Vite
- **PWA**: Workbox

## 📱 PWA Features

AirTracker is a fully-featured Progressive Web App:

- **Offline Support** - Access bookings and boarding passes offline
- **Install Prompts** - Native app-like installation
- **Push Notifications** - Real-time flight updates
- **Background Sync** - Automatic data synchronization

## 🎨 Screenshots

### Desktop Experience
![Home Page](screenshots/home-desktop.png)
![Flight Search](screenshots/search-desktop.png)

### Mobile Experience
![Mobile Home](screenshots/home-mobile.png)
![Mobile Search](screenshots/search-mobile.png)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_url
REACT_APP_WEATHER_API_KEY=your_weather_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

### Firebase Setup (Optional)

1. Create a Firebase project
2. Enable Authentication and Firestore
3. Add your configuration to `.env`

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker
```bash
docker build -t airtracker .
docker run -p 3000:3000 airtracker
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sudhanshu Tripathi**
- LinkedIn: [sudhanshu-tripathi77](https://www.linkedin.com/in/sudhanshu-tripathi77)
- GitHub: [sudhanshu-77](https://github.com/sudhanshu-77)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- FontAwesome for the beautiful icons
- All contributors and supporters

## 📈 Roadmap

- [ ] Real API integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Blockchain-based loyalty program

---

⭐ **Star this repository if you found it helpful!**