import {Program, web3} from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import fs from 'fs';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { GLOBAL_AUTHORITY_SEED, PROGRAM_ID, MILSECS_IN_DAY, USER_POOL_SEED, USER_POOL_SIZE } from '../lib/constant';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

import {IDL} from "../target/types/nft_staking";
import { 
    createInitUserTx, 
    createInitializeTx, 
    createLockPnftTx, 
    createStakeNftTx, 
    createUnlockPnftTx, 
    createUnstakeNftTx, 
} from '../lib/scripts';
import { GlobalPool, UserPool } from '../lib/types';

let solConnection: Connection = null;
let program: Program = null;
let provider: anchor.Provider = null;
let payer: NodeWallet = null;

// Address of the deployed program.
let programId = new anchor.web3.PublicKey(PROGRAM_ID);

/**
 * Set cluster, provider, program
 * If rpc != null use rpc, otherwise use cluster param
 * @param cluster - cluster ex. mainnet-beta, devnet ...
 * @param keypair - wallet keypair
 * @param rpc - rpc
 */
export const setClusterConfig = async (
    cluster: web3.Cluster, 
    keypair: string, rpc?: string
) => {

    if (!rpc) {
        solConnection = new web3.Connection(web3.clusterApiUrl(cluster));
    } else {
        solConnection = new web3.Connection(rpc);
    }

    const walletKeypair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(fs.readFileSync(keypair, 'utf-8'))), 
        {skipValidation: true});
    const wallet = new NodeWallet(walletKeypair);

    // Configure the client to use the local cluster.
    anchor.setProvider(new anchor.AnchorProvider(
        solConnection, 
        wallet, 
        { skipPreflight: true, commitment: 'confirmed'}));
    payer = wallet;

    provider = anchor.getProvider();
    console.log('Wallet Address: ', wallet.publicKey.toBase58());

    // Generate the program client from IDL.
    program = new anchor.Program(IDL as anchor.Idl, programId);
    console.log('ProgramId: ', program.programId.toBase58());
}

/**
 * Initialize global pool, vault
 */
export const initProject = async () => {
    try {
        const tx = await createInitializeTx(payer.publicKey, program);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

/**
 * Initialize user pool
 */
export const initializeUserPool = async () => {
    try {
        const tx = await createInitUserTx(payer.publicKey, program);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

/**
 * Stake NFT
 */
export const stakeNft = async (
    nftMint: PublicKey
) => {
    try {
        const tx = await createStakeNftTx(payer.publicKey, nftMint, program, solConnection);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

/**
 * Unstake NFT
 */
export const unstakeNft = async (
    nftMint: PublicKey
) => {
    try {
        const tx = await createUnstakeNftTx(payer.publicKey, nftMint, program);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

export const lockPnft = async (
    nftMint: PublicKey
) => {
    try {
        const tx = await createLockPnftTx(payer.publicKey, nftMint, program, solConnection);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

export const unlockPnft = async (
    nftMint: PublicKey
) => {
    try {
        const tx = await createUnlockPnftTx(payer.publicKey, nftMint, program);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

export const getGlobalState = async (program: anchor.Program): Promise<GlobalPool | null> => {

    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)], 
        program.programId );
    console.log("globalPool: ", globalPool.toBase58());

    try
    {
        let globalState = await program.account.globalPool.fetch(globalPool);
        return globalState as unknown as GlobalPool;
    }
    catch
    {
        return null;
    }
}

export const getGlobalInfo = async () => {

    const globalPool: GlobalPool = await getGlobalState(program);
    
    return {
      admin: globalPool.admin.toBase58()
    };
}

export const getAllUsers = async () => {

    let userPools = await solConnection.getProgramAccounts(
        PROGRAM_ID,
        {
            filters: [{
                dataSize: USER_POOL_SIZE,
            }],
        }
    );

    let result: UserPool[] = [];

    try {
        for (let idx = 0; idx < userPools.length; idx++) {
            const data = userPools[idx].account.data;
            const user = new PublicKey(data.slice(8, 40));
            const stakeCnt = data[40];

            let stakeData = [];
            for (let i = 0; i < stakeCnt; i++) {
                const mint = new PublicKey(data.slice(i * 40 + 45, i * 40 + 77));

                const buf = data.slice(i * 40 + 77, i * 40 + 85).reverse();
                const time = new anchor.BN(buf);

                stakeData.push({
                    mint,
                    time,
                });
            }

            result.push({
                user,
                stakeCnt,
                stakeData,
            });
        }
    } catch (e) {
        console.log(e);
        return {};
    }
  
    return {
        count: result.length,
        data: result.map((usrPool: UserPool) => {
            return {
                user: usrPool.user.toBase58(),
                stakeCnt: usrPool.stakeCnt,
                stakeData: usrPool.stakeData.map((data) => {
                    return {
                        mint: data.mint.toBase58(),
                        time: new Date(data.time.toNumber() * 1000).toLocaleString()
                    };
                }),
            };
        }),
    };
}

export const getUserPoolState = async (
    userAddress: PublicKey
): Promise<UserPool | null> => {

    if (!userAddress) return null;

    const [userPoolKey, bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)], 
        program.programId );

    console.log('User Pool: ', userPoolKey.toBase58());
    try
    {
        let poolState = await program.account.userPool.fetch(userPoolKey, "confirmed");
        return poolState as unknown as UserPool;
    }
    catch
    {
        return null;
    }
}

export const getUserInfo = async (
    userAddress: PublicKey
) => {
    const userPool: UserPool = await getUserPoolState(userAddress);
    
    return {
        user: userPool.user.toBase58(),
        stakeCnt: userPool.stakeCnt,
        stakeData: userPool.stakeData.map((data) => {
            const timeDifference = (Date.now() - (data.time.toNumber() * 1000)) / MILSECS_IN_DAY;
            let type = 'none';
            
            if (timeDifference >= 77) {
                type = 'diamond';
            } else if (timeDifference >= 21) {
                type = 'gold';
            } else if (timeDifference >= 14) {
                type = 'silver';
            } else if (timeDifference >= 7) {
                type = 'bronze';
            }
            
            return `mint:${data.mint.toBase58()} time: ${new Date(data.time.toNumber() * 1000).toLocaleString()} type: ${type}`;
          })
    };
}
