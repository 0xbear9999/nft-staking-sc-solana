import {program} from 'commander';
import {
    PublicKey
} from '@solana/web3.js';
import { getAllUsers, getGlobalInfo, getUserInfo, initProject, initializeUserPool, lockPnft, setClusterConfig, stakeNft, unlockPnft, unstakeNft } from './scripts';

program.version('0.0.1');

programCommand('status')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
.action(async (directory, cmd) => {
    const { env, keypair, rpc } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);
    await setClusterConfig(env, keypair, rpc);
    
    console.log(await getGlobalInfo());
});

programCommand('get-users')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
.action(async (directory, cmd) => {
    const { env, keypair, rpc } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);
    await setClusterConfig(env, keypair, rpc);
    
    console.log(await getAllUsers());
});

programCommand('user-status')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
.option('-a, --address <string>', 'user pubkey')
.action(async (directory, cmd) => {
    const { env, keypair, rpc, address } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);
    await setClusterConfig(env, keypair, rpc);

    if (address === undefined) {
      console.log("Error User Address input");
      return;
    }
    console.log(await getUserInfo(new PublicKey(address)));
});

programCommand('init')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
.action(async (directory, cmd) =>
{
    const { env, keypair, rpc } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);
    
    await setClusterConfig(env, keypair, rpc);

    await initProject();
});

programCommand('stake')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
.option('-m, --mint <number>')
.action(async (directory, cmd) => {
    const { env, keypair, rpc, mint } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);

    await setClusterConfig(env, keypair, rpc);
    if (mint === undefined) {
        console.log("Error token amount Input");
        return;
    }

    await stakeNft(new PublicKey(mint));
});

programCommand('unstake')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
.option('-m, --mint <number>')
.action(async (directory, cmd) => {
    const { env, keypair, rpc, mint } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);

    await setClusterConfig(env, keypair, rpc);
    if (mint === undefined) {
        console.log("Error token amount Input");
        return;
    }

    await unstakeNft(new PublicKey(mint));
});

programCommand('lock')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
.option('-m, --mint <number>')
.action(async (directory, cmd) => {
    const { env, keypair, rpc, mint } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);

    await setClusterConfig(env, keypair, rpc);
    if (mint === undefined) {
        console.log("Error token amount Input");
        return;
    }

    await lockPnft(new PublicKey(mint));
});

programCommand('unlock')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
.option('-m, --mint <number>')
.action(async (directory, cmd) => {
    const { env, keypair, rpc, mint } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);

    await setClusterConfig(env, keypair, rpc);
    if (mint === undefined) {
        console.log("Error token amount Input");
        return;
    }

    await unlockPnft(new PublicKey(mint));
});

function programCommand(name: string) {
    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'mainnet-beta') //mainnet-beta, testnet, devnet
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'https://api.mainnet-beta.solana.com')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', '../ghastly.json')
}

program.parse(process.argv);

/*
yarn script stake -m BKQmpEnEVMBh4dEEte7bgteavH17ziyJCoEKg3FWVsKb
yarn script unstake -m BKQmpEnEVMBh4dEEte7bgteavH17ziyJCoEKg3FWVsKb
yarn script user-status -a ch3KympRpdH6us5SEHhswvc95YkXBoQhYhuduJo7U4U
yarn script get-users
*/
