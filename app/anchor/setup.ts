import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, IdlAccounts } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import {CompanyRegistration } from "./idl";
import { Buffer } from "buffer";
import IDL from "./idl.json";
const typedIDL = IDL as CompanyRegistration;
window.Buffer = window.Buffer || Buffer;

export function useCompanyProgram(){

  const programId = new PublicKey("ACRzjs3gnGYhkRZaGaCjMdS8ybVsAHv4n4dQMzKLoYaf");
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const wallet = useWallet();

  const provider = useMemo(() => {
    if (!wallet || !wallet.publicKey) return null;
    return new AnchorProvider(connection, wallet as any, {
      preflightCommitment: "confirmed",
    });
  }, [wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program<CompanyRegistration>(typedIDL, provider);
  }, [provider]);

  const companyRegistrationPDA = useMemo(() => {
    if (!program || !wallet || !wallet.publicKey) return null;
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("company"), wallet.publicKey.toBuffer()],
      program.programId
    );
    return pda;
  }, [program]);
  

  return {
    program,
    provider,
    companyRegistrationPDA,
  }
}

export type CompanyRegistrationData = IdlAccounts<CompanyRegistration>["Company"];