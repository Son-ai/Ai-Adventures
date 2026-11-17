"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#3fd0c9", "#f2b25c", "#e0549a", "#9b7bff"];

function Wings({ color }) {
  const upper = "C-8 -18 -24 -16 -22 -4 C-20 6 -8 6 0 0Z";
  const lower = "C-6 12 -16 16 -14 8 C-12 3 -6 1 0 2Z";
  const common = { fill: color, stroke: "#0d0b1e", strokeWidth: 2.4, strokeLinejoin: "round" };

  return (
    <svg width="46" height="34" viewBox="-23 -17 46 34" style={{ "--c": color }}>
      <g className="wing-l">
        <path d={`M0 0 ${upper} M0 2 ${lower}`} {...common} />
      </g>
      <g transform="scale(-1 1)">
        <g className="wing-r">
          <path d={`M0 0 ${upper} M0 2 ${lower}`} {...common} />
        </g>
      </g>
      <ellipse cx="0" cy="0" rx="2" ry="8" fill="#0d0b1e" />
    </svg>
  );
}

export default function Butterflies({ count = 10 }) {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let { width, height } = wrap.getBoundingClientRect();
    const mouse = { x: width / 2, y: height / 2, on: false };

    const flies = itemRefs.current.map((el, i) => ({
      el,
      x: Math.random() * width,
      y: Math.random() * height,
      tx: Math.random() * width,
      ty: Math.random() * height * 0.85,
      s: 0.7 + Math.random() * 0.7,
      a: 0,
      t: Math.random() * 100,
      follows: i % 3 === 0,
    }));

    const place = (b) => {
      b.el.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${b.a}deg) scale(${b.s})`;
    };
    flies.forEach(place);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onResize = () => {
      ({ width, height } = wrap.getBoundingClientRect());
    };
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    };

    let raf;
    const tick = () => {
      flies.forEach((b) => {
        b.t += 0.02;
        if (Math.hypot(b.tx - b.x, b.ty - b.y) < 30) {
          if (mouse.on && b.follows) {
            b.tx = mouse.x + (Math.random() - 0.5) * 160;
            b.ty = mouse.y + (Math.random() - 0.5) * 160;
          } else {
            b.tx = Math.random() * width;
            b.ty = Math.random() * height * 0.85;
          }
        }
        const dx = b.tx - b.x;
        const dy = b.ty - b.y;
        const d = Math.hypot(dx, dy) || 1;
        b.x += (dx / d) * 1.1 + Math.sin(b.t * 3) * 0.8;
        b.y += (dy / d) * 1.1 + Math.cos(b.t * 2.3) * 0.8;
        const ang = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        b.a += (((ang - b.a + 540) % 360) - 180) * 0.05;
        place(b);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [count]);

  return (
    <div className="butterflies" ref={wrapRef} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="butterfly"
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
        >
          <Wings color={COLORS[i % COLORS.length]} />
        </div>
      ))}
    </div>
  );
}
