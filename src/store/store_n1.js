let Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let account = web3.eth.accounts[0];
const fs = require("fs");

///  Config. ////
let n = 1;
let rate = 10 //  X transactions/sec.
//// ------ ////

let last_count = 0;
let tx_list = [];
console.log(`using account: ${account}`);
let isUnlock = web3.personal.unlockAccount(account, "123", 20000);
console.log(`is unlock: ${isUnlock}`);
let start_time = new Date();
let loop_start_time = start_time;
for (let i = 1 ; i<=n ; i++){
    let tx_id = web3.eth.sendTransaction({from:account, data:"0x00", value: Math.floor(Math.random()*10000)});
    console.log(`i: ${i}, tx_id: ${tx_id}`);
    tx_list.push(tx_id);
    if(i - last_count == rate && new Date() - loop_start_time < 1000){
        console.log(`waiting for 1 sec.`)
        while(new Date() - loop_start_time < 1000){}
        loop_start_time = new Date();
        last_count = i;
    }
}

let stop_time = new Date();
console.log(`start time: ${start_time}\nstop time: ${stop_time}\nlap time: ${stop_time-start_time} ms.`);

//console.log(tx_list)
let json = JSON.stringify(tx_list);
fs.writeFile('../n1_tx_list', json, 'utf8', function(err){console.log(err)});