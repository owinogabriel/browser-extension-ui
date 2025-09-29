import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/"></Link>
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={150}
          height={40}
        />
      </div>
    </header>
  );
};

export default Header;
