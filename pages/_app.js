import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";
import { bscTestnet, bsc } from "@wagmi/core/chains";
import { WagmiConfig } from "wagmi";
import "tailwindcss/tailwind.css";

const { chains, provider } = configureChains(
  [bscTestnet, bsc],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  AppName: "NFTinder",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function myApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default myApp;
