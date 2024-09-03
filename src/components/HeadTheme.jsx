import React from "react";
import { FaMoon } from "react-icons/fa";

export default function HeadTheme() {
  return (
    <div className="flex justify-between px-4 py-6 shadow-sm b-4">
      <h1 className="font-bold">Where in the world?</h1>
      <div className="flex gap-2 items-center font-semibold">
        <FaMoon className="" />
        Dark Mode
      </div>
    </div>
  );
}
