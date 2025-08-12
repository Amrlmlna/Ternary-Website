"use client"

import { motion } from "framer-motion"

function FloatingPaths({
  position,
  className,
}: {
  position: number
  className: string
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M${700 - i * 5 * position} -${400 + i * 6}C${
      700 - i * 5 * position
    } -${400 + i * 6} ${632 - i * 5 * position} ${-184 - i * 6} ${
      168 - i * 5 * position
    } ${-57 - i * 6}C${-296 - i * 5 * position} ${70 - i * 6} ${
      -364 - i * 5 * position
    } ${475 - i * 6} ${-364 - i * 5 * position} ${475 - i * 6}`,
    width: 0.75 + i * 0.04,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className={`w-full h-full ${className}`}
        viewBox="-700 -400 1400 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={1}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function BackgroundPaths({ darkMode }: { darkMode: boolean }) {
  const colorClass = darkMode ? "text-slate-200/35" : "text-slate-700/40"

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <FloatingPaths position={1} className={colorClass} />
        <FloatingPaths position={-1} className={colorClass} />
      </div>
    </div>
  )
}

export default BackgroundPaths
