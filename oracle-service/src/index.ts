import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import * as fs from 'fs';
import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables
config();

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

// Set up connection to Solana network
const connection = new Connection(
  process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 
  'confirmed'
);

// Load wallet from keypair file or environment
let wallet: Keypair;
try {
  const WALLET_PATH = process.env.WALLET_PATH || './keypair.json';
  wallet = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(WALLET_PATH, 'utf-8')))
  );
  console.log(`Using wallet: ${wallet.publicKey.toString()}`);
} catch (error) {
  console.error('Error loading wallet:', error);
  process.exit(1);
}

// Program and account configuration
const programId = new PublicKey(process.env.PROGRAM_ID || '2dkNDu5E3Gewzf9AJKNCeH95vK1cmAvR93qXgMUCUMra');
let dataAccountAddress = process.env.DATA_ACCOUNT_ADDRESS || '';
let dataAccount: Keypair | null = null;

// World Bank API endpoints
const WORLDBANK_API_BASE = 'https://api.worldbank.org/v2';
const EMISSIONS_INDICATOR = 'EN.ATM.CO2E.KT'; // CO2 emissions (kt)

// Function to fetch emissions data from World Bank API
async function fetchEmissionsData(countryCode: string, year: number): Promise<any> {
  try {
    console.log(`Fetching emissions data for ${countryCode}, year ${year}...`);
    
    const url = `${WORLDBANK_API_BASE}/countries/${countryCode}/indicators/${EMISSIONS_INDICATOR}?date=${year}&format=json`;
    const response = await axios.get(url);
    
    // World Bank API returns an array where [0] is metadata and [1] is the data array
    if (response.data && Array.isArray(response.data) && response.data.length > 1) {
      const data = response.data[1];
      
      if (data && data.length > 0) {
        // Extract the data we need
        const emissionsData = {
          countryCode: data[0].country.id,
          countryName: data[0].country.value,
          year: parseInt(data[0].date),
          emissions: data[0].value || 0,
          unit: 'kt'
        };
        
        console.log(`Successfully fetched data:`, emissionsData);
        return emissionsData;
      }
    }
    
    console.warn(`No data found for ${countryCode} in ${year}`);
    return null;
  } catch (error) {
    console.error('Error fetching emissions data:', error);
    return null;
  }
}

// Function to create a new data account if not provided
async function createDataAccount(): Promise<Keypair> {
  if (dataAccountAddress) {
    console.log(`Using existing account: ${dataAccountAddress}`);
  }
  
  // Create a new account keypair for storing the data
  const newDataAccount = Keypair.generate();
  
  try {
    // Calculate the space needed for our data
    // Just store a JSON string in the "value" field
    const sampleData = new DataField({ value: JSON.stringify({
      countryCode: "US",
      countryName: "United States",
      year: 2023,
      emissions: 5416.0,
      unit: "kt"
    })});
    
    const serializedData = borsh.serialize(DataFieldSchema, sampleData);
    // Add some extra space for future data
    const dataSize = serializedData.length + 100;
    
    console.log(`Allocating ${dataSize} bytes for account data`);

    // Get minimum balance for rent exemption
    const rentExemptionAmount = await connection.getMinimumBalanceForRentExemption(dataSize);
    
    // Create the account
    const createAccountIx = require('@solana/web3.js').SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: newDataAccount.publicKey,
      lamports: rentExemptionAmount,
      space: dataSize,
      programId: programId,
    });
    
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(createAccountIx),
      [wallet, newDataAccount]
    );
    
    console.log(`Created new data account: ${newDataAccount.publicKey.toString()}`);
    console.log(`Transaction: ${tx}`);
    
    // Update the data account address
    dataAccountAddress = newDataAccount.publicKey.toString();
    
    // Save the account address to a file for future use
    fs.writeFileSync('./.data-account', dataAccountAddress);
    console.log(`Saved account address to .data-account file`);
    
    return newDataAccount;
  } catch (error) {
    console.error('Error creating data account:', error);
    process.exit(1);
  }
}

// Function to update emissions data on-chain
async function updateEmissionsData(emissionsData: any): Promise<void> {
  try {
    if (!dataAccountAddress) {
      throw new Error('No data account address available');
    }
    
    // Convert complex object to JSON string and store in "value" field
    const dataToSave = new DataField({
      value: JSON.stringify(emissionsData)
    });
    
    // Serialize the data
    const serializedData = borsh.serialize(DataFieldSchema, dataToSave);
    const buffer = Buffer.from(serializedData);
    
    // Create instruction to call our program
    const instruction = new TransactionInstruction({
      keys: [
        { 
          pubkey: new PublicKey(dataAccountAddress), 
          isSigner: false, 
          isWritable: true 
        },
      ],
      programId,
      data: buffer,
    });
    
    // Send transaction
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [wallet]
    );
    
    console.log(`Updated on-chain data for ${emissionsData.countryName}, year ${emissionsData.year}`);
    console.log(`Transaction: https://explorer.solana.com/tx/${tx}?cluster=${process.env.SOLANA_NETWORK || 'devnet'}`);
  } catch (error) {
    console.error('Error updating on-chain data:', error);
  }
}

// Function to read current on-chain data
async function readCurrentData(): Promise<any> {
  try {
    if (!dataAccountAddress) {
      return null;
    }
    
    const accountInfo = await connection.getAccountInfo(new PublicKey(dataAccountAddress));
    
    if (!accountInfo) {
      console.warn('Account not found or has no data');
      return null;
    }
    
    // Deserialize the data
    const deserializedData = borsh.deserialize(
      DataFieldSchema,
      DataField,
      accountInfo.data
    );
    
    // Parse the JSON string
    const emissionsData = JSON.parse(deserializedData.value);
    console.log('Current on-chain data:', emissionsData);
    
    return emissionsData;
  } catch (error) {
    console.error('Error reading on-chain data:', error);
    return null;
  }
}

// Main oracle function to periodically update data
async function runOracle(): Promise<void> {
  try {
    console.log('Starting emissions data oracle service...');
    
    // Try to load existing data account address from file if not provided
    if (!dataAccountAddress) {
      try {
        dataAccountAddress = fs.readFileSync('./.data-account', 'utf-8').trim();
        console.log(`Loaded data account address: ${dataAccountAddress}`);
      } catch (e) {
        console.log('No existing data account address found');
      }
    }
    
    // Create data account if needed
    dataAccount = await createDataAccount();
    
    // Define the countries and years to monitor
    const countries = [
      { code: 'USA', name: 'United States' },
      { code: 'CHN', name: 'China' },
      { code: 'IND', name: 'India' }
    ];
    
    const currentYear = new Date().getFullYear() - 2; // World Bank data is usually 2 years behind
    
    // Initial data update
    console.log('Performing initial data update...');
    
    // Read current data to avoid unnecessary updates
    const currentData = await readCurrentData();
    
    // Only update if we need to
    if (!currentData || currentData.year < currentYear - 3) {
      for (const country of countries) {
        const emissionsData = await fetchEmissionsData(country.code, currentYear - 3);
        
        if (emissionsData) {
          await updateEmissionsData(emissionsData);
          // Pause to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } else {
      console.log('Data is already up to date');
    }
    
    // Set up periodic updates (once a day)
    const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL_MS 
      ? parseInt(process.env.UPDATE_INTERVAL_MS) 
      : 24 * 60 * 60 * 1000; // Default: once a day
    
    console.log(`Oracle service running. Will check for updates every ${UPDATE_INTERVAL / (60 * 60 * 1000)} hours`);
    
    setInterval(async () => {
      console.log(`Checking for data updates at ${new Date().toISOString()}`);
      
      // Read current data
      const currentData = await readCurrentData();
      
      // Check if we need to update (if data is over 3 months old)
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      if (!currentData || new Date(currentData.lastUpdated) < threeMonthsAgo) {
        console.log('Data needs updating');
        
        // Fetch new data for each country
        for (const country of countries) {
          const emissionsData = await fetchEmissionsData(country.code, currentYear - 3);
          
          if (emissionsData) {
            // Add timestamp for tracking update freshness
            emissionsData.lastUpdated = new Date().toISOString();
            
            await updateEmissionsData(emissionsData);
            // Pause to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      } else {
        console.log('Data is still fresh, no update needed');
      }
    }, UPDATE_INTERVAL);
    
  } catch (error) {
    console.error('Oracle service error:', error);
    process.exit(1);
  }
}

// Start the oracle service
runOracle().catch(err => {
  console.error('Failed to start oracle service:', err);
  process.exit(1);
});