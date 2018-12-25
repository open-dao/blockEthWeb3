'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/refresh', controller.home.refresh);
  router.get('/env', controller.home.env);
  // Creates a new account.
  router.post('/account/newAccount', controller.home.newAccount);
  router.post('/account/getBalance', controller.home.getBalance);
  router.post('/account/getContractBalance', controller.home.getContractBalance);
  router.post('/account/sendTransaction', controller.home.sendTransaction);
  router.post('/account/sendTransactionself', controller.home.sendTransactionself);
  router.post('/account/sendSysTransaction', controller.home.sendSysTransaction);
  router.post('/account/setBlockInfoToDB', controller.home.setBlockInfoToDB);
  router.post('/account/setBlockInfoToDB2', controller.home.setBlockInfoToDB2);

  router.post('/transaction/getConfirmations', controller.home.getConfirmations);
  router.post('/transaction/getTransaction', controller.home.getTransaction);
  router.post('/transaction/getTransactionReceipt', controller.home.getTransactionReceipt);
  router.post('/transaction/getTransactions', controller.home.getTransactions);

  router.post('/block/getBlockNumber', controller.home.getBlockNumber);
  router.post('/block/getBlock', controller.home.getBlock);
  router.post('/block/getBlocks', controller.home.getBlocks);


  router.post('/utils/fromwei', controller.home.fromwei);
  router.post('/utils/towei', controller.home.towei);

  router.post('/data/dataToBlock',controller.home.dataToBlock);
};
