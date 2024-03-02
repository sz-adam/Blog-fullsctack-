import { motion } from "framer-motion";

const animations = {
  pageAnimation: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
    },
    transition: { duration: 1.1 },
  },
  userMenuNavitonAnimation: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  messageAnimation : {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    },

    buttonAnimation:{
      whileTap:{scale:0.85}
    }
};

const AnimatedMotion = ({ animationName, children, className , onClick}) => {
  const animation = animations[animationName];

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
      variants={animation.variants}
      whileHover={animation.whileHover}
      whileTap={animation.whileTap}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedMotion;
