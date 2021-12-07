import React, { useEffect, useState } from "react";
import logo from "../assets/svg/apple.svg";
import battery from "../assets/svg/battery.svg";
import wifi from "../assets/svg/wifi.svg";
import mini from "../assets/svg/mini-menu.svg";

interface Props {
  active: string;
}

const links = ["File", "Edit", "View", "Go", "Window", "Help"];

const menuItems = [
  { icon: battery, label: "battery" },
  { icon: wifi, label: "wifi" },
  { icon: mini, label: "mini" },
];

function MenuBar({ active }: Props) {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  const dayOfWeek = date.toLocaleString("default", { weekday: "short" });
  const day = date.getDate();
  const currentTime = date.toLocaleTimeString();
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      //set current time and exclude seconds
      const currentTime = date.toLocaleTimeString().slice(0, -3);

      setTime(currentTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTime]);

  return (
    <div className="flex flex-row w-screen backdrop-filter bg-glass-color h-6 z-50 backdrop-blur-3xl text-sm">
      <div className="links flex-1 flex flex-row space-x-5">
        <div className="flex flex-row space-x-5">
          <img src={logo} className="pl-5" alt="apple logo" />
          <h1 className="font-semibold">{active}</h1>
        </div>
        {links.map((link) => (
          <a href="#" className="" key={link}>
            {link}
          </a>
        ))}
      </div>
      <div className="flex-1 flex flex-row items-center justify-end px-5 space-x-2">
        {menuItems.map((menuItem) => (
          <button key={menuItem.label}>
            <img src={menuItem.icon} alt={menuItem.label} />
          </button>
        ))}
        <p>{dayOfWeek + " " + day + " " + month}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default MenuBar;
