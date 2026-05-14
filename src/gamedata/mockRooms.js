export const MOCK_ROOMS = [
  {
    id: 'BAICHOI-2401',
    name: 'Sân Đình Hội An',
    players: 3,
    maxPlayers: 4,
    bet: 5000,
    status: 'playing',
    owner: 'Minh',
    isPublic: true,
  },
  {
    id: 'BAICHOI-5847',
    name: 'Phố Cổ Hàng Ngang',
    players: 2,
    maxPlayers: 4,
    bet: 10000,
    status: 'waiting',
    owner: 'Huyền',
    isPublic: true,
  },
  {
    id: 'BAICHOI-9123',
    name: 'Chơi Tây Hồ',
    players: 4,
    maxPlayers: 4,
    bet: 2000,
    status: 'full',
    owner: 'Trung',
    isPublic: true,
  },
  {
    id: 'BAICHOI-4502',
    name: 'Đêm Festival Tết',
    players: 1,
    maxPlayers: 4,
    bet: 7000,
    status: 'waiting',
    owner: 'Quân',
    isPublic: true,
  },
];

export const RANK_TIERS = [
  { name: 'Đồng', icon: '🥉', color: 'from-amber-600 to-amber-700', minPoints: 0 },
  { name: 'Bạc', icon: '🥈', color: 'from-gray-400 to-gray-500', minPoints: 1000 },
  { name: 'Vàng', icon: '🥇', color: 'from-yellow-400 to-yellow-500', minPoints: 2500 },
  { name: 'Kim Cương', icon: '💎', color: 'from-blue-400 to-cyan-500', minPoints: 5000 },
];

export const PLAYER_STATS = {
  name: 'Người Chơi',
  coin: 2815,
  level: 12,
  rank: 'Vàng',
  rankPoints: 3200,
  wins: 45,
  losses: 28,
  totalGames: 73,
};
