/**
 * Created by nxycd on 2018/10/31.
 */
const Web3 = require('web3');
const moment = require('moment');
const BigNumber = require('bignumber.js');
// const web3 = new Web3();//使用web3来进行区块链接口的调用
// web3.setProvider(new Web3.providers.HttpProvider('http://192.168.10.112:61910'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.10.112:8486'));
console.log('Initialization web3 complete,the first account is ');


const data = '0x' + Buffer.from('使用Buffer更好处理图像数据').toString('hex');
console.log(data);
let inputData = '0xe4bdbfe794a8427566666572e69bb4e5a5bde5a484e79086e59bbee5838fe695b0e68dae';
// decodeURIComponent(inputData.replace(/\s+\g,''))
let res_str = Buffer.from(inputData.replace('0x', ''), 'hex').toString();
console.log(res_str);


inputData = '0xa9059cbb0000000000000000000000003d0cbf46e85ae816ee976013693b7d52f4cee2cc00000000000000000000000000000000000000000000000000000000000003e8';
res_str = Buffer.from(inputData.replace('0x', ''), 'hex').toString('utf8');
console.log(res_str);
console.log('xxx');
res_str = web3.utils.hexToAscii(inputData);
console.log(res_str);
/*
res_str =  web3.utils.hexToUtf8(inputData)
console.log(res_str)
*/

'0x00000000000000000000000000000021000000004000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000010000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000890000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000002000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000';

/* res_str = web3.eth.abi.decodeLog([{
    type: 'string',
    name: 'myString'
  },{
    type: 'uint256',
    name: 'myNumber',
    indexed: true
  },{
    type: 'uint8',
    name: 'mySmallNumber',
    indexed: true
  }],
  '0x00000000000000000000000000000021000000004000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000010000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000890000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000002000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000',
  ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x0000000000000000000000005b202acca5978b8cdb5020ea9dd4200aa56265bb", "0x0000000000000000000000003d0cbf46e85ae816ee976013693b7d52f4cee2cc"]);

console.log(res_str)*/

inputData = '0x00000000000000000000000000000000000000000000000000000000000003e8';
console.log(web3.utils.hexToNumberString(inputData));

inputData = '49991000000000000000';
console.log(web3.utils.fromWei(inputData, 'ether'));
const timestamp = 1541511457000;
console.log(new Date(timestamp), new Date());
console.log(moment(timestamp).format('YYYYMMDDHHmmss'));

inputData="0xed"
console.log(web3.utils.hexToNumberString(inputData));
inputData="0x3b9aca000"
console.log(web3.utils.hexToNumberString(inputData),'qqqqqqqqqqqqqq');
console.log(web3.utils.hexToNumberString('0x3b9aca00'),'qqqqqqqqqqqqqq0');
console.log(web3.utils.hexToNumberString('0x2386f26fc10000'),'qqqqqqqqqqqqqq2');

//inputData= "00000000000000000000000083fe3a9515e785673bc72225bfc9569913ea65640000000000000000000000000000000000000000000000000de0b6b3a7640000";
inputData= "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000";
console.log(web3.utils.hexToNumberString(inputData));

inputData= "0x00000000000000000000000083fe3a9515e785673bc72225bfc9569913ea6564";
//console.log(web3.eth.abi.decodeParameter('string',inputData));

var inputData2 = "0x23b872dd0000000000000000000000003d0cbf46e85ae816ee976013693b7d52f4cee2cc000000000000000000000000ba053172e40b17220a4f884b4a436936e5b32d5d00000000000000000000000000000000000000000000000000000000000003e8";
const list =[];
list[0] = inputData2.substr(0,10);
list[1] = inputData2.substr(10,64); //from
list[2] = inputData2.substr(74,64); //to
list[3] = inputData2.substr(138,64);//amount
console.log(list)

web3.eth.getGasPrice().then(console.log)

web3.eth.estimateGas({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
  })
  .then(res=>{
    console.log(res,'estimateGas')
  });


web3.eth.estimateGas({ from: '0x5b202acca5978b8cdb5020ea9dd4200aa56265bb',
  to: '0xc5d54fb2d25c1c52b9c87b546cadc9f57b51c0a2',
  data: '0xa9059cbb0000000000000000000000003d0cbf46e85ae816ee976013693b7d52f4cee2cc00000000000000000000000000000000000000000000000000000000000003e8',
  value: '0x1bc16d674ec80000',
  gasPrice: '0x3b9aca00'
}).then(console.log)


web3.eth.estimateGas({  from: '0x5b202acca5978b8cdb5020ea9dd4200aa56265bb',
  to: '0xc5d54fb2d25c1c52b9c87b546cadc9f57b51c0a2',
  data: '0x23b872dd0000000000000000000000003d0cbf46e85ae816ee976013693b7d52f4cee2cc000000000000000000000000ba053172e40b17220a4f884b4a436936e5b32d5d00000000000000000000000000000000000000000000000000000000000003e8',
  value: '0x1bc16d674ec80000',
  gasPrice: '0x3b9aca00',
}).then(console.log)


const _k1 = "[{'A':'A','b':'C'},{}]";
console.log(_k1,'999999999999999999')




