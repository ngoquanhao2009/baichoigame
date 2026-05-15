export async function preloadImages(urls = []) {
  const promises = urls.map(u => new Promise((res) => {
    const img = new Image(); img.onload = () => res(true); img.onerror = () => res(false); img.src = u;
  }));
  return Promise.all(promises);
}

export async function preloadAudio(urls = []) {
  const promises = urls.map(u => new Promise((res) => {
    try {
      const a = new Audio(); a.oncanplaythrough = () => res(true); a.onerror = () => res(false); a.src = u;
    } catch (e) { res(false); }
  }));
  return Promise.all(promises);
}

export default { preloadImages, preloadAudio };
