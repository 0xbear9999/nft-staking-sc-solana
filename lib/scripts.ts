import * as anchor from '@project-serum/anchor';
import {
    PublicKey,
    Keypair,
    Connection,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
} from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

import { METAPLEX, getAssociatedTokenAccount, getMasterEdition, getMetadata } from './util';
import { GLOBAL_AUTHORITY_SEED, USER_POOL_SEED } from './constant';

export const createInitializeTx = async (
    userAddress: PublicKey,
    program: anchor.Program,
) => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)], 
        program.programId );
    console.log("globalPool: ", globalPool.toBase58());

    const txId = await program.methods
        .initialize()
        .accounts({
            admin: userAddress,
            globalPool,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY })
        .transaction();

    return txId;
}

export const createInitUserTx = async (
    userAddress: PublicKey,
    program: anchor.Program,
) => {
    const [userPool, bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)], 
        program.programId );

    console.log("userPool: ", userPool.toBase58());

    const txId = await program.methods
        .initUser()
        .accounts({
            user: userAddress,
            userPool,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY })
        .transaction();

    return txId;
}

export const createStakeNftTx = async (
    userAddress: PublicKey,
    nftMint: PublicKey,
    program: anchor.Program,
    connection: Connection
) => {
    const [globalPool, _global_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)], 
        program.programId );
    console.log("globalPool: ", globalPool.toBase58());
    
    const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)], 
        program.programId );
    console.log("userPool: ", userPool.toBase58());
  
    //    const nftEdition = await Edition.getPDA(nftMint);
    const nftEdition = await getMasterEdition(nftMint);
    console.log("nftEdition: ", nftEdition.toBase58());
    
    let userTokenAccount = await getAssociatedTokenAccount(userAddress, nftMint);
    console.log("userTokenAccount: ", userTokenAccount.toBase58());

    const mintMetadata = await getMetadata(nftMint);
    console.log("mintMetadata: ", mintMetadata.toBase58());
    
    const tx = new Transaction();

    let poolAccount = await connection.getAccountInfo(userPool);
    if (poolAccount === null || poolAccount.data === null) {
        console.log("init User Pool");
        const tx_initUserPool = await createInitUserTx(userAddress, program);
        tx.add(tx_initUserPool);
    }
    
    const txId = await program.methods
        .stakeNft()
        .accounts({
            user: userAddress,
            globalPool,
            userPool,
            nftMint,
            nftEdition,
            userTokenAccount,
            mintMetadata,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: METAPLEX })
        .transaction();
    
    tx.add(txId);

    return tx;
}

export const createUnstakeNftTx = async (
    userAddress: PublicKey,
    nftMint: PublicKey,
    program: anchor.Program,
) => {
    const [globalPool, _global_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)], 
        program.programId );
    console.log("globalPool: ", globalPool.toBase58());

    const [userPool, bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)], 
        program.programId );
    console.log("userPool: ", userPool.toBase58());

    const nftEdition = await getMasterEdition(nftMint);
    // const nftEdition = await Edition.getPDA(nftMint);
    console.log("nftEdition: ", nftEdition.toBase58());
    
    let userTokenAccount = await getAssociatedTokenAccount(userAddress, nftMint);
    console.log("userTokenAccount: ", userTokenAccount.toBase58());

    const txId = await program.methods
        .unstakeNft()
        .accounts({
            user: userAddress,
            globalPool,
            userPool,
            nftMint,
            nftEdition,
            userTokenAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: METAPLEX })
        .transaction();

    return txId;
}
