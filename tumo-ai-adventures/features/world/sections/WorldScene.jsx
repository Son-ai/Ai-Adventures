import "../world.css";

/* [x, y, scale] — հեռու սոճիներ */
const farPines = [
  [60, 498, 0.55], [160, 470, 0.5], [250, 466, 0.6], [340, 490, 0.5],
  [900, 438, 0.5], [1000, 428, 0.6], [1100, 452, 0.5], [1170, 488, 0.6],
];

const trees = [
  { id: "tree", x: 130, y: 610, s: 1 },
  { id: "tree", x: 300, y: 592, s: 0.7 },
  { id: "tree", x: 950, y: 640, s: 0.8 },
  { id: "tree", x: 1090, y: 622, s: 0.95 },
];

const pines = [
  { id: "pine", x: 40, y: 625, s: 0.9 },
  { id: "pine", x: 220, y: 604, s: 0.8 },
  { id: "pine", x: 400, y: 612, s: 0.7 },
  { id: "pine", x: 860, y: 652, s: 0.7 },
  { id: "pine", x: 1000, y: 642, s: 0.9 },
  { id: "pine", x: 1170, y: 645, s: 1.1 },
];

const front = [
  { id: "bigleaf", x: 40, y: 800, s: 1.3 },
  { id: "bigleaf", x: 80, y: 800, s: 1, r: 28 },
  { id: "bigleaf", x: 1160, y: 800, s: 1.3, flip: true },
  { id: "bigleaf", x: 1120, y: 800, s: 1, r: -28, flip: true },
  { id: "fern", x: 25, y: 790, s: 1.3 },
  { id: "fern", x: 420, y: 748, s: 0.9 },
  { id: "fern", x: 690, y: 752, s: 0.8, flip: true },
  { id: "fern", x: 880, y: 772, s: 1 },
  { id: "fern", x: 1175, y: 790, s: 1.3, flip: true },
  { id: "tuft", x: 70, y: 742, s: 1 },
  { id: "tuft", x: 200, y: 722, s: 1 },
  { id: "tuft", x: 460, y: 730, s: 0.9 },
  { id: "tuft", x: 600, y: 728, s: 1 },
  { id: "tuft", x: 960, y: 752, s: 1.1 },
  { id: "tuft", x: 1090, y: 748, s: 1 },
  { id: "flower", x: 60, y: 768, s: 1.1, fill: "#e0549a" },
  { id: "flower", x: 150, y: 748, s: 1, fill: "#f2b25c" },
  { id: "flower", x: 240, y: 772, s: 1.1, fill: "#9b7bff" },
  { id: "flower", x: 520, y: 742, s: 1, fill: "#f2b25c" },
  { id: "flower", x: 575, y: 768, s: 1.1, fill: "#e0549a" },
  { id: "flower", x: 760, y: 762, s: 1, fill: "#9b7bff" },
  { id: "flower", x: 940, y: 778, s: 1.1, fill: "#f2b25c" },
  { id: "flower", x: 1040, y: 772, s: 1, fill: "#3fd0c9" },
  { id: "flower", x: 1130, y: 758, s: 1.1, fill: "#e0549a" },
];

const vines = [
  { id: "vine", x: 60, y: 0, s: 1.1 }, { id: "vine", x: 170, y: 0, s: 0.8 },
  { id: "vine", x: 300, y: 0, s: 1 }, { id: "vine", x: 420, y: 0, s: 0.6 },
  { id: "vine", x: 800, y: 0, s: 0.7 }, { id: "vine", x: 920, y: 0, s: 1.1 },
  { id: "vine", x: 1040, y: 0, s: 0.8 }, { id: "vine", x: 1150, y: 0, s: 1.2 },
];

const fireflies = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: 30 + ((i * 53) % 55),
  delay: -(i % 6) * 1.3,
  dur: 5 + (i % 4),
}));

function Plant({ id, x, y, s = 1, r = 0, flip, fill, i, cls }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${flip ? -s : s} ${s})`}>
      <use
        href={`#${id}`}
        className={cls}
        fill={fill}
        style={cls ? { animationDelay: `${-(i % 6) * 1.1}s` } : undefined}
      />
    </g>
  );
}

export default function WorldScene() {
  return (
    <>
      <svg
        className="world-scene"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14122b" />
            <stop offset=".6" stopColor="#3a2250" />
            <stop offset="1" stopColor="#8a3f6b" />
          </linearGradient>
          <radialGradient id="moonglow">
            <stop offset="0" stopColor="#f6efe3" stopOpacity=".5" />
            <stop offset="1" stopColor="#f6efe3" stopOpacity="0" />
          </radialGradient>

          <g id="tuft" stroke="#0d0b1e" strokeWidth="3.5" strokeLinejoin="round" fill="#2f8a80">
            <path d="M-22 0 L-18 -34 L-10 -8 L-6 -48 L2 -10 L8 -40 L12 -8 L22 -30 L20 0Z" />
          </g>

          <g id="fern" stroke="#0d0b1e" strokeWidth="3.5" strokeLinejoin="round" fill="#3fd0c9">
            <path d="M0 0 C-4 -50 6 -90 30 -120" fill="none" strokeWidth="4" />
            <path d="M0 -20 Q-28 -22 -40 -44 Q-12 -46 0 -20Z" />
            <path d="M-1 -45 Q-26 -50 -36 -72 Q-10 -72 -1 -45Z" fill="#2f8a80" />
            <path d="M5 -70 Q-16 -80 -22 -100 Q2 -96 5 -70Z" />
            <path d="M1 -28 Q30 -30 42 -52 Q14 -54 1 -28Z" fill="#2f8a80" />
            <path d="M2 -55 Q28 -62 36 -84 Q10 -84 2 -55Z" />
            <path d="M10 -85 Q32 -96 34 -116 Q12 -108 10 -85Z" fill="#2f8a80" />
          </g>

          <g id="flower" stroke="#0d0b1e" strokeWidth="3" strokeLinejoin="round">
            <path d="M0 0 C2 -20 -2 -34 0 -50" fill="none" strokeWidth="4" />
            <path d="M0 -22 Q-16 -26 -20 -38 Q-4 -38 0 -22Z" fill="#2f8a80" />
            <circle cx="0" cy="-66" r="9" />
            <circle cx="10" cy="-58" r="9" />
            <circle cx="-10" cy="-58" r="9" />
            <circle cx="6" cy="-47" r="9" />
            <circle cx="-6" cy="-47" r="9" />
            <circle cx="0" cy="-56" r="6" fill="#f6efe3" />
          </g>

          <g id="pine" stroke="#0d0b1e" strokeWidth="4" strokeLinejoin="round" fill="#1f6b63">
            <rect x="-8" y="-30" width="16" height="30" fill="#3a2a3f" />
            <path d="M-50 -30 L0 -110 L50 -30Z" />
            <path d="M-42 -70 L0 -150 L42 -70Z" fill="#2a8b80" />
            <path d="M-32 -110 L0 -190 L32 -110Z" fill="#3fd0c9" />
          </g>

          <g id="tree" stroke="#0d0b1e" strokeWidth="5" strokeLinejoin="round">
            <path d="M-14 0 C-18 -70 8 -110 -6 -170 C26 -140 28 -70 16 0Z" fill="#3a2a3f" />
            <circle cx="-4" cy="-190" r="66" fill="#2f8a80" />
            <circle cx="52" cy="-168" r="46" fill="#3fd0c9" />
            <circle cx="-56" cy="-160" r="44" fill="#2a7770" />
          </g>

          <g id="bigleaf" stroke="#0d0b1e" strokeWidth="4" strokeLinejoin="round" fill="#1e4a4a">
            <path d="M0 0 C-60 -40 -90 -120 -40 -190 C20 -140 30 -60 0 0Z" />
            <path d="M0 0 C-30 -60 -38 -120 -40 -190" fill="none" stroke="#3fd0c9" strokeWidth="3" />
          </g>

          <g id="vine" stroke="#0d0b1e" strokeWidth="3.5" strokeLinejoin="round">
            <path d="M0 0 C-14 60 14 120 0 190" fill="none" strokeWidth="4" />
            <ellipse cx="-12" cy="40" rx="13" ry="7" fill="#2f8a80" transform="rotate(-30 -12 40)" />
            <ellipse cx="12" cy="75" rx="13" ry="7" fill="#3fd0c9" transform="rotate(30 12 75)" />
            <ellipse cx="-12" cy="110" rx="13" ry="7" fill="#2a7770" transform="rotate(-30 -12 110)" />
            <ellipse cx="11" cy="145" rx="12" ry="6" fill="#2f8a80" transform="rotate(30 11 145)" />
            <circle cx="0" cy="192" r="6" fill="#f2b25c" />
          </g>
        </defs>

        <rect width="1200" height="800" fill="url(#sky)" />
        <g className="stars" fill="#f6efe3">
          <circle cx="120" cy="90" r="2" />
          <circle cx="260" cy="170" r="1.5" style={{ animationDelay: "1s" }} />
          <circle cx="430" cy="60" r="2" style={{ animationDelay: "2s" }} />
          <circle cx="640" cy="130" r="1.5" style={{ animationDelay: ".5s" }} />
          <circle cx="780" cy="210" r="1.5" style={{ animationDelay: "2.5s" }} />
          <circle cx="1090" cy="160" r="1.5" />
        </g>
        <circle cx="930" cy="190" r="170" fill="url(#moonglow)" />
        <circle cx="930" cy="190" r="70" fill="#f6efe3" stroke="#0d0b1e" strokeWidth="5" />
        <circle cx="908" cy="172" r="12" fill="#e2d6c4" />
        <circle cx="955" cy="215" r="8" fill="#e2d6c4" />

        <path d="M0 520 Q200 400 400 500 T800 470 T1200 500 V800 H0Z" fill="#2c1d4a" stroke="#0d0b1e" strokeWidth="5" />
        <g opacity=".75">
          {farPines.map(([x, y, s], i) => (
            <Plant key={i} id="pine" x={x} y={y} s={s} i={i} />
          ))}
        </g>

        <g className="lamp"><ellipse cx="220" cy="330" rx="16" ry="22" fill="#f2b25c" stroke="#0d0b1e" strokeWidth="4" /></g>
        <g className="lamp" style={{ animationDelay: "2s" }}><ellipse cx="1040" cy="380" rx="13" ry="18" fill="#f2b25c" stroke="#0d0b1e" strokeWidth="4" /></g>
        <g className="lamp" style={{ animationDelay: "4s" }}><ellipse cx="700" cy="300" rx="11" ry="15" fill="#f2b25c" stroke="#0d0b1e" strokeWidth="4" /></g>

        <path d="M0 600 Q250 480 520 580 T1200 560 V800 H0Z" fill="#1e4a4a" stroke="#0d0b1e" strokeWidth="5" />
        {trees.map((p, i) => <Plant key={`t${i}`} {...p} i={i} />)}
        {pines.map((p, i) => <Plant key={`p${i}`} {...p} i={i} cls="sway" />)}

        <path d="M0 700 Q300 620 600 690 T1200 670 V800 H0Z" fill="#14122b" stroke="#0d0b1e" strokeWidth="5" />

        <g stroke="#0d0b1e" strokeWidth="4" strokeLinejoin="round">
          <g className="shroom"><rect x="290" y="690" width="14" height="40" rx="6" fill="#e9dcc8" /><path d="M262 695 Q297 640 332 695Z" fill="#e0549a" /><circle cx="285" cy="680" r="4" fill="#f6efe3" stroke="none" /></g>
          <g className="shroom" style={{ animationDelay: "1.5s" }}><rect x="352" y="710" width="10" height="28" rx="5" fill="#e9dcc8" /><path d="M335 714 Q357 678 380 714Z" fill="#3fd0c9" /></g>
          <g className="shroom" style={{ animationDelay: "3s" }}><rect x="860" y="710" width="14" height="40" rx="6" fill="#e9dcc8" /><path d="M830 715 Q867 660 904 715Z" fill="#f2b25c" /><circle cx="855" cy="700" r="4" fill="#f6efe3" stroke="none" /></g>
          <g className="shroom" style={{ animationDelay: "2s" }}><rect x="805" y="740" width="9" height="24" rx="4" fill="#e9dcc8" /><path d="M790 744 Q810 712 830 744Z" fill="#9b7bff" /></g>
        </g>

        {front.map((p, i) => <Plant key={`f${i}`} {...p} i={i} cls="sway" />)}
        {vines.map((p, i) => <Plant key={`v${i}`} {...p} i={i} cls="hang" />)}
      </svg>

      <div className="fireflies" aria-hidden="true">
        {fireflies.map((f, i) => (
          <span
            key={i}
            className="firefly"
            style={{ left: `${f.left}%`, top: `${f.top}%`, animationDelay: `${f.delay}s`, "--dur": `${f.dur}s` }}
          />
        ))}
      </div>
    </>
  );
}
