import React, { useEffect, useRef, useState } from "react";
import { Player } from "@lordicon/react";
import PropTypes from "prop-types";

const IconPlayer = ({
  iconPath,
  className,
  size,
  state,
  colorize,
  renderMode,
  onReady,
  onComplete,
  delay,
  repeatCount, // New prop to specify the number of repetitions
  onAllRepetitionsComplete, // New prop to notify when all repetitions are complete
}) => {
  const playerRef = useRef(null);
  const [currentRepeat, setCurrentRepeat] = useState(0);

  useEffect(() => {
    if (playerRef.current) {
      const playAnimation = () => {
        playerRef.current.playFromBeginning();
      };

      if (delay > 0 && state.startsWith("in")) {
        const timer = setTimeout(playAnimation, delay);
        return () => clearTimeout(timer); // Cleanup the timer on component unmount or state change
      } else {
        playAnimation();
      }
    }
  }, [state, delay]);

  const handleComplete = () => {
    if (repeatCount && currentRepeat < repeatCount - 1) {
      setCurrentRepeat(currentRepeat + 1);
      playerRef.current.playFromBeginning();
    } else {
      if (onComplete) {
        onComplete();
      }
      if (onAllRepetitionsComplete) {
        onAllRepetitionsComplete();
      }
    }
  };

  return (
    <div className={"transform-gpu " + className}>
      <Player
        ref={playerRef}
        icon={iconPath}
        size={size}
        state={state}
        colorize={colorize}
        renderMode={renderMode}
        onReady={onReady}
        onComplete={handleComplete}
      />
    </div>
  );
};

IconPlayer.propTypes = {
  iconPath: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  state: PropTypes.string,
  colorize: PropTypes.string,
  renderMode: PropTypes.string,
  onReady: PropTypes.func,
  onComplete: PropTypes.func,
  delay: PropTypes.number,
  repeatCount: PropTypes.number, // New prop type for repeatCount
  onAllRepetitionsComplete: PropTypes.func, // New prop type for onAllRepetitionsComplete
};

IconPlayer.defaultProps = {
  size: "100%",
  state: null,
  colorize: null,
  renderMode: "AUTOMATIC",
  onReady: () => {},
  onComplete: () => {},
  delay: 0,
  repeatCount: 1, // Default to playing once
  onAllRepetitionsComplete: () => {}, // Default to an empty function
};

export default IconPlayer;
