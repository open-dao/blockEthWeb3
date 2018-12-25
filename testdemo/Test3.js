/**
 * Created by nxycd on 2018/10/31.
 */
const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
// const web3 = new Web3();//使用web3来进行区块链接口的调用
// web3.setProvider(new Web3.providers.HttpProvider('http://192.168.10.112:61910'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.10.112:8486'));
console.log('Initialization web3 complete,the first account is ');

// // console.log(web3.eth.accounts.create(),'99999999999999XXXXXXX'); //  0x6a171bd34B36e058e33fEbd1Cf90A88ce330F70D  0x818524fb9d748fc49be4b14117adb1291120495533f36581df5ed186f2215ad0
// var privateKey = new Buffer('0x818524fb9d748fc49be4b14117adb1291120495533f36581df5ed186f2215ad0')
const privateKey = new Buffer.from('818524fb9d748fc49be4b14117adb1291120495533f36581df5ed186f2215ad0', 'hex');

const amount = 10000000;

console.log(web3.utils.toWei('300', 'gwei'), '111111111111111111');

const rawTx = {
  nonce: '0x105',
  // gasPrice: '0x09184e72a000',
  // gasLimit: '0x1000',
  // gasLimit: '0x2FEFD800',
  gasLimit: 34320282,
  gas: 30000,
  to: '0x2994d4112C1859eeefF606454b9D9b5C68B90B55',
  value: '0x00',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600058',
};

/* web3.eth.accounts.signTransaction(rawTx, privateKey).then(RLPencodedTx => {
  web3.eth.sendSignedTransaction(RLPencodedTx['rawTransaction'])
    .on('receipt', console.log);
});*/

const tx = new Tx(rawTx);
tx.sign(privateKey);

const serializedTx = tx.serialize();

web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .on('receipt', console.log);

