import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import Web3 from "web3";

import logo from "../public/logo.png";

const Navbar = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [lastRewardTime, setLastRewardTime] = useState(null);

  // Load last reward time from storage on initial render
  useEffect(() => {
    const lastRewardTimeStr = localStorage.getItem("lastRewardTime");
    if (lastRewardTimeStr) {
      const lastRewardTime = new Date(JSON.parse(lastRewardTimeStr));
      setLastRewardTime(lastRewardTime);
      const difference = new Date() - lastRewardTime;
      if (difference <= 24 * 60 * 60 * 1000) {
        setTimerActive(true);
        setTimeout(() => {
          setTimerActive(false);
        }, 24 * 60 * 60 * 1000 - difference);
      }
    }
  }, []);

  const handleFavoritesClick = () => {
    window.location.href = "/favorites";
  };

  const handleDailyQuestClick = async () => {
    const ABI = [
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
    const Address = "0xDD2D6aEfD63c095BE1DF4F1A6cB0F25D5F8F04F9";
    if (timerActive) {
      console.log(
        "You already acquired a reward. Please wait for 24 hours before trying again."
      );
      return;
    }
    try {
      await window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(ABI, Address);

      await window.contract.methods
        .acquireReward()
        .send({ from: window.ethereum.selectedAddress });

      console.log("Reward acquired!");

      const lastRewardTime = new Date();
      setLastRewardTime(lastRewardTime);
      localStorage.setItem("lastRewardTime", JSON.stringify(lastRewardTime));

      setTimerActive(true);
      setTimeout(() => {
        console.log("24 hours have passed!");
        setTimerActive(false);
      }, 24 * 60 * 60 * 1000);
    } catch (error) {
      console.error(error);
    }
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
          onClick={handleFavoritesClick}
        >
          My favorites
        </motion.button>
        <motion.button
          className={`rounded-xl py-2 px-4 font-bold ${
            timerActive
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white mr-4`}
          style={{ minWidth: "120px", textAlign: "center" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDailyQuestClick}
          disabled={timerActive}
        >
          {timerActive ? "Next reward available in 24 hours" : "Daily Quest"}
        </motion.button>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
