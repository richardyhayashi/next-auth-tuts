'use client';

import React from 'react';
import Link from 'next/link';
import LoginButton from '@/components/ui/LoginButton';

const AppBar = () => {
  return (
    <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5 ">
      <LoginButton />
    </div>
  );
}

export default AppBar;