# 🚀 Deployment Guide

This guide covers various deployment options for AirTracker.

## 📋 Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Build passes without errors
- [ ] All tests pass
- [ ] PWA manifest is properly configured
- [ ] Service worker is registered
- [ ] Performance optimizations applied

## 🌐 Deployment Platforms

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Environment Variables**
   - Add environment variables in Vercel dashboard
   - Or use `vercel env` command

### Netlify

1. **Build Command**
   ```bash
   npm run build
   ```

2. **Publish Directory**
   ```
   dist
   ```

3. **Redirects** (Create `_redirects` file in public folder)
   ```
   /*    /index.html   200
   ```

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run**
   ```bash
   docker build -t airtracker .
   docker run -p 3000:80 airtracker
   ```

## ⚙️ Environment Configuration

### Production Environment Variables

```env
# API Configuration
REACT_APP_API_URL=https://api.airtracker.com
REACT_APP_WEATHER_API_KEY=your_production_weather_key
REACT_APP_FLIGHT_API_KEY=your_production_flight_key

# Firebase (Production)
REACT_APP_FIREBASE_API_KEY=your_prod_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=airtracker-prod.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=airtracker-prod

# Payment Gateways
REACT_APP_RAZORPAY_KEY_ID=your_prod_razorpay_key
REACT_APP_STRIPE_PUBLIC_KEY=your_prod_stripe_key

# Analytics
REACT_APP_GA_TRACKING_ID=your_ga_tracking_id

# Production Settings
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=error
```

## 🔧 Build Optimization

### Performance Optimizations

1. **Code Splitting**
   ```javascript
   const LazyComponent = React.lazy(() => import('./Component'))
   ```

2. **Bundle Analysis**
   ```bash
   npm run analyze
   ```

3. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Optimize image sizes

### PWA Configuration

1. **Service Worker Registration**
   ```javascript
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js')
   }
   ```

2. **Manifest Configuration**
   - Ensure all icon sizes are available
   - Configure proper start_url
   - Set appropriate display mode

## 📊 Monitoring & Analytics

### Performance Monitoring

1. **Web Vitals**
   ```javascript
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
   
   getCLS(console.log)
   getFID(console.log)
   getFCP(console.log)
   getLCP(console.log)
   getTTFB(console.log)
   ```

2. **Error Tracking**
   - Implement Sentry or similar
   - Monitor console errors
   - Track user interactions

### SEO Optimization

1. **Meta Tags**
   ```html
   <meta name="description" content="Modern flight booking platform">
   <meta property="og:title" content="AirTracker">
   <meta property="og:description" content="Book flights with ease">
   ```

2. **Structured Data**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "WebApplication",
     "name": "AirTracker",
     "description": "Flight booking platform"
   }
   ```

## 🔒 Security Considerations

### Production Security

1. **Environment Variables**
   - Never commit sensitive keys
   - Use platform-specific secret management
   - Rotate keys regularly

2. **Content Security Policy**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline'">
   ```

3. **HTTPS Configuration**
   - Force HTTPS redirects
   - Implement HSTS headers
   - Use secure cookies

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify environment variables

2. **PWA Issues**
   - Validate manifest.json
   - Check service worker registration
   - Verify HTTPS configuration

3. **Performance Issues**
   - Analyze bundle size
   - Implement code splitting
   - Optimize images and assets

### Debug Commands

```bash
# Check build output
npm run build -- --debug

# Analyze bundle
npm run analyze

# Test PWA features
npm run build && npm run preview
```

## 📈 Post-deployment

### Monitoring Checklist

- [ ] Application loads correctly
- [ ] All routes work properly
- [ ] PWA features function
- [ ] Performance metrics are acceptable
- [ ] Error tracking is active
- [ ] Analytics are collecting data

### Maintenance

1. **Regular Updates**
   - Update dependencies monthly
   - Monitor security advisories
   - Test in staging environment

2. **Performance Monitoring**
   - Track Core Web Vitals
   - Monitor error rates
   - Analyze user behavior

3. **Backup Strategy**
   - Regular database backups
   - Code repository backups
   - Configuration backups

---

For specific deployment issues, check the platform documentation or create an issue in the repository.