import React from "react";

import Theme from "./Theme";
import { Outlet } from "react-router-dom";

export default function HeadTheme() {
  return (
    <>
      <div className="cursor-pointer flex justify-between px-4 py-6 shadow-sm b-4 dark:bg-slate-900/95 dark:text-white sticky lg:px-20">
        <h1 className="font-bold">Where in the world?</h1>
        <Theme />
      </div>
      <Outlet />
    </>
  );
}
