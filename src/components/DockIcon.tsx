import useRaf from "@rooks/use-raf";
import {
  AnimatePresence,
  motion,
  Reorder,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { Icons } from "../utils/Icons";

interface DockIconProps {
  icon: Icons;
  isSelected: boolean;
  onClick: () => void;
  mouseX: any;
}

const baseWidth = 70;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 0.5,
  baseWidth * 1,
  baseWidth * 1.5,
  baseWidth * 1,
  baseWidth * 0.5,
  baseWidth,
];

function DockIcon({ icon, isSelected, onClick, mouseX }: DockIconProps) {
  const distance = useMotionValue(beyondTheDistanceLimit);
  const width = useSpring(useTransform(distance, distanceInput, widthOutput), {
    damping: 25,
    stiffness: 250,
  });
  const ref = useRef<any>();

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      // get the x coordinate of the img DOMElement's center
      // the left x coordinate plus the half of the width
      const imgCenterX = rect.left + rect.width / 2;

      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return (
    <AnimatePresence>
      <motion.img
        className="bg-transparent cursor-pointer "
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.15 },
        }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        onClick={onClick}
        ref={ref}
        src={icon.icon}
        style={{ width }}
      ></motion.img>
    </AnimatePresence>
  );
}

export default DockIcon;
