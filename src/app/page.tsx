"use client"

import { useTheme } from "next-themes"

export default function Home() {
  const {setTheme} = useTheme();
  return (
    <div className="bg-shanem min-h-screen w-full dark:bg-primary ">
      <button onClick={() => setTheme("light")} className="text-main">
        light
        </button>
        <button onClick={() => setTheme("dark")} className="text-main">
        dark
        </button>
    </div>
    
  );
}
