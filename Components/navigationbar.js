import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import Web3 from "web3";

import logo from "../public/logo.png";

const abi = [
  {
    inputs: [],
    name: "acquireReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_premint",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "REWARDS_AMOUNT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARDS_TIMEOUT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract NFTDToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const address = "0xDD2D6aEfD63c095BE1DF4F1A6cB0F25D5F8F04F9";

const Navbar = () => {
  const handleFavoritesClick = () => {
    window.location.href = "/favorites";
  };

  return (
    <div className="bg-white-100 px-4 py-2 flex justify-between items-center fixed top-0 left-0 right-0">
      <div className="logo">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={300}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex items-center">
        <motion.button
          className="rounded-xl py-2 px-4 bg-blue-500 text-white font-bold mr-4"
          style={{ minWidth: "120px", textAlign: "center" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          My favorites
        </motion.button>
        <motion.button
          className="rounded-xl py-2 px-4 bg-blue-500 text-white font-bold mr-4"
          style={{ minWidth: "120px", textAlign: "center" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          Daily Quest
        </motion.button>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
