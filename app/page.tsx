"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [color, setColor] = useState('orange');

  useEffect(() => {
    const timer = setTimeout(() => {
      setColor('red');
    }, 3000); // 3 saniye

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div 
        className="w-64 h-64 rounded-lg transition-colors duration-300"
        style={{ backgroundColor: color }}
      />
    </main>
  );
} 