/**
 * Static, dependency-free fallback for the hero scene.
 * Rendered on mobile, while the 3D canvas loads, and for
 * users who prefer reduced motion. Pure SVG — no JS, no 3D.
 */
export function HeroFallback() {
  const nodes = [
    [12, 30], [28, 18], [22, 52], [40, 38], [52, 22],
    [58, 56], [70, 34], [82, 20], [78, 60], [44, 70],
    [64, 78], [88, 44], [16, 68], [36, 86],
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [3, 5], [4, 6],
    [6, 7], [6, 8], [5, 9], [8, 10], [7, 11], [9, 10], [2, 12],
    [9, 13], [11, 8], [5, 6],
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full opacity-80"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g stroke="#4D8DF0" strokeOpacity="0.22" strokeWidth="0.25">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g>
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 4 === 0 ? 0.9 : 0.6}
            fill={i % 4 === 0 ? "#E8B04B" : "#93A3BC"}
            fillOpacity={i % 4 === 0 ? 0.95 : 0.7}
          />
        ))}
      </g>
    </svg>
  );
}
