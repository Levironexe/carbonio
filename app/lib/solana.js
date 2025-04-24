import { Connection, PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import idl from './idl.json';

// Constants
const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID);
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

// Create connection
export const getConnection = () => {
  return new Connection(SOLANA_RPC_URL);
};

// Get program
export const getProgram = (wallet) => {
  const connection = getConnection();
  const provider = { connection, wallet };
  return new Program(idl, PROGRAM_ID, provider);
};

// Get emissions account address
export const getEmissionsAccountAddress = async (countryCode, year) => {
  const [emissionsAccount] = await PublicKey.findProgramAddress(
    [
      Buffer.from("emissions"),
      Buffer.from(countryCode),
      Buffer.from(year.toString())
    ],
    PROGRAM_ID
  );
  return emissionsAccount;
};

// Fetch emissions data for a specific country and year
export const fetchCountryEmissions = async (countryCode, year) => {
  try {
    const connection = getConnection();
    const emissionsAccountAddress = await getEmissionsAccountAddress(countryCode, year);
    
    // Fetch the account data
    const accountInfo = await connection.getAccountInfo(emissionsAccountAddress);
    
    if (!accountInfo) {
      return null; // Account doesn't exist
    }
    
    // Deserialize the data
    const program = getProgram();
    const accountData = program.coder.accounts.decode('EmissionsData', accountInfo.data);
    
    // Convert scaled emissions back to decimal
    return {
      ...accountData,
      emissions: accountData.emissions / 100
    };
  } catch (error) {
    console.error('Error fetching emissions data:', error);
    return null;
  }
};

// Fetch multiple years for a country
export const fetchCountryEmissionsHistory = async (countryCode, startYear = 2015, endYear = 2023) => {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  
  const results = await Promise.all(
    years.map(year => fetchCountryEmissions(countryCode, year))
  );
  
  // Filter out null results and sort by year
  return results
    .filter(result => result !== null)
    .sort((a, b) => a.year - b.year);
};

// Fetch top emitters for a specific year
export const fetchTopEmitters = async (year = 2023, limit = 10) => {
  // This is inefficient on Solana since we can't query by prefix only
  // In a real app, you'd have an index account or use a different approach
  // This is just for demonstration
  const countries = ['USA', 'CHN', 'IND', 'RUS', 'JPN', 'DEU', 'IRN', 'KOR', 'SAU', 'IDN', 'CAN', 'MEX', 'BRA', 'ZAF', 'GBR'];
  
  const results = await Promise.all(
    countries.map(code => fetchCountryEmissions(code, year))
  );
  
  return results
    .filter(result => result !== null)
    .sort((a, b) => b.emissions - a.emissions)
    .slice(0, limit);
};