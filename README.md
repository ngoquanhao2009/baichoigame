# 🎮 Bái Chọi Game - Menu Interface

Giao diện game menu Interactive học tập vui nhộn, hiện đại và bóng bẩy cho web/mobile.

## ✨ Features

- 🎨 **Giao diện hiện đại** với gradient tươi sáng, tropical island background
- 🎯 **3 Menu Card chính**: Học Tập, Trò Chơi, Cửa Hàng
- ✨ **Hiệu ứng 3D** với shadow mềm, nổi, hover animation
- 🎵 **Sound Effects** - click & hover sounds
- 💫 **Particle Animation** - background particles bay động
- 📱 **Responsive Design** - Mobile first, scale tốt trên desktop
- 🎬 **Smooth Animations** - Framer Motion animations
- 🌈 **Glassmorphism Effects** - kính mờ cho top/bottom bar
- 🔆 **Glow Effects** - shine animation trên hover
- ⚡ **Performance Optimized** - ~255KB gzipped

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Web Audio API** - Sound effects

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/ngoquanhao2009/baichoigame.git
cd baichoigame

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Usage

Dev server chạy tại: `http://localhost:5173` (hoặc port khác nếu 5173 đã bị dùng)

### Project Structure

```
src/
├── components/
│   ├── Background.jsx       - Background & particles
│   ├── TopBar.jsx           - Top bar với avatar, level, coins
│   ├── MenuCard.jsx         - Menu card component
│   ├── MenuSection.jsx      - Menu cards layout
│   └── BottomBar.jsx        - Bottom bar với profile & rewards
├── hooks/
│   └── useSound.js          - Sound effect utility
├── constants.js             - Game data & config
├── App.jsx                  - Main app component
├── App.css                  - App styles
├── index.css                - Global styles
└── main.jsx                 - Entry point
```

## 🎨 Customization

### Thay đổi Menu Items

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
  // Add more items...
];
```

### Thay đổi User Profile

```javascript
export const USER_PROFILE = {
  name: 'Tên Người Chơi',
  level: 12,
  xp: 2500,
  maxXp: 5000,
  coins: 2815,
  stars: 245,
  rank: 42,
};
```

### Thay đổi Animation Speed

Edit `tailwind.config.js` keyframes:

```javascript
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-15px)' }, // Adjust height
  },
}
```

## 🎬 Animation Details

| Animation | Duration | Effect |
|-----------|----------|--------|
| Float | 3s | Floating menu cards |
| Shine | 3s | Shine effect on hover |
| Particle | 4-8s | Background particles |
| Bounce | 0.6s | Button hover animation |
| Pulse | 2s | Icon pulse animation |

## 📱 Responsive Breakpoints

- **Mobile**: 0 - 640px (single column)
- **Tablet**: 641px - 1024px (adaptive)
- **Desktop**: 1025px+ (3 column grid)

## 🔧 Configuration

### Tailwind Config
- Custom animations: `float`, `shine`, `pulse`, `bounce`
- Custom shadows: `glow`, `glow-lg`
- Theme extensions: custom keyframes

### Vite Config
- React plugin enabled
- Hot module replacement
- Optimized build

## 🎵 Sound Effects

Game hỗ trợ 3 loại sound:
- **Click Sound**: freq 700Hz, duration 0.15s
- **Hover Sound**: freq 600Hz, duration 0.1s  
- **Success Sound**: 3 freq ramp-up

Disable sounds bằng cách comment code trong components.

## 📊 Performance

- **Bundle Size**: ~255KB (gzipped: 82KB)
- **Modules**: 329 transformed
- **CSS Size**: ~24KB
- **JS Size**: ~255KB

## 🐛 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Mobile Browsers: ✅ Touch optimized

## 📝 License

MIT License - see LICENSE file

## 👨‍💻 Author

**Bái Chọi Game** - Learning game with modern UI

---

**Made with ❤️ using React + Framer Motion + Tailwind CSS**

gamebaichoi
