import { AnimatePresence } from "framer-motion";
import React from "react";
import { atom, useRecoilValue } from "recoil";
import { AllIcons } from "../utils/Icons";
import Dock from "./Dock";
import MenuBar from "./MenuBar";
import Window, { activeApp } from "./Window";

export const desktopApps = atom({
  key: "DesktopAppsState",
  default: new Set(["Finder"]),
});

function Desktop() {
  const activeApps = useRecoilValue(desktopApps);
  const active = useRecoilValue(activeApp);
  return (
    <div className="bg-wallpaper bg-cover w-screen h-screen">
      <MenuBar active={active} />
      <AnimatePresence>
        {[...activeApps].map((app: any) => (
          <Window key={app} title={app} />
        ))}
      </AnimatePresence>
      <Dock dockIcons={AllIcons} animations={true} />
    </div>
  );
}

export default Desktop;
