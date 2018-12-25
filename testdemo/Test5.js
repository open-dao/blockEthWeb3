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
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.10.112:8486'));
console.log('Initialization web3 complete,the first account is ');
// 查询某个合约地址余额;
const address = '0x5b202acCA5978b8Cdb5020EA9dd4200Aa56265Bb';
const address_to = '0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc';
// const address_to = '0x83fe3A9515e785673Bc72225bfc9569913ea6564';
const contratInfo = R.find(R.propEq('name', 'DD1'))(data.contratList);
const myContract = new web3.eth.Contract(contratInfo.abi, contratInfo.address);
myContract.methods.balanceOf(address_to).call().then(v => {
  const balance = web3.utils.fromWei(v, 'ether');
  console.log(balance, '2');
});
const myContract0 = new web3.eth.Contract(contratInfo.abi, contratInfo.address);
myContract0.methods.balanceOf(address).call().then(v => {
  // 810000.999999999999423116 2
  const balance = web3.utils.fromWei(v, 'ether');
  console.log(balance, '2');
});


// 转账金额;
// const value = (web3.utils.toWei(new Web3.utils.BN(1),'ether'))
// console.log(value,new Web3.utils.BN(1))
const value = 1000;


// 通过主用户给别人转账;
/* web3.eth.personal.unlockAccount(contratInfo.owneraddress, contratInfo.ownerpassword).then(res=>{
  console.log(res,'unlockAccountResult')
  console.log(myContract.methods.transfer)
  console.log(myContract.options);
  myContract.methods.transfer(address_to,value).send({from:address,gas :500000}).then(res=>{
    console.log(res.events.Transfer,'sendTransaction')
    console.log(res.events.Transfer.raw.data,'sendTransaction')
    // web3.utils.hexToUtf8(res.events.Transfer.raw.data)

  })
})*/


// 通过主用户给别人转账;
/* web3.eth.personal.unlockAccount(contratInfo.owneraddress, contratInfo.ownerpassword).then(res=>{
  console.log(res,'unlockAccountResult')
  console.log(myContract.methods.transfer)
  console.log(myContract.options);
  myContract.methods.transfer('0x5b202acCA5978b8Cdb5020EA9dd4200Aa56265Bb',value).send({from:address,gas :500000}).then(res=>{
    console.log(res,'sendTransaction')
  })
})*/


//  gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// 一个用户转给另外一个用户;

// web3.eth.personal.unlockAccount('0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc', '0123456789').then(res => {
web3.eth.personal.unlockAccount(contratInfo.owneraddress, contratInfo.ownerpassword).then(res=>{
  console.log(res, 'unlockAdminAccountResult', new Date());
  web3.eth.personal.unlockAccount('0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc', '0123456789').then(res=>{
    console.log(res, 'unlockAccountResult', new Date());
    // web3.eth.estimateGas({data:'0x23b872dd0000000000000000000000003d0cbf46e85ae816ee976013693b7d52f4cee2cc000000000000000000000000ba053172e40b17220a4f884b4a436936e5b32d5d00000000000000000000000000000000000000000000000000000000000003e8'})
   /* myContract.methods.transferFrom(address, '0xbA053172E40b17220A4F884b4a436936E5b32D5d', 1000).send({ from: address, gas: 30000 }).then(res => {
      console.log(res, 'sendTransaction', new Date());
    })*/
    var gasLimit = 90000;
    console.log(web3.utils.toHex(gasLimit),'dddddddddddddd')
     myContract.methods.transferFrom(address, '0xbA053172E40b17220A4F884b4a436936E5b32D5d', 1000).estimateGas({ gas: 500000,gasLimit:web3.utils.toHex(gasLimit) }).then(function(err,res){
       console.log(err,'000000000000000000')
      console.log(res, 'estimateGas', new Date());
     })
    //gas required exceeds allowance or always failing transaction


  })
  return res
})

