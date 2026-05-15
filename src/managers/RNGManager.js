// Lightweight RNG manager with Fisher-Yates shuffle and optional seed
export function cryptoSeed() {
  try {
    const arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    return (BigInt(arr[0]) << 32n) | BigInt(arr[1]);
  } catch (e) {
    return BigInt(Date.now());
  }
}

// mulberry32 PRNG seeded by 32-bit int
function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function shuffleArray(array, seed = null) {
  const arr = array.slice();
  const s = seed ? Number(seed & 0xffffffffn) : Math.floor(Math.random() * 2**32);
  const rand = mulberry32(s >>> 0);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default { cryptoSeed, shuffleArray };
