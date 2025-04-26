import { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { SystemProgram, PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useCompanyProgram } from "../anchor/setup";

export const useCompanyActions = () => {
    const { connection } = useConnection();
    const {publicKey, sendTransaction} = useWallet();
    const { program, companyRegistrationPDA } = useCompanyProgram();
    const wallet = useWallet();

    //Fetch company data from given wallet address
    const fetchCompanyData = async (companyWalletAddr: string) => {
        if (!program || !companyWalletAddr) return null;

        const walletAddr = new PublicKey(companyWalletAddr);

        const [pda] = PublicKey.findProgramAddressSync(
            [Buffer.from("company"), walletAddr.toBuffer()],
            program.programId
        );

        try {
            const data = await program.account.company.fetch(pda);
            const unixTimestamp = data.verificationTime.toNumber(); // i64 -> number
            let date = null;
            if (unixTimestamp === "0"){
                date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds 
                date = date.toLocaleString();
            }else{
                date = "Not verified yet";
            }
            const dataToReturn = {
                companyName: data.companyName.toString(),
                companyWalletAddr: data.companySigner.toBase58(),
                verificationStatus: data.verificationStatus.toString(),
                verificationTime: date,
                productsAmount: data.productsAmount, 
            }
            console.log("Company wallet:", data.companySigner.toBase58())
            console.log(dataToReturn);
            return dataToReturn;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //Create company with a Name, wallet connection is required
    const createCompany = async (companyName: string) => {
        if (!program || !companyRegistrationPDA || !publicKey) return;  // Check if publicKey is valid
        try {
            const tx = await program.methods
            .initCompany(
                companyName,
            )
            .accounts({
                signer: publicKey,
                company: companyRegistrationPDA,
                })
            .transaction();

            const transactionSignature = await sendTransaction(tx, connection);

            console.log(
                `https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`,
            )
        }
        catch (error) {
            console.error("Error creating company:", error);
        }
    }

    //Change status from Unverified to Verified
    const verify = async (companyWalletAddr: string) => {
        if (!program || !companyRegistrationPDA || !publicKey) return;  // Check if publicKey is valid

        const walletAddr = new PublicKey(companyWalletAddr);

        const [pda] = PublicKey.findProgramAddressSync(
            [Buffer.from("company"), walletAddr.toBuffer()],
            program.programId
        );
        
        try {
            const tx = await program.methods
            .verify()
            .accounts({
                signer: publicKey,
                company: pda,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .transaction();

            const transactionSignature = await sendTransaction(tx, connection);

            console.log(
                `https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`,
            )
        }
        catch (error) {
            console.error("Error verifying company:", error);
        }
    }

    //Increase product number by 1
    const addProduct = async () => {
        if (!program || !companyRegistrationPDA || !publicKey) return;  // Check if publicKey is valid
        try {
            const tx = await program.methods
            .addProduct(
                new PublicKey("DcGHAMZsM2P2ZsrVbY9f5gS64PYBS74xnjcUzWNJBSYk"),
            )
            .accounts({
                signer: publicKey,
                company: companyRegistrationPDA,
                })
            .transaction();

            const transactionSignature = await sendTransaction(tx, connection);

            console.log(
                `https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`,
            )
        }
        catch (error) {
            console.error("Error adding product:", error);
        }
    }

    return {
        fetchCompanyData,
        createCompany,
        verify,
        addProduct,
    }
}

