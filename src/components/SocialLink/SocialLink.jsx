import React, { useState } from "react";
import { motion } from "framer-motion";
import IconPlayer from "../../components/IconPlayer/IconPlayer";
import MainAnimatedIcon from "../../assets/animatedIcons/DevContact.json";
import { ReactComponent as GitHubIcon } from "../../assets/socialIcons/github.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/socialIcons/linkedin.svg";

function SocialLinks() {
  const [iconState, setIconState] = useState("in-code");
  const [hovered, setHovered] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    setShowIcons(false);
    setIconState(""); // Clear the state first to trigger a change
    setTimeout(() => setIconState("hover-code"), 0); // Set the desired state
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setShowIcons(false);
    // setIconState("hover-email"); // Reset to initial state
  };
  return (
    <div
      className="-m-2.5 p-2.5 flex text-slate-400 h-[50px] items-center w-[50vw] hover:text-slate-300 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute right-0 flex justify-end"
        animate={{
          x: hovered ? -60 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onAnimationComplete={() => {
          if (hovered) {
            setShowIcons(true);
          }
        }}
      >
        <IconPlayer
          iconPath={MainAnimatedIcon}
          className={""}
          size={"30px"}
          state={iconState}
          colorize={"#f3f4f6"}
          delay={1300}
        />
      </motion.div>
      {showIcons && (
        <motion.div
          className="absolute right-0 flex items-center ml-1 space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="cursor-pointer">
            <GitHubIcon />
          </div>
          <div className="cursor-pointer">
            <LinkedinIcon />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SocialLinks;
