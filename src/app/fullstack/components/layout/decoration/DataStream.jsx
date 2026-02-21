// @/app/fullstack/components/layout/decoration/DataStream.jsx
'use client';
import { useState, useEffect } from 'react';

export const DataStream = () => {
  const [val, setVal] = useState('000');

  useEffect(() => {
    const timer = setInterval(() => {
      setVal(Math.floor(Math.random() * 999).toString().padStart(3, '0'));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 opacity-20 hover:opacity-100 transition-opacity duration-500">
      <span className="text-[6px] [writing-mode:vertical-lr] font-bold tracking-widest uppercase">Stream_Link</span>
      <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-[#00f2ff] to-transparent" />
      <span className="text-[8px] font-bold text-[#00f2ff]">{val}</span>
    </div>
  );
};