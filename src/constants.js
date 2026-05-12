export const MENU_ITEMS = [
  {
    id: 'learning',
    icon: '📚',
    title: 'Học Tập',
    description: 'Nâng cao kỹ năng',
    color: 'from-orange-400 to-orange-600 via-orange-500',
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
    path: 'https://ngoquanhao2009.github.io/Stylesuggestionsforbichi/',
    external: true,
  },
  {
    id: 'game',
    icon: '🎮',
    title: 'Trò Chơi',
    description: 'Vui vẻ và thư giãn',
    color: 'from-blue-400 to-blue-600 via-blue-500',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
    image: '/baichoigame/images/game-logo.png',
    path: '/game',
    external: false,
  },
  {
    id: 'shop',
    icon: '🏪',
    title: 'Cửa Hàng',
    description: 'Mua sắm vật phẩm',
    color: 'from-pink-400 to-red-600 via-pink-500',
    gradient: 'bg-gradient-to-br from-pink-500 to-red-600',
    path: '/shop',
    external: false,
  },
];

export const QUICK_ACTIONS = [
  { icon: '⚙️', label: 'Cài đặt', color: 'from-purple-500 to-pink-500' },
  { icon: '❓', label: 'Trợ giúp', color: 'from-cyan-500 to-blue-500' },
];

export const USER_PROFILE = {
  name: 'Người Chơi',
  level: 12,
  xp: 2500,
  maxXp: 5000,
  coins: 2815,
  stars: 245,
  rank: 42,
};
