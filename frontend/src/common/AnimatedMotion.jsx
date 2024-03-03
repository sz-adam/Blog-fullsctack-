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
    },
    navigationAnimatio: {
      initial: "hidden",
      animate: "visible",
      variants: {
        visible: { transition: { staggerChildren: 0.2 } },
        hidden: {},
      },
    },
    navigationItemAnimatio: {
      variants: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      },
      exit: { opacity: 1, scale: 1 },
      transition: { type: "spring" },
    },
};

const AnimatedMotion = ({ animationName, children, className , onClick ,style}) => {
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
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedMotion;
