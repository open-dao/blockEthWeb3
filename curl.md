

// 创建新账户;
curl -X POST "http://192.168.200.137:7001/account/newAccount" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"password\": \"string\" } } }}"
curl -X POST "http://192.168.200.137:7001/account/newAccount" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"password\": \"string\" } } }}"
// 获取合约账户的余额
curl -X POST "http://192.168.200.137:7001/account/getContractBalance" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"address\": \"0x9fe93A7F7D3dEF4aff8ECC8aDAD73F1d702216c4\", \"name\": \"TST3\" } } }}"
curl -X POST "http://192.168.200.137:7001/account/getContractBalance" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"address\": \"0x9fe93A7F7D3dEF4aff8ECC8aDAD73F1d702216c4\", \"name\": \"MHIS\" } } }}"
// 获取ETH账户余额
curl -X POST "http://192.168.200.137:7001/account/getBalance" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"address\": \"0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc\" } } }}"
// fromwei
curl -X POST "http://192.168.200.137:7001/utils/fromwei" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"number\": \"3000000000000002001\",\"unit\":\"ether\" } } }}"
// fromwei
curl -X POST "http://192.168.200.137:7001/utils/fromwei" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"number\": \"1000000000000000000\",\"unit\":\"ether\" } } }}"
// towei
curl -X POST "http://192.168.200.137:7001/utils/towei" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"number\": \"1\" ,\"unit\":\"ether\"} } }}"
// 转账交易;
curl -X POST "http://192.168.200.137:7001/account/sendSysTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"to\": \"0x9fe93A7F7D3dEF4aff8ECC8aDAD73F1d702216c4\", \"name\": \"GXLY\",\"amount\":\"1000000000000000000\" } } }}"
curl -X POST "http://192.168.200.137:7001/account/sendSysTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"to\": \"0x83fe3A9515e785673Bc72225bfc9569913ea6564\", \"name\": \"DDD\",\"amount\":\"1000000000000000000\" } } }}"
// 获取交易的信息
curl -X POST "http://192.168.200.137:7001/transaction/getTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0x4c643ffc9c0d8337e1dbdf0a63a4109ba0abc24cef9103fa5a78cc1dcc6926da\" } } }}"
curl -X POST "http://192.168.200.137:7001/transaction/getTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0xa3732d91b03b5bc038ceb2c8d59670122eab3c2411a204eee22ccc2016c836dc\" } } }}"
curl -X POST "http://192.168.200.137:7001/transaction/getTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0xa4782c057a05c7754fabd9b86699ff424c9756dbdda7b94415f28eddc093e3f9\" } } }}"
curl -X POST "http://192.168.200.137:7001/transaction/getTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0xcf1ec535adeb4fef6f1c8a0599a753083c3cb370c23fc1021f6a77dd28087a66\" } } }}"
// 获取交易回执的信息
curl -X POST "http://192.168.200.137:7001/transaction/getTransactionReceipt" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0x4c643ffc9c0d8337e1dbdf0a63a4109ba0abc24cef9103fa5a78cc1dcc6926da\" } } }}"
curl -X POST "http://192.168.200.137:7001/transaction/getTransactionReceipt" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0xa3732d91b03b5bc038ceb2c8d59670122eab3c2411a204eee22ccc2016c836dc\" } } }}"
curl -X POST "http://192.168.200.137:7001/transaction/getTransactionReceipt" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0xfd7c71a699bddd5c1f3e4d31afc1aae83b5ec7236cfb861d6e90d6f73f286d48\" } } }}"
curl -X POST "http://192.168.200.137:7001/transaction/getTransactionReceipt" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0x9e6e53c031dd67447498c6a6e7136d4f0c3dbbb9c2a1515a699371941cd2820a\" } } }}"
// 获取交易的确认信息
curl -X POST "http://192.168.200.137:7001/transaction/getConfirmations" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0xa3732d91b03b5bc038ceb2c8d59670122eab3c2411a204eee22ccc2016c836dc\" } } }}"
// 获取当前最新的区块
curl -X POST "http://192.168.200.137:7001/block/getBlockNumber" -H "accept: application/json"
// 查询当前区块的信息;
curl -X POST "http://192.168.200.137:7001/block/getBlock" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"blockNumber\": 268771 } } }}"
curl -X POST "http://192.168.200.137:7001/block/getBlock" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"blockNumber\": 23869 } } }}"
curl -X POST "http://192.168.200.137:7001/block/getBlock" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"blockNumber\": 23436 } } }}"
// 刷新区块信息
curl -X POST "http://192.168.200.137:7001/account/setBlockInfoToDB" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"msg\":{\"detail\":[{\"blockNumber\":29460 }, {\"blockNumber\":29462 }, {\"blockNumber\":29469 }, {\"blockNumber\":29474 }, {\"blockNumber\":29475 }, {\"blockNumber\":29489 }, {\"blockNumber\":29552 }, {\"blockNumber\":29553 }, {\"blockNumber\":29554 } ] } } }"
curl -X POST "http://192.168.200.137:7001/account/setBlockInfoToDB" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"msg\":{\"detail\":[{\"blockNumber\":22237 } ] } } }"
curl -X POST "http://192.168.200.137:7001/account/setBlockInfoToDB2" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"msg\":{ \"head\": { \"min\": 0,\"max\": 5000  } } }}"
curl -X POST "http://192.168.200.137:7001/account/setBlockInfoToDB2" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"msg\":{ \"head\": { \"min\": 5000,\"max\": 10000  } } }}"
curl -X POST "http://192.168.200.137:7001/account/setBlockInfoToDB2" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"msg\":{ \"head\": { \"min\": 10000,\"max\": 15000  } } }}"
curl -X POST "http://192.168.200.137:7001/account/setBlockInfoToDB2" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"msg\":{ \"head\": { \"min\": 15000,\"max\": 20000  } } }}"
curl -X POST "http://192.168.200.137:7001/account/setBlockInfoToDB2" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"data\":{\"msg\":{ \"head\": { \"min\": 10866,\"max\": 10868  } } }}"
// 转账;
curl -X POST "http://192.168.200.137:7001/account/sendTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"from\": \"0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2\",\"to\": \"0x83fe3A9515e785673Bc72225bfc9569913ea6564\",\"password\": \"string\", \"name\": \"DD2\",\"amount\":\"1000\" } } }}"
curl -X POST "http://192.168.200.137:7001/account/sendTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"from\": \"0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2\",\"to\": \"0x83fe3A9515e785673Bc72225bfc9569913ea6564\",\"password\": \"string\", \"name\": \"DD2\",\"amount\":\"1000\" } } }}"
curl -X POST "http://192.168.200.137:7001/account/sendTransaction" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"from\": \"0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2\",\"to\": \"0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc\",\"password\": \"string\", \"name\": \"DD2\",\"amount\":\"89999899795000\" } } }}"
curl -X POST "http://192.168.200.137:7001/account/sendTransactionself" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"from\": \"0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2\",\"to\": \"0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc\",\"password\": \"string\", \"name\": \"DD2\",\"amount\":\"89999899795000\" } } }}"



// 获取指定范围的区块信息
curl -X POST "http://192.168.200.137:7001/block/getBlocks" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"minBlock\": 23068, \"maxBlock\": 23068 } } }}"
// 查询交易信息列表;
curl -X POST "http://192.168.200.137:7001/transaction/getTransactions" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"data\": { \"msg\": { \"head\": { \"transactionHash\": \"0x0aaBb8eC5E5763a63dE21ea47FA2017B0C137e32\",\"name\": \"DD1\",\"limit\": 0,\"offset\": 10 } } }}"