import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

const CustomLink = ({ href, children }) => {
  return <div onClick={() => (window.location.href = href)}>{children}</div>;
};

const Navbar = () => {
  const handleFavoritesClick = () => {
    window.location.href = "/favorites";
  };

  return (
    <div className="bg-white-100 px-4 py-2 flex justify-between items-center fixed top-0 left-0 right-0">
      <div className="logo">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={50}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>
      </div>

      <div className="flex items-center">
        <motion.button
          className="rounded-xl py-2 px-4 bg-blue-500 text-white font-bold mr-4"
          style={{ minWidth: "120px", textAlign: "center" }}
          onClick={handleFavoritesClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          My favorites
        </motion.button>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
