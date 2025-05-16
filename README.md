# Carbonio - Carbon Footprint Tracking on Solana

![Solana](https://img.shields.io/badge/Solana-1.98-blueviolet)
![Next.js](https://img.shields.io/badge/Next.js-14.2-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Express](https://img.shields.io/badge/Express-4.18-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-cyan)
![License](https://img.shields.io/badge/License-MIT-yellow)

Carbonio is a decentralized application designed to promote environmental sustainability by recording carbon emission data on the Solana blockchain. This transparent approach enables individuals to monitor their daily carbon footprint while incentivizing companies to reduce their atmospheric emissions. The platform leverages blockchain technology to create accountability and raise environmental awareness among users and organizations.

## ✨ Features

- **Decentralized Carbon Tracking**: Record and verify carbon emission data on Solana
- **Smart Contract Security**: Immutable contracts ensure data integrity and transparency
- **Web3 Integration**: Seamless connection with Solana wallets
- **Modern UI/UX**: Built with Next.js and TypeScript for a responsive experience
- **Real-time Updates**: Live tracking of carbon footprint data
- **Multi-user Platform**: Supports consumers, companies, and verification auditors

## 🌐 System Architecture
![image](https://github.com/user-attachments/assets/d43f335b-0bb4-4c29-91cc-d3c0fbee5359)

### Solana Integration

- **Parallel Transaction Processing**: Concurrent processing of transactions allows high throughput
- **Stateless Programs**: Smart contracts are immutable with state data stored separately
- **Transaction Transparency**: All company data is visible and verifiable by all participants

### Technical Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: Express.js
- **Blockchain**: Solana
- **Smart Contracts**: Anchor framework
- **Storage**: Pinata (IPFS) and Supabase
- **NFT Creation**: Metaplex

## 🖥️ Websites

Carbonio offers three interconnected portals:

1. **[Public Dashboard](https://github.com/Levironexe/carbonio)**
   - For consumers to scan QR codes and view carbon footprints
   - For companies to register to the system

2. **[User Portal](https://github.com/Levironexe/carbonioPartner)**
   - For user to upload their carbon data with pre-formatted .xlsx file

3. **Admin Dashboard**
   - For third-party auditors to verify products and companies

## 🔄 System Flow

1. **Company Registration**: Companies register their information through the dashboard
2. **Data Uploading**: Product and carbon footprint data is uploaded to the portal
3. **Blockchain Storage**: All data is stored on Solana (100% on-chain)
4. **Verification Process**: Third-party auditors verify company claims
5. **Consumer Access**: Consumers scan QR codes to view verified carbon footprint data

## 🚀 Getting Started

### Prerequisites

✨ Visit [our live demo](https://carbonio.vercel.app) to see Carbonio in action! ✨

### Prerequisites

- Node.js (v18+)
- Solana CLI
- Anchor Framework
- Solana Wallet (Phantom recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/carbonio.git

# Install dependencies
cd carbonio
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Smart Contract Deployment

```bash
# Build and deploy the Solana program
anchor build
anchor deploy
```

## 🔧 Configuration

Update your `.env.local` file with the following:

```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=your-rpc-url
PINATA_API_KEY=your-pinata-key
PINATA_SECRET_KEY=your-pinata-secret
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with 💚 for a sustainable future
