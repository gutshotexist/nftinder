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
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(4); // Replace 4 with a variable that holds the user's current streak

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

      // Increment the user's streak
      setCurrentStreak((prevStreak) => prevStreak + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestModalClose = () => {
    setShowQuestModal(false);
  };

  const handleQuestButtonClick = () => {
    setShowQuestModal(true);
  };

  return (
    <>
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
            className="rounded-xl py-2 px-4 font-bold bg-blue-500 hover:bg-blue-600 text-white mr-4"
            style={{ minWidth: "120px", textAlign: "center" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleQuestButtonClick}
          >
            Daily Quest
          </motion.button>
          <ConnectButton />
        </div>
      </div>
      {showQuestModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center bg-black bg-opacity-75">
          <div className="relative bg-white rounded-lg w-96 p-6">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
              onClick={handleQuestModalClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M15.707 4.293a1 1 0 00-1.414 0L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Daily Quest</h2>
            <p className="mb-4">
              🎉 Welcome to the Daily Quest! 🌟
              <br />
              <br />
              Sign a transaction every day for 5 consecutive days and receive a
              special NFT as a reward. 🔥
              <br />
              <br />
              Your current streak is displayed in the Daily Quest interface. ⚡️
              <br />
              <br />
              Click on the 'Sign for Streak' button to sign today's transaction
              and keep your streak going. 💪
              <br />
              <br />
              Remember, you can only sign one transaction per day, so make sure
              to come back tomorrow to continue your streak! 📆
              <br />
              <br />
            </p>
            <p className="mb-4">Your current streak is: {currentStreak}</p>
            <motion.button
              className="rounded-xl py-2 px-4 font-bold bg-blue-500 text-white mr-4"
              style={{ minWidth: "120px", textAlign: "center" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDailyQuestClick}
            >
              Sign for Streak
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
