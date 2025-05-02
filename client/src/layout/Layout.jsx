import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Layout() {
  const { theme } = useSelector((state) => state.theme);
  console.log("ThemeProvider", theme);
  return (
    <div className={theme}>
      <div className=" text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
