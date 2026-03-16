// app/SystemWrapper.js
"use client";
import { SystemProvider } from "./context/SystemContext";

export default function SystemWrapper({ children }) {
  return (
    <SystemProvider>
      {children}
    </SystemProvider>
  );
}