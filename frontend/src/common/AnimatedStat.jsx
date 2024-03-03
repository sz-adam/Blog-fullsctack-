import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const AnimatedStat = ({ value, label }) => {
  const [initialValue, setInitialValue] = useState(0);
  const count = useMotionValue(initialValue);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (value !== undefined) {
      setInitialValue(value);
      const animation = animate(count, value, {
        duration: 0.8
      });

      return animation.stop;
    }
  }, [value, count]);

  return (
    <motion.div className="flex flex-col items-center">
      <motion.p className="font-bold text-gray-700 text-xl">{rounded}</motion.p>
      <motion.p className="text-gray-400">{label}</motion.p>
    </motion.div>
  );
};

export default AnimatedStat;
