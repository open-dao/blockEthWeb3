'use strict';

const Controller = require('egg').Controller;
// const constData = require('../api/data.json');


class HomeController extends Controller {

  async index() {
    // const list = await this.ctx.service.eth.getAccounts();
    this.ctx.body = 'hi, This is Eth private block';
    console.log(this.app.contratList);

  }

  async env() {
    this.ctx.body = this.ctx.helper.out('', {head: {env: this.app.config.env}});
  }

  /**
   * 刷新代币
   * @constructor
   */
  async refresh() {
    const ret = await this.app.mysql.query('select * from ethsymbol');
    this.app.contratList = [];
    this.app.R.map(item => {
      item.owneraddress = this.app.config.coinbase;
      item.ownerpassword = this.app.config.coinbasepwd;
      item.abi = JSON.parse(item.abi);
      this.app.contratList.push(item);
    })(ret);
    this.ctx.body = this.ctx.helper.out('', {});
  }


  async newAccount() {

    const { data } = this.ctx.request.body;
    const password = data.msg.head.password;
    const address = await this.ctx.service.eth.newAccount(password);
    this.ctx.body = this.ctx.helper.out('', {head: {address}});
  }

  /**
   * 获取ETH账户余额
   */
  async getBalance() {
    const { data } = this.ctx.request.body;

    const address = data.msg.head.address;

    const balance = await this.ctx.service.eth.getBalance(address);
    this.ctx.body = this.ctx.helper.out('', {head: {balance}});
  }


  /**
   * 获取合约账户余额
   */
  async getContractBalance() {
    const { data } = this.ctx.request.body;
    const { name, address } = data.msg.head;
    const contrat = this.app.R.find(this.app.R.propEq('name', name))(this.app.contratList);
    if (contrat === undefined) {
      throw new Error(`not found contrat name:${name}`);
    }
    const myContrat = await this.ctx.service.eth.getContract(contrat.abi, contrat.address);
    const balance = await this.ctx.service.eth.getContractBalance(myContrat, address);
    this.ctx.body = this.ctx.helper.out('', {head: {balance}});
  }


  async fromwei() {
    const { data } = this.ctx.request.body;
    const { number, unit } = data.msg.head;
    const value = this.app.web3.utils.fromWei(number, unit || 'ether');
    this.ctx.body = this.ctx.helper.out('', {head: {value}});
  }


  async towei() {
    const { data } = this.ctx.request.body;
    const { number, unit } = data.msg.head;
    const value = this.app.web3.utils.toWei(number, unit || 'ether');
    this.ctx.body = this.ctx.helper.out('', {head: {value}});
  }


  /**
   * 转账交易;这里的gas 都是从合约账户出的。发送这并没有支付gas的
   */
  async sendTransaction() {
    const { data } = this.ctx.request.body;
    const { name, from, password, to, amount, gas } = data.msg.head;
    const contratInfo = this.app.R.find(this.app.R.propEq('name', name))(this.app.contratList);
    if (contratInfo === undefined) {
      throw new Error(`not found contrat name:${name}`);
    }
    // 解锁转出账户;
    await this.app.web3.eth.personal.unlockAccount(from, password);
    // 解锁合约账户;
    await this.ctx.service.eth.unlockAccount(contratInfo.owneraddress, contratInfo.ownerpassword);
    // 查询合约;
    const myContract = new this.app.web3.eth.Contract(contratInfo.abi, contratInfo.address);
    // 开始转账;
    // 记录日志;
    const longkey = this.ctx.helper.getRandom();
    this.app.getLogger('transLogger').info(`${longkey}\t${JSON.stringify(data)}`);
    const info = await myContract.methods.transferFrom(from, to, amount).send({
      from: contratInfo.owneraddress,
      gas: gas || 500000
    });
    this.app.getLogger('transLogger').info(`${longkey}\t${JSON.stringify(info)}`);
    console.log(info.events.Transfer, '111111111111111111111');
    if (info.events.Transfer === undefined) {
      throw new Error('sendTransaction error');
    }
    const { blockHash, blockNumber, transactionHash } = info;
    this.ctx.body = this.ctx.helper.out('', {head: {blockHash, blockNumber, transactionHash}});
  }

  /**
   * 转出这支付一定费用的gas
   */
  async sendTransactionself() {
    const { data } = this.ctx.request.body;
    const { name, from, password, to, amount, gas } = data.msg.head;
    const contratInfo = this.app.R.find(this.app.R.propEq('name', name))(this.app.contratList);
    if (contratInfo === undefined) {
      throw new Error(`not found contrat name:${name}`);
    }
    // 解锁转出账户;
    await this.app.web3.eth.personal.unlockAccount(from, password);
    // 解锁合约账户;
    // await this.ctx.service.eth.unlockAccount(contratInfo.owneraddress, contratInfo.ownerpassword);
    // 查询合约;
    const myContract = new this.app.web3.eth.Contract(contratInfo.abi, contratInfo.address);
    // 开始转账;
    // 记录日志;
    const longkey = this.ctx.helper.getRandom();
    this.app.getLogger('transLogger').info(`${longkey}\t${JSON.stringify(data)}`);
    const info = await myContract.methods.transferFrom(from, to, amount).send({from, gas: gas || 500000});
    this.app.getLogger('transLogger').info(`${longkey}\t${JSON.stringify(info)}`);
    console.log(info.events.Transfer, '111111111111111111111');
    if (info.events.Transfer === undefined) {
      throw new Error('sendTransaction error');
    }
    const { blockHash, blockNumber, transactionHash } = info;
    this.ctx.body = this.ctx.helper.out('', {head: {blockHash, blockNumber, transactionHash}});
  }


  /**
   * 从主账户发送交易到其他账户;
   */
  async sendSysTransaction() {
    const { data } = this.ctx.request.body;
    const { name, to, amount, gas } = data.msg.head;

    const contratInfo = this.app.R.find(this.app.R.propEq('name', name))(this.app.contratList);
    if (contratInfo === undefined) {
      throw new Error(`not found contrat name:${name}`);
    }
    const myContract = new this.app.web3.eth.Contract(contratInfo.abi, contratInfo.address);
    await this.app.web3.eth.personal.unlockAccount(contratInfo.owneraddress, contratInfo.ownerpassword);
    // 记录日志;
    const longkey = this.ctx.helper.getRandom();
    this.app.getLogger('transLogger').info(`${longkey}\t${JSON.stringify(data)}`);

    const info = await myContract.methods.transfer(to, amount).send({
      from: contratInfo.owneraddress,
      gas: gas || 500000
    });

    this.app.getLogger('transLogger').info(`${longkey}\t${JSON.stringify(info)}`);

    const { blockHash, blockNumber, transactionHash } = info;
    this.ctx.body = this.ctx.helper.out('', {head: {blockHash, blockNumber, transactionHash}});

  }

  /**
   * 获取交易的确认快
   */
  async getConfirmations() {
    try {
      const { data } = this.ctx.request.body;
      const { transactionHash } = data.msg.head;

      // Instantiate web3 with HttpProvider
      const web3 = this.app.web3;

      // Get transaction details
      const trx = await web3.eth.getTransaction(transactionHash);

      // Get current block number
      const currentBlock = await web3.eth.getBlockNumber();

      // When transaction is unconfirmed, its block number is null.
      // In this case we return 0 as number of confirmations
      const number = trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber;
      this.ctx.body = this.ctx.helper.out('', {head: {number}});
    } catch (error) {
      console.log(error);
    }
  }

  async setBlockInfoToDB() {
    // curl -X POST "http://192.168.10.112:7001/account/setBlockInfoToDB" -H "accept: application/json" -H "Content-Type: application/json"
    // const list = [29, 1113, 1232, 1403, 1709, 1749, 2357, 2403, 2431, 2464, 2616, 2671, 2702, 2774, 2805, 3110, 3277, 3286, 3297, 3330, 3386, 3447, 3657, 3684, 3725, 3732, 3769, 3793, 3839, 4010, 4582, 4602, 4654, 4785, 4856, 4862, 4929, 4944, 4975, 5002, 5641, 5662, 20604, 20608, 20609, 20610, 20611, 20724, 20767, 20817, 20867, 20919, 20921, 20928, 20943, 20954, 20958, 20966, 20971, 20984, 21001, 21009, 21021, 21036, 21037, 21079, 21083, 21087, 21109, 21131, 21143, 21160, 21167, 21186, 21227, 21280, 21285, 21287, 21289, 21290, 21293, 21295, 21302, 21308, 21309, 21312, 21323, 21324, 21325, 21326, 21327, 21330, 21332, 21333, 21336, 21337, 21338, 21596, 21623, 21628, 21631, 21634, 21636, 21637, 21638, 21646, 21651, 21655, 21672, 21815, 21819, 21836, 21986, 22016, 22019, 22042, 22057, 22153, 22158, 22163, 22213, 22218, 22240, 22251, 22258, 22264, 22266, 22274, 22276, 22347, 22376, 22383, 22412, 22591, 22593, 22621, 22627, 22837, 23261, 23263, 23268, 23389, 23869];
    const { data } = this.ctx.request.body;
    const { detail } = data.msg;
    if (detail.length > 0) {
      for (let i = 0; i < detail.length; i++) {
        const blockNumber = detail[i].blockNumber;
        // 删除已经存在的blockhead 信息;
        let sql = 'delete from blockhead where blocknumber = ?';
        await this.app.mysql.query(sql, [blockNumber]);
        // 删除已经存在transfer 信息;
        sql = 'delete from transfer where blocknumber = ?';
        await this.app.mysql.query(sql, [blockNumber]);
        // 开始同步数据;
        await this.ctx.service.eth.setBlockInfoToDB(blockNumber);
      }
    }
  }


  async setBlockInfoToDB2() {
    // curl -X POST "http://192.168.10.112:7001/account/setBlockInfoToDB" -H "accept: application/json" -H "Content-Type: application/json"
    // const list = [29, 1113, 1232, 1403, 1709, 1749, 2357, 2403, 2431, 2464, 2616, 2671, 2702, 2774, 2805, 3110, 3277, 3286, 3297, 3330, 3386, 3447, 3657, 3684, 3725, 3732, 3769, 3793, 3839, 4010, 4582, 4602, 4654, 4785, 4856, 4862, 4929, 4944, 4975, 5002, 5641, 5662, 20604, 20608, 20609, 20610, 20611, 20724, 20767, 20817, 20867, 20919, 20921, 20928, 20943, 20954, 20958, 20966, 20971, 20984, 21001, 21009, 21021, 21036, 21037, 21079, 21083, 21087, 21109, 21131, 21143, 21160, 21167, 21186, 21227, 21280, 21285, 21287, 21289, 21290, 21293, 21295, 21302, 21308, 21309, 21312, 21323, 21324, 21325, 21326, 21327, 21330, 21332, 21333, 21336, 21337, 21338, 21596, 21623, 21628, 21631, 21634, 21636, 21637, 21638, 21646, 21651, 21655, 21672, 21815, 21819, 21836, 21986, 22016, 22019, 22042, 22057, 22153, 22158, 22163, 22213, 22218, 22240, 22251, 22258, 22264, 22266, 22274, 22276, 22347, 22376, 22383, 22412, 22591, 22593, 22621, 22627, 22837, 23261, 23263, 23268, 23389, 23869];
    const { data } = this.ctx.request.body;
    const { min, max } = data.msg.head;
    console.log(min, max);
    for (let i = min; i < max; i++) {
      const blockNumber = i;
      console.log(blockNumber);
      // 删除已经存在的blockhead 信息;
      let sql = 'delete from blockhead where blocknumber = ?';
      await this.app.mysql.query(sql, [blockNumber]);
      // 删除已经存在transfer 信息;
      sql = 'delete from transfer where blocknumber = ?';
      await this.app.mysql.query(sql, [blockNumber]);
      // 开始同步数据;
      await this.ctx.service.eth.setBlockInfoToDB(blockNumber);
    }
  }

  async getBlockNumber() {
    const currentBlock = await this.app.web3.eth.getBlockNumber();
    this.ctx.body = this.ctx.helper.out('', {head: {currentBlock}});
  }

  async getBlock() {
    const { data } = this.ctx.request.body;
    const { blockNumber } = data.msg.head;
    const block = await this.app.web3.eth.getBlock(blockNumber);
    const head = Object.assign({}, block);
    this.ctx.body = this.ctx.helper.out('', {head});

  }

  /**
   * 获取块列表;
   */
  async getBlocks() {
    const { data } = this.ctx.request.body;
    let { minBlock, maxBlock } = data.msg.head;
    maxBlock = maxBlock === undefined ? await this.app.web3.eth.getBlockNumber() : maxBlock;
    minBlock = minBlock === undefined ? maxBlock - 30 : minBlock;
    if (maxBlock - minBlock > 31) {
      throw new Error('out of max Range');
    }
    const blockList = [];
    for (let i = minBlock; i <= maxBlock; i++) {
      blockList.push(await this.app.web3.eth.getBlock(i));
    }
    this.ctx.body = this.ctx.helper.out('', {detail: blockList});
  }

  async getTransaction() {
    const { data } = this.ctx.request.body;
    const { transactionHash } = data.msg.head;
    const trans = await this.app.web3.eth.getTransaction(transactionHash);
    const head = Object.assign({}, trans);
    this.ctx.body = this.ctx.helper.out('', {head});
  }

  async getTransactionReceipt() {
    const { data } = this.ctx.request.body;
    const { transactionHash } = data.msg.head;
    const trans = await this.app.web3.eth.getTransactionReceipt(transactionHash);
    const head = Object.assign({}, trans);
    this.ctx.body = this.ctx.helper.out('', {head});
  }

  async getTransactions() {
    const { data } = this.ctx.request.body;
    let { name, transactionHash, limit, offset } = data.msg.head;
    transactionHash = transactionHash === undefined ? '' : transactionHash;
    limit = limit === undefined ? 0 : limit;
    offset = offset === undefined ? 1 : offset;

    const totalSql = 'select count(1) cnt from transfer where name = ? and (fromaddress = ? or toaddress = ? or transactionhash = ?)  ';
    const resultSql = 'select timestamp, name, fromaddress, toaddress, amount, blocknumber, transactionhash from transfer where name = ? and (fromaddress = ? or toaddress = ? or transactionhash = ?)  order by timestamp desc limit ? , ?  ';
    const total = await this.app.mysql.query(totalSql, [name, transactionHash, transactionHash, transactionHash]);
    let detail = [];
    const cnt = total[0].cnt;
    if (cnt > 0) {
      const result = await this.app.mysql.query(resultSql, [name, transactionHash, transactionHash, transactionHash, limit, offset]);
      detail = result;
    }
    this.ctx.body = this.ctx.helper.out('', {head: {total: cnt}, detail});
  }

  /**
   * 数据上链;
   */
  async dataToBlock() {
    console.log('xxxx')
    const { data } = this.ctx.request.body;
    const {head} = data.msg;

    const contrat ={};
    contrat.address = "0x09fD7b59C8e0CeFc3C7e1c18dAC7fD42D63aD01a";
    contrat.abi=[{ "constant": false, "inputs": [ { "name": "_key", "type": "bytes32" }, { "name": "timestamp", "type": "uint256" }, { "name": "sender", "type": "address" }, { "name": "version", "type": "uint256" }, { "name": "hash", "type": "bytes32" } ], "name": "setData", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x1d7bae50" }, { "constant": true, "inputs": [ { "name": "_key", "type": "bytes32" } ], "name": "getData", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "bytes32", "value": "0x0000000000000000000000000000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x54f6127f" }, { "constant": false, "inputs": [ { "name": "_key", "type": "bytes32" }, { "name": "extend", "type": "string" } ], "name": "setExtend", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x6074ac61" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_handler", "type": "address" }, { "indexed": false, "name": "timestamp", "type": "uint256" }, { "indexed": true, "name": "sender", "type": "address" }, { "indexed": false, "name": "version", "type": "uint256" }, { "indexed": false, "name": "hash", "type": "bytes32" } ], "name": "DataSaved", "type": "event", "signature": "0x042cd17415d0de97a240ee96c1e673fb4995deb2fa9ee9ed203024bdc7787511" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_handler", "type": "address" }, { "indexed": false, "name": "extend", "type": "string" } ], "name": "ExtendSaved", "type": "event", "signature": "0xc893809e7e5d0ee5af3da4a488cb2441507e7e63b84c8484ed9ca38a65ebe612" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_handler", "type": "address" }, { "indexed": false, "name": "version", "type": "uint256" }, { "indexed": false, "name": "extend", "type": "string" } ], "name": "ExtendNotSave", "type": "event", "signature": "0x13e978f6065f31e07a3300b6c34229636d6eeb621ae378df95a89913c13c0fee" }];
    const myContract = await this.ctx.service.eth.getContract(contrat.abi, contrat.address);
    //const myContract = new web3.eth.Contract(contratInfo.abi, contratInfo.address);
    console.log('y',head.aae135)
    let value = head.akb020 + head.akc190;
    let aae135Hash = this.app.web3.utils.sha3(head.aae135)
    let _keyHash = this.app.web3.utils.sha3(value)
    aae135Hash = aae135Hash.substr(0,42);
    _keyHash = _keyHash.substr(0,42);
    console.log(aae135Hash,_keyHash);
    console.log('y2',aae135Hash)
    const info = await myContract.methods.getData(aae135Hash).call().then(res => {
      console.log('y11',res)

      //value ='1';
      let _valueList = [];
      if (res['4'] != '') {
        _valueList = res['4'].push(value);
      } else {
        _valueList = [].push(value);
      }
      console.log('y2')
      this.app.web3.eth.personal.unlockAccount('0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e', 'qwertyuiopqazplm').then(res=> {
        console.log('解锁成功');
        // 解锁主账户;
        // 获取身份证号的hash 目前的方法是通过 web3.utils.sha3 取前面32位;

        myContract.methods.setExtend(aae135Hash, '1').send({
          from: '0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e',
          gas: 6500000
        }).then(res => {
          console.log('主记录写入成功！')
          //成功之后写入


          myContract.methods.setExtend(_keyHash, JSON.stringify(head)).send({
            from: '0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e',
            gas: 6500000
          }).then(res => {
            console.log('辅链写入成功');
            this.ctx.body = this.ctx.helper.out('', {head: {}});
          });
        })
      });
    })
  }
}

module.exports = HomeController;
