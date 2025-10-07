import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ConstructionSVG() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // List of cogs
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

      {/* Clickable SVG */}
      <motion.svg
        className="relative w-64 mx-auto z-10 cursor-pointer"
        height="300"
        viewBox="0 0 250 300"
        width="250"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => navigate("/about")}
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

        {/* Outer Shape */}
        <path
          d="M125 0C55.96 0 0 55.96 0 125c0 36.32 15.42 69.04 40.18 92.17L125 300l84.82-82.83C234.58 194.04 250 161.32 250 125 250 55.96 194.04 0 125 0z"
          fill="#FA812F"
          filter="url(#shadow)"
        />

        {/* Inner Circle with Glow on Hover */}
        <motion.circle
          cx="125"
          cy="125"
          r="70"
          fill="#FFFFFF"
          fillOpacity="0.3"
          animate={{
            stroke: hovered ? "#FAB12F" : "#FFFFFF",
            strokeWidth: hovered ? 6 : 0,
            filter: hovered ? "url(#shadow)" : "none",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* House/Logo */}
        <path d="M125 80l-40 30h15v35h50v-35h15l-40-30z" fill="#FFFFFF" />
      </motion.svg>

      {/* Learn More Banner */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-[80%] w-4/5 mx-auto bg-[#FAB12F] text-white rounded-xl py-3 px-6 text-center font-semibold shadow-lg cursor-pointer z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate("/about")}
          >
            Learn more about us!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ConstructionSVG;
