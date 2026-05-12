# 🚀 Development Guide

Hướng dẫn phát triển cho dự án Bài Chòi Menu.

## 📋 Prerequisites

- Node.js >= 16.x
- npm >= 8.x (hoặc yarn/pnpm)
- Modern browser (Chrome, Firefox, Safari, Edge)

## 🏗️ Project Architecture

```
baichoi-game/
├── src/
│   ├── animations/
│   │   └── variants.js          # Framer Motion animation variants
│   ├── components/              # React components
│   │   ├── Background.jsx       # Background & particles
│   │   ├── TopBar.jsx           # Header bar
│   │   ├── MenuCard.jsx         # Menu card component
│   │   ├── MenuSection.jsx      # Menu grid layout
│   │   ├── BottomBar.jsx        # Footer bar
│   │   ├── AudioToggle.jsx      # Audio toggle button
│   │   └── Notifications.jsx    # Toast & Badge components
│   ├── hooks/
│   │   └── useSound.js          # Sound effect hook
│   ├── constants.js             # Game configuration & data
│   ├── App.jsx                  # Root component
│   ├── App.css                  # App styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── public/
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies
└── README.md                    # Project README

```

## 🛠️ Development Workflow

### Setup

```bash
# 1. Clone repository
git clone https://github.com/ngoquanhao2009/baichoigame.git
cd baichoigame

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173 (or shown port)
```

### Development

```bash
# Hot module replacement is enabled
# Edit files and changes appear instantly

# Check for errors
npm run build  # Performs type checking & bundling

# Format code
npm run format  # if configured
```

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview

# The dist/ folder contains production-ready files
```

## 🎨 Customization Guide

### Adding New Menu Items

Edit `src/constants.js`:

```javascript
export const MENU_ITEMS = [
  {
    id: 'learning',
    icon: '📚',
    title: 'Học Tập',
    description: 'Nâng cao kỹ năng',
    color: 'from-orange-400 to-orange-600 via-orange-500',
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
    path: '/learn',
  },
  // Add your new item here
  {
    id: 'custom',
    icon: '🆕',
    title: 'Tính năng mới',
    description: 'Mô tả',
    color: 'from-green-400 to-green-600 via-green-500',
    gradient: 'bg-gradient-to-br from-green-400 to-green-600',
    path: '/custom',
  },
];
```

### Changing Colors & Styles

**Global Colors** - Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Add custom colors
    },
  },
}
```

**Component Colors** - Edit component files directly:

```jsx
// Example: Change button color
<motion.button className="bg-gradient-to-r from-blue-500 to-blue-700">
  // Change to your color
</motion.button>
```

### Modifying Animations

**Animation Speed** - `tailwind.config.js`:

```javascript
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-15px)' }, // Adjust distance
  },
}
```

**Component Animation** - Use Framer Motion props:

```jsx
<motion.div
  animate={{ y: [0, -12, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Content
</motion.div>
```

### Adding Sound Effects

Edit `src/hooks/useSound.js`:

```javascript
export const useSound = () => {
  const playSound = (frequency = 600, duration = 0.3, type = 'sine') => {
    // Implementation
  };

  // Add new sound
  const playCustomSound = () => playSound(800, 0.2, 'sine');
  
  return { playSound, playCustomSound };
};
```

Use in component:

```javascript
import { useSound } from '../hooks/useSound';

export const MyComponent = () => {
  const { playCustomSound } = useSound();
  
  return (
    <button onClick={playCustomSound}>
      Click me
    </button>
  );
};
```

## 📱 Responsive Design

### Mobile First Approach

```jsx
// Default: mobile style
// md:* - Tablet (768px+)
// lg:* - Desktop (1024px+)

<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### Testing Responsive

```bash
# Use browser DevTools
# F12 -> Toggle device toolbar
# Test all viewport sizes:
# - iPhone (375px)
# - iPad (768px)
# - Desktop (1920px)
```

## ⚡ Performance Optimization

### Bundle Size

Current stats:
- CSS: ~26KB (4.88KB gzipped)
- JS: ~256KB (82.75KB gzipped)

Optimization tips:
- Remove unused components
- Tree-shake unused exports
- Lazy load heavy components
- Use code splitting

### Animation Performance

- Use GPU-accelerated properties: `transform`, `opacity`
- Avoid animating non-essential properties
- Limit particle count (currently 30 particles)
- Use `will-change` sparingly

## 🐛 Debugging

### DevTools

```bash
# React DevTools
# - Inspect components
# - Check props
# - Debug state

# Performance tab
# - Monitor frame rate
# - Check for jank
# - Profile animations
```

### Common Issues

**Port already in use:**
```bash
# Vite will auto-try next port
npm run dev

# Or specify port
npm run dev -- --port 3000
```

**Cannot find module:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Styling not applying:**
```bash
# Check Tailwind config is valid
npm run build  # Will show errors

# Verify class names are spelled correctly
# Tailwind only processes generated class names
```

## 📚 Dependencies

### Main Dependencies
- `react@^18.3.1` - UI framework
- `react-dom@^18.3.1` - React DOM
- `framer-motion@^10.16.16` - Animation library

### Dev Dependencies
- `vite@^5.0.8` - Build tool
- `tailwindcss@^3.4.1` - CSS framework
- `postcss@^8.4.33` - CSS processing
- `autoprefixer@^10.4.17` - CSS prefix

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add src/

# Commit
git commit -m "feat: add new feature"

# Push
git push origin feature/new-feature

# Create pull request on GitHub
```

## 📝 Code Style

- Use ES6+ features
- Use functional components
- Use hooks for state management
- Follow naming conventions:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_CASE

## 🚀 Deployment

### GitHub Pages

```bash
# 1. Build project
npm run build

# 2. Deploy dist folder to GitHub Pages
# Use GitHub Pages settings in repo

# Access at: https://username.github.io/baichoigame
```

### Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect repo to Vercel
# https://vercel.com

# 3. Auto-deploy on push
```

### Other Platforms

- Netlify
- Firebase Hosting
- AWS S3 + CloudFront
- Docker + Container hosting

## 📞 Support

For issues or questions:
- Check README.md
- Review existing GitHub issues
- Create new issue with details

---

**Happy Coding! 🎮**
