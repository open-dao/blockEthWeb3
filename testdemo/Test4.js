/**
 * 测试普通ETH转账;
 */
const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
// const web3 = new Web3();//使用web3来进行区块链接口的调用
// web3.setProvider(new Web3.providers.HttpProvider('http://192.168.10.112:61910'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.10.112:8486'));
console.log('Initialization web3 complete,the first account is ');

const transactionObject = {
  from: '0x2994d4112C1859eeefF606454b9D9b5C68B90B55',
  to: '0x215dDD2A10a7518bAb6AC1A3dE9f9452F250ACF9',
  value: 1000000000000000000,
  gas: 5000000,
  data: '0x616263414243',
  // nonce:'0x111' //do not provide nonce it will calculate the latest automatically
};
web3.eth.personal.unlockAccount(transactionObject.from, '123456', function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  web3.eth.sendTransaction(transactionObject, function(err, res) {
    console.log(err, new Date());
    console.log('2', new Date());
    console.log(res, new Date()); // 0xce015e94af0c35c8980f7f108755e8a13bcd419653df70595b62aae77ca688b7
  });
});
console.log('end', new Date());
