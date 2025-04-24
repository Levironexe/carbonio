import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import * as fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the schema for borsh serialization
class DataField {
  value: string;
  
  constructor(props: { value: string }) {
    this.value = props.value;
  }
}

// Create schema for serialization
const DataFieldSchema = new Map([
  [
    DataField,
    {
      kind: 'struct',
      fields: [
        ['value', 'string'],
      ]
    }
  ]
]);

// Define types for World Bank API response
interface WorldBankCountry {
  id: string;
  value: string;
}

interface WorldBankDataItem {
  country: WorldBankCountry;
  date: string;
  value: number | null;
}

// Define types for emissions data
interface EmissionsData {
  countryCode: string;
  countryName: string;
  year: number;
  emissions: number;
  unit: string;
}

// Set up connection to local network or devnet
const connection = new Connection(
  process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 
  'confirmed'
);

// Use your actual keypair path or environment variable
let wallet: Keypair;
try {
  // Try to load from WALLET_PRIVATE_KEY environment variable first
  if (process.env.WALLET_PRIVATE_KEY) {
    const privateKeyArray = JSON.parse(process.env.WALLET_PRIVATE_KEY);
    wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
    console.log("Loaded wallet from environment variable");
  } else {
    // Fall back to file
    const WALLET_PATH = process.env.WALLET_PATH || './keypair.json';
    const keypairData = JSON.parse(fs.readFileSync(WALLET_PATH, 'utf-8'));
    wallet = Keypair.fromSecretKey(new Uint8Array(keypairData));
    console.log("Loaded wallet from file:", WALLET_PATH);
  }
} catch (error) {
  console.log("Couldn't load keypair, generating a new one for testing");
  wallet = Keypair.generate();
  // Save the generated keypair for future use
  fs.writeFileSync('keypair.json', JSON.stringify(Array.from(wallet.secretKey)));
  console.log("Generated and saved new wallet to keypair.json");
}

// Program ID - USE YOUR ACTUAL DEPLOYED PROGRAM ID
const programId = new PublicKey(process.env.PROGRAM_ID || 'GwN5yzAMWWRSBat3J2Uw2B2sq5YhjLviEExSLvi7aYoQ');

console.log(`Using program ID: ${programId.toString()}`);
console.log(`Using wallet: ${wallet.publicKey.toString()}`);

// Function to fetch emissions data from World Bank API
async function fetchEmissionsData(country: string, year: string): Promise<WorldBankDataItem[]> {
  // World Bank API for CO2 emissions (EN.ATM.CO2E.KT) or greenhouse gas emissions (EN.GHG.CO2.MT.CE.AR5)
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/EN.GHG.CO2.MT.CE.AR5?format=json&date=${year}`;
  
  try {
    const response = await axios.get(url);
    // World Bank API returns data in a specific format, the actual data is in the second element
    if (response.data && Array.isArray(response.data) && response.data.length > 1) {
      return response.data[1] || [];
    }
    return [];
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data for ${country} (${year}):`, error.message);
    } else {
      console.error(`Unknown error fetching data for ${country} (${year})`);
    }
    return [];
  }
}

// Process and format emissions data
async function processEmissionsData(country: string, year: string): Promise<EmissionsData[]> {
  const data = await fetchEmissionsData(country, year);
  return data.map(item => ({
    countryCode: item.country.id,
    countryName: item.country.value,
    year: parseInt(item.date),
    emissions: item.value !== null && item.value !== undefined ? item.value : 0,
    unit: "Mt CO2e"
  }));
}

// Function to create an account to store data
async function createDataAccount(dataSize: number = 1024): Promise<Keypair> {
  // Create a new account keypair for storing the data
  const dataAccount = new Keypair();
  
  console.log(`Creating account with size: ${dataSize} bytes`);
  
  // Calculate the rent exemption amount
  const rentExemptionAmount = await connection.getMinimumBalanceForRentExemption(dataSize);
  console.log(`Rent exemption amount: ${rentExemptionAmount} lamports`);
  
  try {
    // Create a transaction to create the account
    const createAccountTx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: dataAccount.publicKey,
      lamports: rentExemptionAmount,
      space: dataSize,
      programId: programId,
    });
    
    // Send transaction
    const createTxId = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(createAccountTx),
      [wallet, dataAccount]
    );
    
    console.log(`Created data account with address: ${dataAccount.publicKey.toString()}`);
    console.log(`Transaction ID: ${createTxId}`);
    return dataAccount;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
}

// Function to push data to the blockchain
async function pushDataToBlockchain(dataAccount: Keypair, emissionsData: EmissionsData): Promise<string> {
  try {
    // Convert the emissions data to a JSON string
    const jsonString = JSON.stringify(emissionsData);
    console.log(`Pushing data to blockchain for ${emissionsData.countryName} (${emissionsData.year}): ${emissionsData.emissions} ${emissionsData.unit}`);
    
    // Create the data object to store - just store as JSON string
    const dataToSave = new DataField({ value: jsonString });
    
    // Serialize the data
    const serializedData = borsh.serialize(DataFieldSchema, dataToSave);
    const buffer = Buffer.from(serializedData);
    
    console.log(`Serialized data length: ${buffer.length} bytes`);
    
    // Create instruction to call our program
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: dataAccount.publicKey, isSigner: false, isWritable: true },
      ],
      programId,
      data: buffer,
    });
    
    // Send transaction with our instruction
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [wallet]
    );
    
    console.log(`Data stored on blockchain with transaction: ${tx}`);
    return tx;
  } catch (error) {
    console.error("Error pushing data to blockchain:", error);
    throw error;
  }
}

// Create a record of data accounts to avoid recreating them
const dataAccountRegistry: Record<string, Keypair> = {};

// Function to get or create a data account for a specific country and year
async function getOrCreateDataAccount(countryCode: string, year: number): Promise<Keypair> {
  const key = `${countryCode}_${year}`;
  
  if (dataAccountRegistry[key]) {
    console.log(`Using existing data account for ${key}`);
    return dataAccountRegistry[key];
  }
  
  // Create a new account
  const dataAccount = await createDataAccount(2048);  // Ensure enough space for data
  dataAccountRegistry[key] = dataAccount;
  
  // Save the registry to disk for persistence between runs
  const registryData: Record<string, string> = {};
  for (const [regKey, regAccount] of Object.entries(dataAccountRegistry)) {
    registryData[regKey] = Buffer.from(regAccount.secretKey).toString('base64');
  }
  
  fs.writeFileSync('data_account_registry.json', JSON.stringify(registryData, null, 2));
  return dataAccount;
}

// Try to load existing registry
try {
  const registryFile = fs.readFileSync('data_account_registry.json', 'utf-8');
  const registryData = JSON.parse(registryFile);
  for (const [key, base64SecretKey] of Object.entries(registryData)) {
    const secretKey = Buffer.from(base64SecretKey as string, 'base64');
    dataAccountRegistry[key] = Keypair.fromSecretKey(new Uint8Array(secretKey));
  }
  console.log(`Loaded ${Object.keys(dataAccountRegistry).length} existing data accounts from registry`);
} catch (error) {
  console.log("No existing data account registry found, will create new accounts");
}

// Main oracle function to update emissions data
async function updateEmissionsData(countries: string[], years: string[]): Promise<void> {
  console.log(`Starting emissions data update for ${countries.length} countries over ${years.length} years`);
  
  for (const year of years) {
    for (const country of countries) {
      try {
        console.log(`Processing ${country} for year ${year}...`);
        
        // Fetch and process data
        const dataItems = await processEmissionsData(country, year);
        
        if (dataItems.length === 0) {
          console.log(`No data found for ${country} (${year})`);
          continue;
        }
        
        // For each data item, create/get an account and push to blockchain
        for (const item of dataItems) {
          const dataAccount = await getOrCreateDataAccount(item.countryCode, item.year);
          await pushDataToBlockchain(dataAccount, item);
          
          // Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Error processing data for ${country} (${year}):`, error);
      }
    }
  }
  
  console.log("Emissions data update completed");
}

// Main function
async function main(): Promise<void> {
  try {
    // Define the countries to fetch data for
    const countries = ['US', 'CN', 'IN', 'JP', 'RU', 'DE', 'GB', 'FR', 'BR', 'CA'];
    
    // Define the years to fetch data for
    const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
    
    // Start the oracle service
    await updateEmissionsData(countries, years);
    
    console.log(`Oracle service execution completed`);
  } catch (error) {
    console.error('Error in oracle service:', error);
  }
}

// Run the main function
main();