let Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let account = web3.eth.accounts[0];
const fs = require("fs");

///  Config. ////
let n = 7000;
let rate = 10; //  X transactions/sec.
//// ------ ////

fs.readFile("../n7000_tx_list", "utf8", async function(err, contents) {
  let tx_list = JSON.parse(contents);
  let last_count = 0;
  console.log(`using account: ${account}`);
  let isUnlock = web3.personal.unlockAccount(account, "123", 20000);
  console.log(`is unlock: ${isUnlock}`);
  let start_time = new Date();
  let loop_start_time = start_time;

  for (let i = 1; i <= n; i++) {
    let tx_id = tx_list[i - 1].tx_id;
    console.log(`access transaction: ${tx_id}`);

    let transaction = await web3.eth.getTransaction(tx_id);
    let tx_hash = transaction.hash;
    let tx_input = transaction.hash;
    let tx_value = transaction.value;
    console.log(
      `i: ${i}, tx_hash: ${tx_hash}, tx_input: ${tx_input}, tx_value: ${tx_value}`
    );

    if (i - last_count == rate && new Date() - loop_start_time < 1000) {
      console.log(`waiting for 1 sec.`);
      while (new Date() - loop_start_time < 1000) {}
      loop_start_time = new Date();
      last_count = i;
    }
  }

  let stop_time = new Date();
  console.log(
    `start time: ${start_time}\nstop time: ${stop_time}\nlap time: ${stop_time -
      start_time} ms.`
  );
});
