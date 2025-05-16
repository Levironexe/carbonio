'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useWallet } from "@lazorkit/wallet";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { ChevronDown } from "lucide-react";
const NavBar = () => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const web1 = process.env.NEXT_PUBLIC_WEB1;
  const web2 = process.env.NEXT_PUBLIC_WEB2;
  // Lazorkit authentication
  const {
    isConnected: isAuthenticated,
    isLoading: isAuthLoading,
    publicKey: authPublicKey,
    connect: authenticate,
    disconnect: deauthenticate,
    signMessage,
    smartWalletAuthorityPubkey,
    error: authError,
  } = useWallet();

  // Solana wallet connection
  const {
    publicKey: walletPublicKey,
    connected: isWalletConnected,
    disconnect: disconnectWallet,
  } = useSolanaWallet();

  const { setVisible } = useWalletModal();
  const [walletStatus, setWalletStatus] = useState({
    connecting: false,
    error: null,
  });

  // Format wallet address to be more user-friendly
  const formatPublicKey = (key: any) => {
    if (!key) return "";
    const keyString = typeof key === "object" ? key.toString() : key;
    return `${keyString.slice(0, 4)}...${keyString.slice(-4)}`;
  };

  // Step 1: Handle biometric authentication
  const handleAuthenticate = async () => {
    try {
      setWalletStatus({
        connecting: true,
        error: null,
      });

      // Trigger Lazorkit biometric authentication
      await authenticate();

      console.log("Authentication successful with Lazorkit");

      // After successful authentication, proceed to wallet connection
      handleConnectWallet();
    } catch (err: any) {
      setWalletStatus({
        connecting: false,
        error: err.message || "Authentication failed",
      });
      console.error("Authentication failed:", err);
    }
  };

  // Step 2: Handle wallet connection after authentication
  const handleConnectWallet = () => {
    try {
      // Open Solana wallet adapter modal for wallet selection
      setVisible(true);
      setWalletStatus({
        connecting: true,
        error: null,
      });
    } catch (err: any) {
      setWalletStatus({
        connecting: false,
        error: err.message || "Wallet connection failed",
      });
      console.error("Failed to open wallet connection:", err);
    }
  };

  // Handle complete disconnect (both auth and wallet)
  const handleFullDisconnect = () => {
    // Disconnect Solana wallet if connected
    if (isWalletConnected) {
      disconnectWallet();
    }

    // Deauthenticate Lazorkit
    if (isAuthenticated) {
      deauthenticate();
    }

    setWalletStatus({
      connecting: false,
      error: null,
    });

    console.log("Fully disconnected");
  };

  // Update status when wallet connects
  useEffect(() => {
    if (isWalletConnected) {
      setWalletStatus({
        connecting: false,
        error: null,
      });
      console.log("Wallet connected:", walletPublicKey?.toString());
    }
  }, [isWalletConnected, walletPublicKey]);

  // Handle errors from authentication
  useEffect(() => {
    if (authError) {
      setWalletStatus((prev) => ({
        ...prev,
        error: authError,
        connecting: false,
      }));
    }
  }, [authError]);

  // Example sign message function
  const handleSignMessage = async () => {
    try {
      const message = new TextEncoder().encode("Hello from Carbonio!");
      const signature = await signMessage(message);
      console.log("Signature:", signature);
    } catch (err) {
      console.error("Failed to sign message:", err);
    }
  };

  // Determine what to display in the wallet section
  const renderWalletSection = () => {
    // Fully connected state (both authenticated and wallet connected)
    if (isAuthenticated && isWalletConnected) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-white bg-black bg-opacity-20 px-2 py-1 rounded">
            {formatPublicKey(walletPublicKey)}
          </span>
          <button
            onClick={handleSignMessage}
            className="text-white hover:text-black transition-all duration-200"
          >
            Sign
          </button>
          <button
            onClick={handleFullDisconnect}
            className="text-white hover:text-black transition-all duration-200"
          >
            Disconnect
          </button>
        </div>
      );
    }

    // Only authenticated, but wallet not connected
    if (isAuthenticated && !isWalletConnected) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-white bg-black bg-opacity-20 px-2 py-1 rounded">
            Auth: {formatPublicKey(authPublicKey || smartWalletAuthorityPubkey)}
          </span>
          <button
            onClick={handleConnectWallet}
            disabled={walletStatus.connecting}
            className="hover:text-black transition-all duration-200 disabled:opacity-50"
          >
            {walletStatus.connecting ? "Connecting..." : "Connect Wallet"}
          </button>
          <button
            onClick={handleFullDisconnect}
            className="text-white hover:text-black transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      );
    }

    // Not authenticated state
    return (
      <div>
        <button
          onClick={handleAuthenticate}
          disabled={isAuthLoading || walletStatus.connecting}
          className="hover:text-black transition-all duration-200 disabled:opacity-50"
        >
          {isAuthLoading || walletStatus.connecting
            ? "Authenticating..."
            : "Connect Wallet"}
        </button>
      </div>
    );
  };
    interface DropdownItem {
    title: string;
    href: string;
    target?: string;
  }
  
  interface NavItem {
    title: string;
    href: string;
    icon?: React.ReactNode;
    dropdown?: DropdownItem[];
  }
const navItems: NavItem[] = [
    {
      title: "Features",
      href: `${web1}/features`,
      icon:<ChevronDown className='h-4 w-4'/>,
      dropdown: [
        {title: "Company dashboard", href: "/company-dashboard",},
        {title: "Upload data", href: `${web2}/`, target: "_blank"},
        {title: "Profile", href: `${web2}/profile`, target: "_blank"},
      ]
    },
    {
      title: "Our globe",
      href: `${web1}/our-globe`,
    },
    {
      title: "About us",
      icon:<ChevronDown className='h-4 w-4'/>,
      href: `${web1}/about-us`,
      dropdown: [
        { title: "What we do", href: `${web1}/about-us#what-we-do`},
        { title: "Our team", href: `${web1}/about-us#our-team` },
      ]
    },
    {
      title: "Collaboration",
      href: `${web1}/collaboration`,
    }
  ];
  return (
    <div className="w-full p-2 sm:p-4 md:sticky md:z-40 top-0 transition-all duration-200">
      <div className="mx-auto bg-white border-black border-2 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2 rounded">
        <div>
          <Link
            href={`${web1}/`}
            className="text-purple-700 w-auto text-xl sm:text-xl font-bold pl-2 sm:pl-3"
          >
            carbonio
            <span className="text-black w-auto text-xl sm:text-xl font-bold">
              Partner
            </span>
          </Link>
        </div>
        <div className="w-full sm:w-fit text-white text-base sm:text-lg md:text-lg flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-end bg-purple-700 px-2 sm:px-3 py-1">
           {navItems.map((item, index) => (
            <div 
              key={index} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                className='hover:text-white transition-all duration-200 flex items-center gap-1' 
                href={item.href}
              >
                {item.title}
                {item.icon}
              </Link>
              
              {/* Dropdown menu */}
              {item.dropdown && (
                <div 
                  className={`absolute left-0 mt-2 w-48 bg-carbon border-2 border-carbon rounded shadow-lg z-50 transition-all duration-150 ${
                    activeDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <ul className="pb-2">
                    {item.dropdown.map((dropdownItem, index) => (
                      <li key={index}>
                        <Link 
                          href={dropdownItem.href}
                          target={dropdownItem.target}
                          className="block px-4 py-2 rounded text-white text-sm text-center mt-2 mx-2 hover:bg-black"
                        >
                          {dropdownItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {/* Wallet Connection UI */}
          {renderWalletSection()}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
