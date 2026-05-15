// Tiny event bus
const listeners = {};

export function on(event, cb) {
  listeners[event] = listeners[event] || [];
  listeners[event].push(cb);
  return () => off(event, cb);
}

export function off(event, cb) {
  if (!listeners[event]) return;
  const idx = listeners[event].indexOf(cb);
  if (idx >= 0) listeners[event].splice(idx, 1);
}

export function emit(event, payload) {
  if (!listeners[event]) return;
  listeners[event].slice().forEach(cb => { try { cb(payload); } catch(e) {} });
}

export default { on, off, emit };
