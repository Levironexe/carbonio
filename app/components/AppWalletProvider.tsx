'use client'
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
  } from "@solana/wallet-adapter-wallets";

export default function AppWalletProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const endpoint = clusterApiUrl("devnet");
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new TorusWalletAdapter(),
      ],
      [],
    );
  
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  }