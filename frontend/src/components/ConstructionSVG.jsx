import { motion } from "framer-motion";

function ConstructionSVG() {
  // Expanded list of cogs
  const cogs = [
    { size: 80, x: "-10%", y: "20%", rotate: 360, duration: 30 },
    { size: 60, x: "5%", y: "10%", rotate: -360, duration: 40 },
    { size: 100, x: "15%", y: "25%", rotate: 360, duration: 50 },
    { size: 70, x: "25%", y: "5%", rotate: -360, duration: 35 },
    { size: 90, x: "35%", y: "30%", rotate: 360, duration: 45 },
    { size: 60, x: "45%", y: "15%", rotate: -360, duration: 40 },
    { size: 85, x: "55%", y: "25%", rotate: 360, duration: 50 },
    { size: 70, x: "65%", y: "10%", rotate: -360, duration: 35 },
    { size: 95, x: "75%", y: "20%", rotate: 360, duration: 45 },
    { size: 60, x: "85%", y: "5%", rotate: -360, duration: 30 },
    { size: 80, x: "90%", y: "25%", rotate: 360, duration: 50 },
  ];

  return (
    <div className="relative w-full h-[300px] flex justify-center items-center">
      {/* Background cogs */}
      {cogs.map((cog, index) => (
        <motion.img
          key={index}
          src="/cog.png"
          alt="cog"
          className="absolute opacity-20"
          style={{
            width: cog.size,
            height: cog.size,
            left: cog.x,
            top: cog.y,
            zIndex: 0,
          }}
          animate={{ rotate: cog.rotate }}
          transition={{
            repeat: Infinity,
            duration: cog.duration,
            ease: "linear",
          }}
        />
      ))}

      {/* Foreground SVG */}
      <svg
        className="relative w-64 mx-auto z-10"
        height="300"
        viewBox="0 0 250 300"
        width="250"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="10"
              floodColor="#000"
              floodOpacity="0.1"
            />
          </filter>
        </defs>
        <path
          d="M125 0C55.96 0 0 55.96 0 125c0 36.32 15.42 69.04 40.18 92.17L125 300l84.82-82.83C234.58 194.04 250 161.32 250 125 250 55.96 194.04 0 125 0z"
          fill="#FA812F"
          filter="url(#shadow)"
        />
        <circle cx="125" cy="125" r="70" fill="#FFFFFF" fillOpacity="0.3" />
        <path d="M125 80l-40 30h15v35h50v-35h15l-40-30z" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

export default ConstructionSVG;
