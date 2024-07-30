import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialLinks from "../SocialLink/SocialLink";

function Header() {
  const [iconState, setIconState] = useState("in-home");
  const handleMouseEnter = () => {
    console.log("iconState", iconState);
    if (iconState === "hover-home-2" || iconState === "in-home") {
      setIconState("");
      setTimeout(() => setIconState("hover-home-2"), 0);
    }
  };
  return (
    <motion.header
      className="border-b border-slate-900 shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between h-16 max-w-full px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex ">
          <p className="text-2xl font-bold select-none text-slate-100 gradient-text">
            Dashdown
          </p>
          <div
            className="flex items-center ml-2 cursor-pointer"
            onMouseEnter={handleMouseEnter}
          >
            {/* <IconPlayer
                  iconPath={HomeIcon}
                  state={iconState}
                  size={"24px"}
                  colorize={"#f3f4f6"}
                  delay={3000}
                /> */}
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <SocialLinks />
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
