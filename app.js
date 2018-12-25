/**
 * Created by nxycd on 2018/10/31.
 */
const Web3 = require('web3');
const moment = require('moment');
const R = require('ramda');
module.exports = app => {
  app.R = R;
  app.moment = moment;
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    // init AllList

    app.contratList = [];
    const mysqlConfig = app.config.mysql.client;
    const database = await app.mysql.createInstanceAsync(mysqlConfig);
    const ret = await database.query('select * from ethsymbol');
    app.R.map(item => {
      item.owneraddress = app.config.coinbase;
      item.ownerpassword = app.config.coinbasepwd;
      item.abi = JSON.parse(item.abi)
      app.contratList.push(item);
    })(ret);

    // init Web3;
    app.web3 = new Web3(new Web3.providers.HttpProvider(app.config.web3Provider));
    const web3Ws = app.config.web3Ws;
    const env = app.config.env ;
    setTimeout(() => {
      // 只在生产环境上监听块的增加，减少;
      if (env !== 'prod') return ;
      const _web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(web3Ws));
      _web3.eth.subscribe('newBlockHeaders', function(error, result) {
        if (!error) {
          console.log(error);
        }
      }).on('data', function(blockHeader) {
        console.log(blockHeader.number, 'subscribe newBlockHeaders blockHeader.number');
        ctx.service.eth.setBlockInfoToDB(blockHeader.number);
        console.log(blockHeader.number, 'subscribe newBlockHeaders end');
      });
    }, 1000);


  });
};
