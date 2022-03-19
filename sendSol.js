const web3 =  require("@solana/web3.js");

const path =  require("path");
const os =  require("os");
const fs =  require("fs");
const yaml =  require("yaml");

// import os from 'os';
// import fs from 'mz/fs';
// import path from 'path';
// import yaml from 'yaml';
// import {Keypair} from '@solana/web3.js';
(async () => {
  // Connect to cluster
  console.log(web3.clusterApiUrl('devnet'))
  const connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed',
  );
  // Uncomment the below command to test your connection to your node
//   console.log(await connection.getEpochInfo())

//#####################################

// const CONFIG_FILE_PATH = path.resolve(  
//     os.homedir(),   
//     '.config',    
//     'solana',    
//     'cli',    
//     'config.yml',   
//   );             
//   const configYml = await fs.readFile(CONFIG_FILE_PATH, 
//     {encoding: 'utf8'},function (err, data) {
//     if(err) console.log('error', err);
//     console.log("here",data)
//   }
//   );
//   configYml = yaml.parse(configYml);

//   console.log(configYml)

// const secretKeyString = await fs.readFile(configYml, {encoding: 'utf8'},function (err, data) {
//     if(err) console.log('error', err);
// });
// const secretKey = Uint8Array.from(JSON.parse(secretKeyString));


//######################################
  // Generate a new random public key
  const from = web3.Keypair.generate();
  console.log(web3.LAMPORTS_PER_SOL/100000);
  const airdropSignature = await connection.requestAirdrop(
    from.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  console.log(airdropSignature)

  await connection.confirmTransaction(airdropSignature);
  // Generate a new random public key
  const to = web3.Keypair.generate();

  // Add transfer instruction to transaction
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: web3.LAMPORTS_PER_SOL / 100,
    }),
  );

  // Sign transaction, broadcast, and confirm
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
  );
  console.log('SIGNATURE', signature);
})();



