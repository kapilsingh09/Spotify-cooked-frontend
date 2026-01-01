# 🎵 Spotify UI - AI Playlist Roaster

A modern, sleek React + TypeScript web application that connects to Spotify and provides an AI-powered playlist roasting experience. Built with cutting-edge technologies including React 19, Vite, TailwindCSS 4, and powered by Google's Gemini AI for hilarious playlist roasts.

![Spotify UI](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- 🔐 **Spotify Authentication** - Secure OAuth 2.0 login with Spotify
- 📊 **Playlist Dashboard** - View all your Spotify playlists in a beautiful grid layout
- 🤖 **AI Playlist Roasting** - Get hilarious AI-generated roasts powered by Google Gemini
- 🎨 **Spotify-Inspired Design** - Authentic Spotify UI/UX with dark theme
- ✨ **Smooth Animations** - Engaging animations powered by Motion (Framer Motion)
- 📱 **Responsive Design** - Fully responsive layout that works on all devices
- 🔒 **TypeScript Support** - Full type safety for better development experience
- 🎬 **Background Videos** - Dynamic background videos for immersive experience

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Framework |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | 7.2.5 | Build Tool (Rolldown) |
| **TailwindCSS** | 4.1.17 | Styling |
| **React Router** | 7.9.6 | Routing |
| **Axios** | 1.13.2 | HTTP Client |
| **Motion** | 12.23.24 | Animations |
| **Lucide React** | 0.555.0 | Icons |

## 📁 Project Structure

```
spotify-ui/
├── src/
│   ├── components/
│   │   ├── Login.tsx           # Landing page with Spotify auth
│   │   ├── Dashboard.tsx       # Main dashboard showing playlists
│   │   ├── PlaylistCard.tsx    # Individual playlist card component
│   │   ├── Callback.tsx        # OAuth callback handler
│   │   └── CustomLoader.tsx    # Loading spinner component
│   ├── config/
│   │   └── api.ts             # API configuration and endpoints
│   ├── assets/                 # Images and video assets
│   │   ├── spotify.png        # Spotify logo
│   │   ├── vid1-6.mp4        # Background videos
│   │   └── ...
│   ├── App.tsx                # Main app component with routing
│   ├── App.css               # App-level styles
│   ├── index.css             # Global styles and Tailwind directives
│   └── main.tsx              # Application entry point
├── public/                     # Static public assets
├── index.html                 # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.js          # ESLint configuration
├── vercel.json               # Vercel deployment config
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend server** running (see backend README)
- **Spotify Developer Account** (for credentials)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd spotify-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `spotify-ui` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

### Running the Development Server

```bash
npm run dev
```

The app will start on **`http://localhost:5173`** by default.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🗺️ Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Login | Landing page with Spotify login |
| `/dashboard` | Dashboard | Main dashboard showing user playlists |
| `/callback` | Callback | OAuth callback handler (redirects to dashboard) |

## 🧩 Key Components

### 🔑 Login.tsx
The landing page featuring:
- Spotify-style branding with logo
- Dynamic background videos for visual appeal
- "Login with Spotify" button with gradient styling
- Animated welcome message using Motion
- Responsive design with glassmorphism effects

### 📊 Dashboard.tsx
Main application interface featuring:
- User profile display with avatar
- Grid layout showcasing all user playlists
- AI roast functionality with modal display
- Loading states with custom spinner
- Error handling and user feedback
- Logout functionality with token cleanup

### 🎴 PlaylistCard.tsx
Reusable playlist card component:
- Playlist cover image with fallback
- Playlist name and track count display
- Smooth hover animations and transitions
- "Roast Me" button for AI-generated roasts
- Modal for displaying roast results
- Responsive design for all screen sizes

### 🔄 Callback.tsx
OAuth flow handler:
- Processes Spotify OAuth callback
- Extracts authentication tokens from URL
- Stores tokens securely in localStorage
- Automatically redirects to dashboard
- Error handling for failed authentication

### ⏳ CustomLoader.tsx
Loading spinner component:
- Animated Spotify-themed loader
- Smooth rotation animations
- Used during data fetching operations
- Glassmorphism styling

## 🎨 Styling & Design

### Color Palette

The application uses an authentic Spotify-inspired color palette:

```css
:root {
  /* Primary Colors */
  --spotify-green: #1DB954;
  --spotify-black: #191414;
  --spotify-dark-gray: #121212;
  --spotify-gray: #282828;
  --spotify-light-gray: #535353;
  
  /* Text Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #B3B3B3;
}
```

### Design Features

- 🌙 **Dark Theme** - Authentic Spotify dark mode
- 💎 **Glassmorphism** - Modern frosted glass UI elements
- ✨ **Smooth Transitions** - Hover and click animations
- 🌈 **Gradient Accents** - Vibrant gradients for visual interest
- 📝 **Typography** - Clean, modern fonts
- 🎬 **Video Backgrounds** - Dynamic video elements

## 🔐 Authentication Flow

1. User clicks **"Login with Spotify"** on the Login page
2. Backend redirects to Spotify authorization page
3. User authorizes the application on Spotify
4. Spotify redirects back to `/callback` with authorization code
5. Callback component extracts tokens and stores in localStorage
6. User is redirected to the Dashboard
7. Dashboard uses stored tokens to fetch user data and playlists

## 🌐 API Integration

The app communicates with the backend API for:

- **Authentication** - OAuth flow and token management
- **User Data** - Fetching user profile information
- **Playlists** - Retrieving user playlists from Spotify API
- **AI Roasting** - Sending playlist data for Gemini AI-generated roasts

API configuration is managed in `src/config/api.ts`.

## 🔧 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_BACKEND_URL` | Backend API URL | Yes | `http://localhost:3000` |

> **Note**: Vite exposes environment variables prefixed with `VITE_` to the client bundle.

## 📦 State Management

The application uses React's built-in state management:

- **useState** - Component-level state management
- **useEffect** - Side effects and data fetching
- **localStorage** - Persistent token storage
- **React Router** - Navigation state management

## 🚀 Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration for seamless Vercel deployment:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Deploy to Vercel:**

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts

### Environment Variables on Vercel

Set the following in your Vercel project settings:
- `VITE_BACKEND_URL` - Your production backend URL

### Other Platforms

The built `dist/` folder can be deployed to:
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Firebase Hosting**
- Any static hosting service

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |

## 💡 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR - changes appear immediately without full page reload.

### TypeScript Type Checking
Run type checking during build:
```bash
npm run build
```

### Debugging
- Use React DevTools browser extension
- Check browser console for errors
- Inspect localStorage for token data

## 🐛 Troubleshooting

### "Login with Spotify" not working
- ✅ Verify backend is running on port 3000
- ✅ Check `VITE_BACKEND_URL` in `.env` file
- ✅ Ensure CORS is properly configured in backend
- ✅ Verify Spotify credentials in backend `.env`

### Playlists not loading
- ✅ Check browser console for error messages
- ✅ Verify access tokens exist in localStorage
- ✅ Ensure Spotify API permissions are granted
- ✅ Check network tab for failed API calls

### AI Roast not working
- ✅ Verify backend has `GEMINI_API_KEY` configured
- ✅ Check backend console for AI service errors
- ✅ Ensure playlist has enough data for roasting

### Build Errors
- ✅ Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json && npm install
  ```
- ✅ Clear Vite cache: Delete `.vite` directory
- ✅ Update dependencies: `npm update`

### Routing Issues in Production
- ✅ Ensure server is configured for SPA routing
- ✅ Verify `vercel.json` rewrites are applied
- ✅ Check that all routes redirect to `index.html`

## ⚡ Performance Optimizations

- **Code Splitting** - React Router handles automatic code splitting
- **Lazy Loading** - Components and images load on demand
- **Optimized Build** - Vite provides tree-shaking and minification
- **Asset Optimization** - Images and videos are optimized
- **Caching** - LocalStorage for token persistence

## 🎯 Future Enhancements

- [ ] Recently played tracks display
- [ ] Top artists and genres visualization
- [ ] Personalized playlist recommendations
- [ ] Social sharing features for roasts
- [ ] Advanced AI insights and analytics
- [ ] Custom playlist creation
- [ ] Dark/Light theme toggle
- [ ] Export roasts as images
- [ ] Multiple language support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## 📄 License

ISC

## 👤 Author

**Karan Singh**

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Google Gemini AI](https://ai.google.dev/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

<div align="center">
  <strong>Enjoy roasting your playlists! 🎵🔥</strong>
  <br/>
  <sub>Made with ❤️ and TypeScript</sub>
</div>
