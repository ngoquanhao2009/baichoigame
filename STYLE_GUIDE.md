# 🎨 Style Guide

Hướng dẫn styling và quy ước code cho Bái Chọi Game.

## 📐 Tailwind CSS Classes

### Color Palette

```tailwind
-- Primary Brand Colors
Orange (Learning):   from-orange-400 to-orange-600
Blue (Games):        from-blue-500 to-blue-700
Pink/Red (Shop):     from-pink-500 to-red-600

-- UI Colors
Yellow (Coins):      from-yellow-400 to-orange-400
Purple (UI):         from-purple-500 to-pink-500
Cyan (UI):           from-cyan-500 to-blue-500

-- Neutral
White:               white, white/90, white/80, etc
Black:               black, black/40, black/50, etc
Gray:                gray-900 (dark bg)
```

### Gradient Classes

**Usage Pattern:**
```jsx
className="bg-gradient-to-br from-{color}-400 to-{color}-600"
```

**Examples:**
```jsx
// Learning (Orange)
"bg-gradient-to-br from-orange-400 to-orange-600"

// Games (Blue)
"bg-gradient-to-br from-blue-500 to-blue-700"

// Shop (Pink)
"bg-gradient-to-br from-pink-500 to-red-600"
```

### Shadow Classes

```tailwind
-- Built-in
shadow-lg       -- Large shadow (hover effects)
shadow-xl       -- Extra large shadow
shadow-2xl      -- Extra large shadow (popups)

-- Custom (in tailwind.config.js)
shadow-glow     -- 0 0 30px rgba(168, 85, 247, 0.6)
shadow-glow-lg  -- 0 0 50px rgba(168, 85, 247, 0.8)
```

### Opacity Classes

```tailwind
/10  -- 10% opacity (white/10)
/20  -- 20% opacity
/30  -- 30% opacity
/40  -- 40% opacity
etc...
```

### Responsive Classes

```tailwind
-- Mobile first (default styles apply to mobile)
sm:  -- 640px+
md:  -- 768px+
lg:  -- 1024px+
xl:  -- 1280px+
```

**Example:**
```jsx
className="text-sm md:text-base lg:text-lg"
// Mobile: small
// Tablet: base
// Desktop: large
```

## 🎬 Animation Classes

### Custom Animations

Defined in `tailwind.config.js`:

```javascript
animation: {
  float: 'float 3s ease-in-out infinite',
  bounce: 'bounce 0.6s ease-in-out',
  shine: 'shine 3s infinite',
  pulse: 'pulse 2s ease-in-out infinite',
}
```

### Usage

```jsx
// Float animation
<div className="animate-float">Content</div>

// Bounce animation
<div className="animate-bounce">Content</div>

// Shine animation
<div className="animate-shine">Content</div>
```

## 🎨 Component Styling Patterns

### Top Bar Component

```jsx
className={`
  fixed top-0 left-0 right-0 z-40
  px-4 py-3 md:px-6 md:py-4
`}
```

Pattern breakdown:
- `fixed` - Position fixed
- `top-0 left-0 right-0` - Full width at top
- `z-40` - Z-index for layering
- `px-4 py-3` - Padding (mobile)
- `md:px-6 md:py-4` - Padding (desktop)

### Button Styling

```jsx
className={`
  flex items-center gap-3
  bg-gradient-to-r from-blue-500 to-blue-700
  px-4 md:px-6 py-2 md:py-3
  rounded-full
  font-bold text-white
  shadow-lg
  border-2 border-white/40
  hover:shadow-lg transition-shadow
`}
```

Pattern breakdown:
- Layout: `flex items-center gap-3`
- Background: `bg-gradient-to-r from-X to-Y`
- Padding: `px-4 md:px-6 py-2 md:py-3`
- Shape: `rounded-full`
- Text: `font-bold text-white`
- Shadow: `shadow-lg`
- Border: `border-2 border-white/40`
- Hover: `hover:shadow-lg transition-shadow`

### Card Styling

```jsx
className={`
  relative
  h-40 md:h-56
  rounded-3xl overflow-hidden
  cursor-pointer
  transform transition-all
  group
`}
```

## 🎯 Spacing Conventions

### Padding

```tailwind
px-4     -- Horizontal padding (mobile)
md:px-6  -- Horizontal padding (desktop)
py-3     -- Vertical padding (mobile)
md:py-4  -- Vertical padding (desktop)
```

### Margins

```tailwind
mb-3     -- Margin bottom (mobile)
md:mb-4  -- Margin bottom (desktop)
gap-3    -- Gap in flex (mobile)
md:gap-4 -- Gap in flex (desktop)
```

### Border Radius

```tailwind
rounded-full     -- Circular (50%)
rounded-3xl      -- Large radius (24px)
rounded-2xl      -- Medium radius (16px)
rounded-lg       -- Small radius (8px)
```

## 🌈 Glassmorphism Pattern

```jsx
className={`
  bg-gradient-to-r
  from-white/15 via-white/10 to-white/15
  backdrop-blur-xl
  border border-white/30
`}
```

Components using this:
- TopBar
- BottomBar

## 🎪 Framer Motion Integration

### Hover Effects

```jsx
whileHover={{
  scale: 1.1,
  boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)',
}}
```

### Tap/Click Effects

```jsx
whileTap={{ scale: 0.95 }}
```

### Animations

```jsx
animate={{
  y: [0, -10, 0],
  opacity: [0.3, 0.7, 0.3],
}}
transition={{
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
}}
```

## 📝 Class Organization

### Recommended Order

```jsx
className={`
  // Position & Layout
  fixed top-0 left-0 right-0
  flex items-center justify-between
  
  // Sizing
  w-full h-screen
  px-4 py-3 md:px-6 md:py-4
  
  // Background & Colors
  bg-gradient-to-r from-blue-500 to-blue-700
  text-white
  
  // Shape
  rounded-full
  border-2 border-white/40
  
  // Effects
  shadow-lg
  hover:shadow-glow
  transition-shadow
  
  // State
  cursor-pointer
  z-40
  group
`}
```

## 🎯 Mobile First Philosophy

Always start with mobile, then add `md:`, `lg:` for larger screens:

```jsx
// ✅ Good - Mobile first
className="text-sm md:text-base lg:text-lg"

// ❌ Avoid - Desktop first (harder to read)
className="lg:text-lg md:text-base text-sm"
```

## 🎨 Dark Mode Ready

Current design uses:
- Light backgrounds with transparency
- White text on dark backgrounds
- Colorful gradients

For dark mode support, add to `tailwind.config.js`:

```javascript
darkMode: 'class',
```

Then use:
```jsx
className="dark:bg-gray-900 dark:text-white"
```

## 🔍 Debugging Classes

### Check Applied Styles

```bash
# In browser DevTools:
# 1. Inspect element
# 2. Look at "Styles" panel
# 3. Check Tailwind-generated classes
```

### Common Issues

**Classes not applying:**
- Check spelling (Tailwind is case-sensitive in some cases)
- Ensure class exists in `tailwind.config.js`
- Check for conflicting classes
- Verify file included in `content` array

**Hover effects not working:**
- Use `group` and `group-hover:` pattern
- Or use Framer Motion `whileHover`

## ✨ Best Practices

1. **Use consistent spacing**
   ```jsx
   // Good
   className="gap-4 md:gap-6"
   
   // Avoid
   className="gap-3 md:gap-7"
   ```

2. **Organize classes logically**
   - Position first
   - Layout second
   - Sizing third
   - Colors fourth
   - Effects last

3. **Use responsive classes**
   ```jsx
   // Good
   className="text-lg md:text-xl lg:text-2xl"
   
   // Avoid
   className="text-2xl"  // Same on all sizes
   ```

4. **Reuse gradient patterns**
   ```jsx
   // Define once, use everywhere
   const gradientOrange = "from-orange-400 to-orange-600"
   ```

5. **Keep classes readable**
   ```jsx
   // Good
   className={`
     w-full
     bg-gradient-to-r from-blue-500 to-blue-700
     px-4 py-2 md:px-6 md:py-3
     rounded-full
     text-white
     shadow-lg
   `}
   
   // Avoid
   className="w-full bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-white shadow-lg"
   ```

## 🚀 Performance Tips

1. **Avoid inline styles**
   ```jsx
   // Bad
   style={{ fontSize: '16px' }}
   
   // Good
   className="text-base"
   ```

2. **Use GPU-accelerated properties**
   ```jsx
   // Good (GPU-accelerated)
   transform: scale()
   opacity: 0.5
   
   // Avoid (CPU-intensive)
   left: 10px  // Use transform instead
   ```

3. **Limit animations**
   - Max 30 particles
   - Simple transforms
   - Debounce event listeners

---

**Remember:** Keep styles organized, readable, and performant! 🎯
