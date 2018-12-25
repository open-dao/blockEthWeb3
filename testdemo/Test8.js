/**
 * 主要用来测试只能合约的交易;
 */
const R = require('ramda');
const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const data = require('./app/api/data.json');
// const web3 = new Web3();//使用web3来进行区块链接口的调用
// web3.setProvider(new Web3.providers.HttpProvider('http://192.168.10.112:61910'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8486'));
console.log('Initialization web3 complete,the first account is ');
// 查询某个合约地址余额;
const contratInfo ={};
contratInfo.address = "0x09fD7b59C8e0CeFc3C7e1c18dAC7fD42D63aD01a";
contratInfo.abi=[{ "constant": false, "inputs": [ { "name": "_key", "type": "bytes32" }, { "name": "timestamp", "type": "uint256" }, { "name": "sender", "type": "address" }, { "name": "version", "type": "uint256" }, { "name": "hash", "type": "bytes32" } ], "name": "setData", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x1d7bae50" }, { "constant": true, "inputs": [ { "name": "_key", "type": "bytes32" } ], "name": "getData", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "bytes32", "value": "0x0000000000000000000000000000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x54f6127f" }, { "constant": false, "inputs": [ { "name": "_key", "type": "bytes32" }, { "name": "extend", "type": "string" } ], "name": "setExtend", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x6074ac61" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_handler", "type": "address" }, { "indexed": false, "name": "timestamp", "type": "uint256" }, { "indexed": true, "name": "sender", "type": "address" }, { "indexed": false, "name": "version", "type": "uint256" }, { "indexed": false, "name": "hash", "type": "bytes32" } ], "name": "DataSaved", "type": "event", "signature": "0x042cd17415d0de97a240ee96c1e673fb4995deb2fa9ee9ed203024bdc7787511" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_handler", "type": "address" }, { "indexed": false, "name": "extend", "type": "string" } ], "name": "ExtendSaved", "type": "event", "signature": "0xc893809e7e5d0ee5af3da4a488cb2441507e7e63b84c8484ed9ca38a65ebe612" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_handler", "type": "address" }, { "indexed": false, "name": "version", "type": "uint256" }, { "indexed": false, "name": "extend", "type": "string" } ], "name": "ExtendNotSave", "type": "event", "signature": "0x13e978f6065f31e07a3300b6c34229636d6eeb621ae378df95a89913c13c0fee" }];
const myContract = new web3.eth.Contract(contratInfo.abi, contratInfo.address);

let hashKey= '0xA228b6983CDe708301Ca1C42cbf5103be2C5eAcA';
hashKey = web3.utils.sha3('12312312313132');
console.log(hashKey);
//const extendValue = new Date().getTime().toString();
var extendValue=`{"data":{"head":{"ret":"0","remes":""},"msg":{"head":{"blockHash":"0xbeb4bd26b0f5b6c8a07ec2e4afd715d04554907cc7f57234f73171ccb30bc369","blockNumber":267718,"from":"0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e","gas":6500000,"gasPrice":"8000000000","hash":"0x1faf3dd0c4ae6c9e3f477feb9805001997183652affa4e87e68cc6d9a6e87cc1","input":"0x6074ac61a1be1e1b820008d3f5963ae396ed73f9a0564e500000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000033d436f64655075736820e698afe5beaee8bdafe68f90e4be9be79a84e4b880e5a597e794a8e4ba8ee783ade69bb4e696b0205265616374204e617469766520e5928c20436f72646f766120e5ba94e794a8e79a84e69c8de58aa1e380820a436f64655075736820e698afe68f90e4be9be7bb99205265616374204e617469766520e5928c20436f72646f766120e5bc80e58f91e88085e79bb4e68ea5e983a8e7bdb2e7a7bbe58aa8e5ba94e794a8e69bb4e696b0e7bb99e794a8e688b7e8aebee5a487e79a84e4ba91e69c8de58aa1e38082436f64655075736820e4bd9ce4b8bae4b880e4b8aae4b8ade5a4aee4bb93e5ba93efbc8ce5bc80e58f91e88085e58fafe4bba5e68ea8e98081e69bb4e696b020284a532c2048544d4c2c2043535320616e6420696d6167657329efbc8ce5ba94e794a8e58fafe4bba5e4bb8ee5aea2e688b7e7abaf2053444b20e9878ce99da2e69fa5e8afa2e69bb4e696b0e38082436f64655075736820e58fafe4bba5e8aea9e5ba94e794a8e69c89e69bb4e5a49ae79a84e58fafe7a1aee5ae9ae680a7efbc8ce4b99fe58fafe4bba5e8aea9e4bda0e79bb4e68ea5e68ea5e8a7a6e794a8e688b7e7bea4e38082e59ca8e4bfaee5a48de4b880e4ba9be5b08fe997aee9a298e5928ce6b7bbe58aa0e696b0e789b9e680a7e79a84e697b6e58099efbc8ce4b88de99c80e8a681e7bb8fe8bf87e4ba8ce8bf9be588b6e68993e58c85efbc8ce58fafe4bba5e79bb4e68ea5e68ea8e98081e4bba3e7a081e8bf9be8a18ce5ae9ee697b6e69bb4e696b0e380820a0a436f64655075736820e58fafe4bba5e8bf9be8a18ce5ae9ee697b6e79a84e68ea8e98081e4bba3e7a081e69bb4e696b00a2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d0ae4bd9ce88085efbc9a4372617a79436f6465426f790ae69da5e6ba90efbc9a4353444e0ae58e9fe69687efbc9a68747470733a2f2f626c6f672e6373646e2e6e65742f66656e6779757a68656e6766616e2f61727469636c652f64657461696c732f35323030333739380ae78988e69d83e5a3b0e6988eefbc9ae69cace69687e4b8bae58d9ae4b8bbe58e9fe5889be69687e7aba0efbc8ce8bdace8bdbde8afb7e99984e4b88ae58d9ae69687e993bee68ea5efbc81000000","nonce":733,"to":"0x09fD7b59C8e0CeFc3C7e1c18dAC7fD42D63aD01a","transactionIndex":0,"value":"0","v":"0xed","r":"0x3d059a18857a9d4626fe61718d331a9782b6172cd9dca116cfba1115586a5b22","s":"0x2695f493e4340fe1efd6f7e6e27dbbc49b2b2181155cc1df0ee36bdc69852cdf"}}}}`;
myContract.methods.getData(hashKey).call().then(res => {
  console.log(res,res['4']);
  if (res['4'] !=''){
    console.log('INSERT ONE')
    web3.eth.personal.unlockAccount('0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', 'qwertyuiopqazplm').then(res=>{
      myContract.methods.setExtend(hashKey, extendValue).send({ from: '0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', gas: 6500000 }).then(res => {
        console.log(res);
      }).catch(err=>{
        console.log(err);
      });
    });

  }else{
    console.log('INSERT TWO')
    web3.eth.personal.unlockAccount('0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', 'qwertyuiopqazplm').then(res=>{
      myContract.methods.setData(hashKey,new Date().getTime(),'0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e','2', hashKey).send({ from: '0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', gas: 6500000 }).then(res => {
        console.log('setData Success')
        myContract.methods.setExtend(hashKey, extendValue).send({ from: '0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', gas: 6500000 }).then(res => {
          console.log(res);
        }).catch(err=>{
          console.log(err);
        });
      }).catch(err=>{
        console.log(err);
      });
    });
  }
});

/*
web3.eth.personal.unlockAccount('0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', 'qwertyuiopqazplm').then(res=>{
  console.log(res, 'unlockAdminAccountResult', new Date());
  //var extendValue=`{"data":{"head":{"ret":"0","remes":""},"msg":{"head":{"blockHash":"0xbeb4bd26b0f5b6c8a07ec2e4afd715d04554907cc7f57234f73171ccb30bc369","blockNumber":267718,"from":"0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e","gas":6500000,"gasPrice":"8000000000","hash":"0x1faf3dd0c4ae6c9e3f477feb9805001997183652affa4e87e68cc6d9a6e87cc1","input":"0x6074ac61a1be1e1b820008d3f5963ae396ed73f9a0564e500000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000033d436f64655075736820e698afe5beaee8bdafe68f90e4be9be79a84e4b880e5a597e794a8e4ba8ee783ade69bb4e696b0205265616374204e617469766520e5928c20436f72646f766120e5ba94e794a8e79a84e69c8de58aa1e380820a436f64655075736820e698afe68f90e4be9be7bb99205265616374204e617469766520e5928c20436f72646f766120e5bc80e58f91e88085e79bb4e68ea5e983a8e7bdb2e7a7bbe58aa8e5ba94e794a8e69bb4e696b0e7bb99e794a8e688b7e8aebee5a487e79a84e4ba91e69c8de58aa1e38082436f64655075736820e4bd9ce4b8bae4b880e4b8aae4b8ade5a4aee4bb93e5ba93efbc8ce5bc80e58f91e88085e58fafe4bba5e68ea8e98081e69bb4e696b020284a532c2048544d4c2c2043535320616e6420696d6167657329efbc8ce5ba94e794a8e58fafe4bba5e4bb8ee5aea2e688b7e7abaf2053444b20e9878ce99da2e69fa5e8afa2e69bb4e696b0e38082436f64655075736820e58fafe4bba5e8aea9e5ba94e794a8e69c89e69bb4e5a49ae79a84e58fafe7a1aee5ae9ae680a7efbc8ce4b99fe58fafe4bba5e8aea9e4bda0e79bb4e68ea5e68ea5e8a7a6e794a8e688b7e7bea4e38082e59ca8e4bfaee5a48de4b880e4ba9be5b08fe997aee9a298e5928ce6b7bbe58aa0e696b0e789b9e680a7e79a84e697b6e58099efbc8ce4b88de99c80e8a681e7bb8fe8bf87e4ba8ce8bf9be588b6e68993e58c85efbc8ce58fafe4bba5e79bb4e68ea5e68ea8e98081e4bba3e7a081e8bf9be8a18ce5ae9ee697b6e69bb4e696b0e380820a0a436f64655075736820e58fafe4bba5e8bf9be8a18ce5ae9ee697b6e79a84e68ea8e98081e4bba3e7a081e69bb4e696b00a2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d0ae4bd9ce88085efbc9a4372617a79436f6465426f790ae69da5e6ba90efbc9a4353444e0ae58e9fe69687efbc9a68747470733a2f2f626c6f672e6373646e2e6e65742f66656e6779757a68656e6766616e2f61727469636c652f64657461696c732f35323030333739380ae78988e69d83e5a3b0e6988eefbc9ae69cace69687e4b8bae58d9ae4b8bbe58e9fe5889be69687e7aba0efbc8ce8bdace8bdbde8afb7e99984e4b88ae58d9ae69687e993bee68ea5efbc81000000","nonce":733,"to":"0x09fD7b59C8e0CeFc3C7e1c18dAC7fD42D63aD01a","transactionIndex":0,"value":"0","v":"0xed","r":"0x3d059a18857a9d4626fe61718d331a9782b6172cd9dca116cfba1115586a5b22","s":"0x2695f493e4340fe1efd6f7e6e27dbbc49b2b2181155cc1df0ee36bdc69852cdf"}}}}`;
  var extendValue=`1111qqddaa`;
  myContract.methods.setExtend('0xA1be1e1b820008d3F5963Ae396eD73f9a0564E50', extendValue).send({ from: '0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', gas: 6500000 }).then(res => {

    console.log('setExtend success start *******************1122', new Date());
    console.log(res);
    console.log('setExtend success end ********************1122', new Date());
    myContract.methods.getData('0xA1be1e1b820008d3F5963Ae396eD73f9a0564E51').call().then(res => {
      console.log('2x')
      console.log(res);
    }).catch(err=>{
      console.log('xxxx',err);
    });

  }).catch(err=>{
    console.log(err);
  })

})
*/




