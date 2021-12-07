import { AnimatePresence, motion, useDragControls } from "framer-motion";
import React, { useState } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { desktopApps } from "./Desktop";

//window props
interface WindowProps {
  title: string | any;
}

export const activeApp = atom({
  key: "ActiveApp",
  default: "Finder",
});

function Window({ title }: WindowProps) {

  const setActive = useSetRecoilState(activeApp);
  const [apps, setApps] = useRecoilState(desktopApps);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  
  //sets window state to minimize
  const minimize = () => setMinimized(true);
  //sets window state to maximize
  const maximize = () => setMaximized(!maximized);
  //sets window state to closed
  const close = () => {
    // setWinState({ minimize: false, maximize: false, closed: true });
    const newApps = new Set(apps);
    newApps.has(title) && newApps.delete(title);
    setApps(newApps);
  };

  const dragControls = useDragControls();
  
  return (
    <AnimatePresence>
      <motion.div
        dragListener={false}
        dragControls={dragControls}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.1, ease: "easeOut" },
        }}
        exit={{ opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }}
        onClick={() => {
          setActive(title);
        }}
        style={
          maximized
            ? { width: "100vw", height: "100vh" }
            : { width: "30%", height: "30%" }
        }
        className="bg-gray-400 rounded-lg overflow-hidden resize"
        dragMomentum={false}
        drag
      >
        <motion.div
          dragControls={dragControls}
          onPointerDown={(event) => dragControls.start(event)}
          className="w-full text-center bg-white relative z-50"
        >
          <div className="w-20 absolute space-x-2">
            <button
              className="bg-red-500 rounded-full h-3 w-3"
              onClick={close}
            ></button>
            <button
              className="bg-yellow-500 rounded-full h-3 w-3"
              onClick={minimize}
            ></button>
            <button
              className="bg-green-500 rounded-full h-3 w-3"
              onClick={maximize}
            ></button>
          </div>
          <h1 className="text-center font-semibold">{title}</h1>
        </motion.div>

        {/* frame body */}
        <div className="w-full h-full">
          <motion.h1 className="text-9xl h-full bg-red-300">Hello</motion.h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Window;
