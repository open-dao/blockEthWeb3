/**
 * Created by nxycd on 2018/11/1.
 */
'use strict';
const Service = require('egg').Service;

class EthService extends Service {
  async getAccounts() {
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.app.web3.eth.getAccounts(function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async newAccount(password) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.app.web3.eth.personal.newAccount(password, function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async unlockAccount(address, password) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.app.web3.eth.personal.unlockAccount(address, password, 600, function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }


  async getBalance(address) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      _this.app.web3.eth.getBalance(address, function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async getContract(jsonInterface, address) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      const myContract = new _this.app.web3.eth.Contract(jsonInterface, address);
      if (jsonInterface === undefined) reject('false');
      resolve(myContract);

    });
  }

  async getContractBalance(myContract, address) {
    return new Promise(function(resolve) {
      myContract.methods.balanceOf(address).call().then(v => {
        resolve(v);
      });
    });
  }

  async getContractBalanceByContract(contractJson, contractAddress, address) {
    const _this = this;
    return new Promise(function(resolve) {
      const myContract = new _this.app.web3.eth.Contract(contractJson, contractAddress);
      myContract.methods.balanceOf(address).call().then(v => {
        resolve(v);
      });
    });
  }

  async setBlockInfoToDB(blocknumber) {
    console.log('async new Block to db *****************************');
    // 获取块信息
    const block = await this.app.web3.eth.getBlock(blocknumber);


    const timestamp = block.timestamp;

    const transferList = [];
    for (let i = 0; i < block.transactions.length; i++) {
      const txHash = block.transactions[i];
      const transactionReceipt = await this.app.web3.eth.getTransactionReceipt(txHash);
      const { blockHash, logs } = transactionReceipt;
      const data = logs.length === 0 ? 0 : logs[0].data;
      const value = logs.length === 0 ? 0 : this.app.web3.utils.hexToNumberString(data);
      const topics = logs.length === 0 ? [ '1', '1', '1' ] : logs[0].topics;
      const contractAddress = logs.length === 0 ? '' : logs[0].address;
      const _from = topics[1].replace('0x000000000000000000000000', '0x');
      // 真实的to地址;
      const _to = topics[2].replace('0x000000000000000000000000', '0x');
      // 查找合约信息;
      const transfer = {
        name: 'unknow',
        fromaddress: _from,
        toaddress: _to,
        amount: value,
        blocknumber,
        blockhash: blockHash,
        transactionhash: txHash,
        timestamp: this.app.moment(timestamp * 1000).format('YYYYMMDDHHmmss'),
      };
      const contrat = this.app.R.find(this.app.R.propEq('address', contractAddress))(this.app.contratList);
      if (contrat) {
        transfer.name = contrat.name;
      }
      transferList.push(transfer);

    }
    // await this.app.mysql.insert('transfer', transferList[0]);
    await this.batchInsertTransfer(transferList);
    await this.app.mysql.insert('blockHead', { blocknumber });
    console.log('******************************************');
  }

  async batchInsertTransfer(list) {
    if (list.length === 0) return;
    let sql = 'insert into transfer (timestamp,name, fromaddress, toaddress, amount,blocknumber,blockhash,transactionhash) values ';
    list.forEach(item => {
      sql += `(${item.timestamp},'${item.name}','${item.fromaddress}','${item.toaddress}','${item.amount}','${item.blocknumber}','${item.blockhash}','${item.transactionhash}'),`;
    });
    sql = sql.substr(0, sql.length - 1) + ';';
    return await this.app.mysql.query(sql);
  }


}

module.exports = EthService;
