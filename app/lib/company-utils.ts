import { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { SystemProgram, PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useCompanyProgram } from "../anchor/setup";

const { connection } = useConnection();
const {publicKey, sendTransaction} = useWallet();
const { program, companyRegistrationPDA } = useCompanyProgram();

export const fetchData = async () => {
    if (!publicKey) return;
    if (!program || !companyRegistrationPDA) return;
    try {
        const data = await program.account.company.fetch(companyRegistrationPDA);
        console.log("Company Data:", data);
        console.log("Company wallet:", data.companySigner.toBase58())
        const unixTimestamp = data.verificationTime.toNumber(); // i64 -> number
        const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
        console.log(date.toLocaleString()); // Human-readable format
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    };

export const createCompany = async () => {
    if (!program || !companyRegistrationPDA || !publicKey) return;  // Check if publicKey is valid
    try {
        const tx = await program.methods
        .initCompany(
            "Apple",
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

export const verify = async () => {
    if (!program || !companyRegistrationPDA || !publicKey) return;  // Check if publicKey is valid
    console.log("companyRegistrationPDA", companyRegistrationPDA.toBase58());
    try {
        const tx = await program.methods
        .verify()
        .accounts({
            signer: publicKey,
            company: companyRegistrationPDA,
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

export const addProduct = async () => {
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
