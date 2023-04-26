import React from "react";
import Link from "next/link";
import Image from "next/image";

const CustomLink = ({ href, children }) => {
  return <div onClick={() => (window.location.href = href)}>{children}</div>;
};

const Navbar = () => {
  return (
    <nav className="bg-white-100 px-4 py-2 flex justify-between items-center fixed top-0 left-0 right-0">
      <div className="logo">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={300} height={50} />
        </Link>
      </div>
      <div className="links flex items-center space-x-4">
        <Link href="/favorites">
          <span className="text-center inline-block bg-black text-white font-bold py-2 px-4 rounded-full">
            Favorites
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
