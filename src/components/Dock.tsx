import { Reorder, useMotionValue } from "framer-motion";
import React, { useState } from "react";
import DockIcon from "./DockIcon";
import { Icons } from "../utils/Icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { desktopApps } from "./Desktop";
import { activeApp } from "./Window";

interface DockProps {
  dockIcons: Icons[];
  animations: boolean;
}

function Dock({ dockIcons, animations }: DockProps) {
  const mouseX = useMotionValue<null | number>(null);
  const [selectedIcon, setSelectedIcon] = useState<undefined | Icons>();
  const active = useSetRecoilState(activeApp);
  const [apps, setApps] = useRecoilState(desktopApps);

  return (
    <div className="absolute bottom-1 w-full flex justify-center ">
      <div className="bg-glass-color rounded-2xl backdrop-filter backdrop-blur-3xl border border-border-color w-max">
        <div
          onMouseMove={
            animations ? (event) => mouseX.set(event.nativeEvent.x) : () => {}
          }
          onMouseLeave={() => mouseX.set(null)}
        >
          <div className="flex flex-row">
            {dockIcons.map((icon, index) => (
              <DockIcon
                key={index}
                mouseX={mouseX}
                icon={icon}
                isSelected={selectedIcon === icon}
                onClick={() => {
                  setSelectedIcon(icon);
                  active(dockIcons[index].label);

                  const newApps = new Set(apps);
                  newApps.add(dockIcons[index].label);
                  setApps(newApps);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dock;
