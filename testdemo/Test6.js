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
const _privateKye= 'b05f9a75eb36be7f0fa9d04f50fb2a17fa671f391b3484fa458be13d73f50b9c';
var privateKey = new Buffer.from(_privateKye, 'hex')
console.log(_privateKye)
const contratInfo = R.find(R.propEq('name', 'DD2'))(data.contratList);
const myContract = new web3.eth.Contract(contratInfo.abi, contratInfo.address);

/*web3.eth.personal.unlockAccount(contratInfo.owneraddress, contratInfo.ownerpassword).then(res=>{
  console.log(res, 'unlockAdminAccountResult', new Date());
  myContract.methods.transferFrom('0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2', '0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc', 100000000000000).send({ from: '0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2', gas: 500000 }).then(res => {
    console.log(res, 'sendTransaction', new Date());
  })
})*/


web3.eth.personal.unlockAccount('0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2', 'string').then(res=>{
  console.log(res, 'unlockAdminAccountResult', new Date());
  myContract.methods.transferFrom('0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2', '0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc', 100000000).send({ from: '0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2', gas: 500000 }).then(res => {
    console.log(res, 'sendTransaction', new Date());
  })
})

