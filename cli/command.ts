import {program} from 'commander';
import {
    PublicKey
} from '@solana/web3.js';
import { getGlobalInfo, getUserInfo, initProject, initializeUserPool, setClusterConfig, stakeNft, unstakeNft } from './scripts';

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

function programCommand(name: string) {
    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet') //mainnet-beta, testnet, devnet
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'https://api.devnet.solana.com')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', '../yeni.json')
}

program.parse(process.argv);

/*
yarn staking stake -m BKQmpEnEVMBh4dEEte7bgteavH17ziyJCoEKg3FWVsKb
yarn staking unstake -m BKQmpEnEVMBh4dEEte7bgteavH17ziyJCoEKg3FWVsKb
*/
