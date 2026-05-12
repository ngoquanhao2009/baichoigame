# 🚀 Quick Start Guide

Hướng dẫn nhanh để chạy Bài Chòi ngay lập tức!

## ⚡ 30 Second Setup

```bash
# 1. Clone repo
git clone https://github.com/ngoquanhao2009/baichoigame.git
cd baichoigame

# 2. Install & Run
npm install && npm run dev

# 3. Open browser
# Visit http://localhost:5173
```

**Done!** 🎉

## 📋 System Requirements

- **Node.js**: 16.x or newer
- **npm**: 8.x or newer
- **Browser**: Chrome, Firefox, Safari, Edge (any modern browser)
- **OS**: Windows, Mac, Linux

Check your versions:
```bash
node --version    # Should be >= v16.0.0
npm --version     # Should be >= 8.0.0
```

## 🎯 Available Commands

```bash
# Development - Hot reload enabled
npm run dev

# Production Build
npm run build

# Preview production build
npm run preview

# Format code (if configured)
npm run format
```

## 🎮 First Time Playing

1. **Open the app** at `http://localhost:5173`
2. **See the menu** with three options:
   - 📚 Học Tập (Learning)
   - 🎮 Trò Chơi (Games)
   - 🏪 Cửa Hàng (Shop)
3. **Hover over cards** to see animations
4. **Click cards** to hear sound effects
5. **Use top bar** to check your level and coins
6. **Use bottom bar** for profile and rewards

## 🔧 Configuration

### Change Game Data

Edit `src/constants.js`:

```javascript
// Add new menu item
export const MENU_ITEMS = [
  // ... existing items
  {
    id: 'your-feature',
    icon: '🆕',
    title: 'Your Feature',
    description: 'Your description',
    color: 'from-green-400 to-green-600 via-green-500',
    gradient: 'bg-gradient-to-br from-green-400 to-green-600',
  },
];
```

### Change User Profile

```javascript
export const USER_PROFILE = {
  name: 'Your Name',
  level: 10,
  xp: 1500,
  maxXp: 5000,
  coins: 1000,
};
```

## 🎨 Customization Examples

### Change Menu Card Icon

Before:
```jsx
icon: '📚',  // Book
```

After:
```jsx
icon: '⚡',  // Lightning
```

### Change Color Theme

Before:
```jsx
gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
```

After:
```jsx
gradient: 'bg-gradient-to-br from-purple-400 to-purple-600',
```

### Change Animation Speed

Edit `src/components/BackgroundBackground.jsx`:

```jsx
transition={{
  duration: 15,  // Slower gradient animation
  repeat: Infinity,
}}
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Vite will auto-try next port, or specify one:
npm run dev -- --port 3000
```

### Changes Not Updating

```bash
# Clear cache and restart
rm -rf node_modules
npm install
npm run dev
```

### Build Errors

```bash
# Check for syntax errors
npm run build

# View full error output
```

## 📱 Testing on Mobile

### Method 1: Local Network
```bash
# Run dev with host
npm run dev -- --host

# Access from mobile on same network
# Example: http://your-ip:5173
```

### Method 2: DevTools
```bash
# Open DevTools: F12 or Ctrl+Shift+I
# Toggle device toolbar: Ctrl+Shift+M
# Test different screen sizes
```

## 🚀 Deployment

### GitHub Pages

```bash
# Build
npm run build

# Deploy dist/ folder to GitHub Pages
# Use GitHub's settings to deploy from dist/
```

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git push

# 2. Connect to Vercel at vercel.com
# 3. Auto-deploys on every push!
```

### Netlify

```bash
# Similar to Vercel:
# 1. Push to GitHub
# 2. Connect at netlify.com
# 3. Auto-deploys!
```

## 📚 Next Steps

1. **Read full docs**: See [README.md](./README.md)
2. **Learn customization**: Check [DEVELOPMENT.md](./DEVELOPMENT.md)
3. **See all features**: View [FEATURES.md](./FEATURES.md)
4. **Check updates**: Read [CHANGELOG.md](./CHANGELOG.md)

## 💡 Tips

- ✅ Animations are GPU-optimized for smooth performance
- ✅ Sound effects use Web Audio API
- ✅ Fully responsive - works great on mobile
- ✅ Uses Tailwind CSS for easy styling
- ✅ Framer Motion for smooth animations
- ✅ React 18 with modern hooks

## 🎉 You're Ready!

Start building amazing games! 🚀

---

**Need help?** Check github issues or read the full documentation.

**Happy coding!** 💻
