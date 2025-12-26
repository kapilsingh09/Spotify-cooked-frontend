# Spotify UI (Frontend)

A modern, sleek React + TypeScript web application that connects to Spotify and provides an AI-powered playlist roasting experience. Built with Vite, React 19, and TailwindCSS 4, this app features authentic Spotify-like UI/UX design.

## Features

- **Spotify Authentication**: Secure OAuth 2.0 login with Spotify
- **Playlist Dashboard**: View all your Spotify playlists in a beautiful grid layout
- **AI Playlist Roasting**: Get hilarious AI-generated roasts of your playlists
- **Spotify-Inspired Design**: Modern UI matching Spotify's aesthetic with dark theme
- **Smooth Animations**: Engaging animations powered by Motion (Framer Motion)
- **Responsive Design**: Fully responsive layout that works on all devices
- **TypeScript Support**: Full type safety for better development experience

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite (Rolldown)
- **Styling**: TailwindCSS 4.1
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Animations**: Motion (Framer Motion successor)
- **Icons**: Lucide React

## Project Structure

```
spotify-ui/
├── src/
│   ├── components/
│   │   ├── Login.tsx           # Login page with Spotify auth
│   │   ├── Dashboard.tsx       # Main dashboard showing playlists
│   │   ├── PlaylistCard.tsx    # Individual playlist card component
│   │   ├── Callback.tsx        # OAuth callback handler
│   │   └── CustomLoader.tsx    # Loading spinner component
│   ├── config/
│   │   └── api.ts             # API configuration and endpoints
│   ├── assets/                 # Images and static assets
│   ├── App.tsx                # Main app component with routing
│   ├── App.css               # App-level styles
│   ├── index.css             # Global styles and Tailwind directives
│   └── main.tsx              # Application entry point
├── public/                     # Static public assets
├── index.html                 # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. Navigate to the frontend directory:
```bash
cd spotify-ui
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `spotify-ui` directory:
```env
VITE_BACKEND_URL=http://localhost:3000
```

### Running the Development Server

```bash
npm run dev
```

The app will start on `http://localhost:5173` by default.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Login | Landing page with Spotify login |
| `/dashboard` | Dashboard | Main dashboard showing user playlists |
| `/callback` | Callback | OAuth callback handler (redirects to dashboard) |

## Key Components

### Login.tsx
The landing page featuring:
- Spotify-style branding and hero section
- "Login with Spotify" button
- Animated welcome message
- Responsive design with gradients

### Dashboard.tsx
Main application interface featuring:
- User profile display
- Playlist grid layout
- AI roast functionality
- Loading states and error handling
- Logout functionality

### PlaylistCard.tsx
Reusable playlist card component:
- Playlist cover image
- Playlist name and track count
- Hover animations
- "Roast Me" button
- Modal for displaying AI roasts

### Callback.tsx
OAuth flow handler:
- Processes Spotify callback
- Extracts authentication tokens
- Stores tokens in localStorage
- Redirects to dashboard

### CustomLoader.tsx
Loading spinner with Spotify branding:
- Animated logo loader
- Used during data fetching

## Styling

The application uses a Spotify-inspired color palette:

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

- **Dark Theme**: Authentic Spotify dark mode
- **Glassmorphism Effects**: Modern frosted glass UI elements
- **Smooth Transitions**: Hover and click animations
- **Gradient Accents**: Vibrant gradients for visual interest
- **Typography**: Clean, modern fonts

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BACKEND_URL` | Backend API URL | Yes |

**Note**: Vite exposes environment variables prefixed with `VITE_` to the client.

## Authentication Flow

1. User clicks "Login with Spotify" on the Login page
2. Backend redirects to Spotify authorization page
3. User authorizes the application
4. Spotify redirects back to `/callback` with auth code
5. Callback component extracts tokens and stores in localStorage
6. User is redirected to the Dashboard
7. Dashboard uses stored tokens to fetch user data and playlists

## API Integration

The app communicates with the backend API for:
- **Authentication**: OAuth flow and token management
- **Playlists**: Fetching user playlists from Spotify
- **AI Roasting**: Sending playlist data for AI-generated roasts

See `src/config/api.ts` for API endpoint configuration.

## State Management

The application uses React's built-in state management:
- **useState**: Component-level state
- **useEffect**: Side effects and data fetching
- **localStorage**: Persistent token storage
- **React Router**: Navigation state

## Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration for easy Vercel deployment:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

To deploy:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Environment Variables on Vercel

Set the following environment variable in your Vercel project settings:
- `VITE_BACKEND_URL`: Your production backend URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR - changes appear immediately without full page reload.

### TypeScript Type Checking
Run type checking separately:
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### "Login with Spotify" not working
- Verify backend is running
- Check `VITE_BACKEND_URL` in `.env`
- Ensure CORS is properly configured in backend

### Playlists not loading
- Check browser console for errors
- Verify access tokens in localStorage
- Ensure Spotify API permissions are granted

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Clear Vite cache: `.vite` directory

### Routing Issues in Production
- Ensure server is configured for SPA routing
- Verify `vercel.json` rewrites are applied

## Performance Optimizations

- **Code Splitting**: React Router handles automatic code splitting
- **Lazy Loading**: Images and components load on demand
- **Optimized Build**: Vite provides optimized production builds
- **Asset Optimization**: Images and assets are optimized during build

## Future Enhancements

- [ ] Recently played tracks
- [ ] Top artists and genres
- [ ] Playlist recommendations
- [ ] Social sharing features
- [ ] Advanced AI insights
- [ ] Custom playlist creation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Author

Karan Singh

---

**Enjoy roasting your playlists! 🎵🔥**
