"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  // Hide navbar on all pages except main page
  if (pathname !== '/') {
    return null;
  }

  return (
    <nav className="w-full sticky top-0 z-50 bg-secondary-container flex items-center justify-center px-8 py-4 border-none shadow-none" style={{ backgroundColor: '#99FF66' }}>
      <Link href="/" className="text-2xl font-bold tracking-tighter text-on-surface-variant font-manrope">
        ตารางจองห้อง สพต.
      </Link>
    </nav>
  );
};

export default Navbar;
