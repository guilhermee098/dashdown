import { motion } from "framer-motion";

function BackgroundEffect() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden -z-10 blur-3xl"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.1 }}
    >
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[89.25rem] aspect-[1108/632] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        style={{
          clipPath:
            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
        }}
      />
    </motion.div>
  );
}
export default BackgroundEffect;
