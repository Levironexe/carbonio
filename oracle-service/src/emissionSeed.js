const { PublicKey } = require('@solana/web3.js');

// Replace these with your actual values
const countryCode = "JP"; 
const year = 2017;
const programId = new PublicKey("GwN5yzAMWWRSBat3J2Uw2B2sq5YhjLviEExSLvi7aYoQ");

// Convert year to little-endian bytes (same as in Rust)
const yearBytes = new Uint8Array(2);
yearBytes[0] = year & 0xFF;
yearBytes[1] = (year >> 8) & 0xFF;

// Calculate the PDA
PublicKey.findProgramAddress(
  [
    Buffer.from("emissions"),
    Buffer.from(countryCode),
    yearBytes
  ],
  programId
).then(([address, bump]) => {   
  console.log("Emissions Account PDA:", address.toString());
  console.log("Bump:", bump);
});