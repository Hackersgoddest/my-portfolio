// One requestAnimationFrame loop for the whole page: Lenis's smooth scroll and
// the 3D scene tick from the same frame, in that order, so the camera always
// draws the scroll position of this frame (no one-frame lag, one rAF in the
// performance panel). Motion runs its own WAAPI animations off this loop.

type Tick = (now: number) => void;

const ticks: Tick[] = [];
let raf = 0;

function loop(now: number) {
  raf = requestAnimationFrame(loop);
  for (const tick of ticks) tick(now);
}

/** Runs `tick` every frame (in the order added) until the returned stop(). */
export function addTick(tick: Tick, { first = false } = {}) {
  if (first) ticks.unshift(tick);
  else ticks.push(tick);
  if (!raf) raf = requestAnimationFrame(loop);
  return () => {
    const index = ticks.indexOf(tick);
    if (index >= 0) ticks.splice(index, 1);
    if (!ticks.length) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
