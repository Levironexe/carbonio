// convert-registry.js
const fs = require('fs');
const { Keypair } = require('@solana/web3.js');

// Read the registry file
const registryData = JSON.parse(fs.readFileSync('./data_account_registry.json', 'utf8'));

// Convert secret keys to public addresses
const publicRegistry = {};

for (const [key, base64SecretKey] of Object.entries(registryData)) {
  try {
    // Convert base64 to Uint8Array
    const secretKeyBuffer = Buffer.from(base64SecretKey, 'base64');
    
    // Create keypair from secret key
    const keypair = Keypair.fromSecretKey(new Uint8Array(secretKeyBuffer));
    
    // Get the public key (address)
    const publicKey = keypair.publicKey.toString();
    
    // Store in our public registry
    publicRegistry[key] = publicKey;
  } catch (error) {
    console.error(`Error processing key ${key}:`, error.message);
  }
}

// Write to a new JSON file
fs.writeFileSync(
  './public-registry.json', 
  JSON.stringify(publicRegistry, null, 2)
);

console.log(`Converted ${Object.keys(publicRegistry).length} accounts to public addresses`);