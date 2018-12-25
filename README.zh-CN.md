# blockEthWeb3



## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

###
开发环境需要安装python 否则web3无法安装;
npm install --global --production windows-build-tools
cnpm install scrypt
[egg]: https://eggjs.org

##发布过程;
#压缩工程
tar -zcvf ./publish/blockEthWeb20181121.tgz --exclude=node_modules --exclude=logs --exclude=publish --exclude=run  --exclude=./.svn  --exclude=./.idea .



eth command
    #创建ethDB
    geth --datadir  "D:\Program Files\Geth\EthDBSpace\PrivChain"  init  "D:\Program Files\Geth\genesis.json"
    geth --datadir  "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain"  init  "/home/chainpeer/go-ethereum/genesis.json"

    geth --datadir "D:\Program Files\Geth\EthDBSpace\PrivChain" console
   geth --datadir "d:\program Files\Geth\EthDBSpace\PrivChain" --networkid 15 --ipcdisable --port 61910 --rpcport 8200 console

   geth --datadir "d:\program Files\Geth\EthDBSpace\PrivChain" --networkid 30000 --rpc --rpcapi "eth,net,web3" --rpcaddr "192.168.10.112" --port 61910 --rpcport 8200 console

   geth --datadir "d:\program Files\Geth\EthDBSpace\PrivChain" --networkid 30000 --rpc --rpcapi "eth,net,web3" --rpcaddr "192.168.10.112" --port 61910 --rpcport 8200 console


   geth --identity "TestNode2" --datadir "d:\program Files\Geth\EthDBSpace\PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "192.168.10.112" --ipcpath "d:\program Files\Geth\EthDBSpace\PrivChain\geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000"  --ws --wsport "8487" console

   geth --identity "TestNode2" --datadir "d:\program Files\Geth\EthDBSpace\PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "192.168.10.112" --ipcpath "d:\program Files\Geth\EthDBSpace\PrivChain\geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000" --ws --wsorigins="*" --wsaddr 0.0.0.0 console
   geth --identity "TestNode3" --datadir "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "0.0.0.0" --ipcpath "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain/geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000" --ws --wsorigins="*" --wsaddr 0.0.0.0 console


   geth --identity "TestNode3" --datadir "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "0.0.0.0" --ipcpath "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain/geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000" --ws --wsorigins="*" --wsaddr 0.0.0.0 --bootnodes "enode://829de24530b9f267835818044424b808f04c573a0c60ec281c0ab4c2b3c67d03017b62415f095ffbc58c0a4d24ec4cd1a11dcbe9dac91fb00562936f049da6f4@192.168.10.96:30304" console


   admin.addPeer("enode://829de24530b9f267835818044424b808f04c573a0c60ec281c0ab4c2b3c67d03017b62415f095ffbc58c0a4d24ec4cd1a11dcbe9dac91fb00562936f049da6f4@192.168.10.96:30304")
   admin.addPeer("enode://3a90276f0b4f707e0aead2c5f81ddbc519349803f084ed08d3bdc1e6bb9db158475a8c7509d015a3ffb2051eaceb116c0a1fa919911385178c9a49fac19d20b7@192.168.10.112:30305")


   ****正式环境********
   geth --identity "TestNode4" --datadir "d:\program Files\Geth\EthDBSpace\PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "192.168.10.112" --ipcpath "d:\program Files\Geth\EthDBSpace\PrivChain\geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000" --ws --wsorigins="*" --wsaddr 0.0.0.0 console



   #加入节点
   admin.addPeer("enode://872df7229d1f81a5594b217fe76132b79457f37c92a40d368247c75f2012cf24954b7e9e9278265a565a891a46644770215b5e34684d4193e484bcf3937dcd30@192.168.200.169:30304")
   miner.setEtherbase('0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e')
   *********************


   *****启动，加入节点，设置挖矿账户 开始挖矿 ******
   geth --identity "TestNode4" --datadir "d:\program Files\Geth\EthDBSpace\PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "192.168.10.112" --ipcpath "d:\program Files\Geth\EthDBSpace\PrivChain\geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000" --ws --wsorigins="*" --wsaddr 0.0.0.0  console --bootnodes "enode://872df7229d1f81a5594b217fe76132b79457f37c92a40d368247c75f2012cf24954b7e9e9278265a565a891a46644770215b5e34684d4193e484bcf3937dcd30@192.168.200.169:30304" --mine --etherbase "0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e"
   *******


   ****正式环境UBUNTU启动********
   nohup geth --identity "TestNode3" --datadir "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "0.0.0.0" --ipcpath "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain/geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000" --ws --wsorigins="*" --wsaddr 0.0.0.0 --bootnodes "enode://872df7229d1f81a5594b217fe76132b79457f37c92a40d368247c75f2012cf24954b7e9e9278265a565a891a46644770215b5e34684d4193e484bcf3937dcd30@192.168.200.169:30304" --mine --etherbase "0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e" >> /home/chainpeer/go-ethereum/myeth.log 2>&1 &
   nohup geth --identity "TestNode3" --datadir "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain" --rpc --rpcapi "db,eth,net,web3,personal" --rpcaddr "0.0.0.0" --ipcpath "/home/chainpeer/go-ethereum/EthDBSpace/PrivChain/geth.ipc" --rpcport "8486"  --port "30305" --networkid "30000" --ws --wsorigins="*" --wsaddr 0.0.0.0 --bootnodes "enode://872df7229d1f81a5594b217fe76132b79457f37c92a40d368247c75f2012cf24954b7e9e9278265a565a891a46644770215b5e34684d4193e484bcf3937dcd30@192.168.200.169:30304" >> /home/chainpeer/go-ethereum/myeth.log 2>&1 &
   ******************************



   miner.setEtherbase('0x5b202acCA5978b8Cdb5020EA9dd4200Aa56265Bb')

personal.unlockAccount("0x2994d4112C1859eeefF606454b9D9b5C68B90B55","123456")
personal.unlockAccount("0x215dDD2A10a7518bAb6AC1A3dE9f9452F250ACF9","123456")
personal.unlockAccount('0x5b202acCA5978b8Cdb5020EA9dd4200Aa56265Bb','12345')
personal.unlockAccount('0xbA053172E40b17220A4F884b4a436936E5b32D5d','123456')
personal.unlockAccount('0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc','0123456789')
personal.unlockAccount('0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2','string')
personal.unlockAccount('0x83fe3A9515e785673Bc72225bfc9569913ea6564','string')
personal.unlockAccount('0x8EE603c6B48549274EAD15AF69d0F5Da3b0c87dA','string')
personal.unlockAccount('0xf7DB5e91a00d482f8e0683a4B031236cD8926A10','string')
personal.unlockAccount('0xf7DB5e91a00d482f8e0683a4B031236cD8926A10','string')
personal.unlockAccount('0x4541885cabd0733bf20330a0f96fc326feEbF0b0','0123456789')





personal.unlockAccount("0x600364af5318a362fa66f4ff8889efb3b9bcc2f0","123")
personal.unlockAccount("0xFE1fAE2FC18aD354C9BF650e8d4cC1A158764358","12345")
personal.unlockAccount("0xA30427185655660d7D9a715159C1C700B8e557a7"),"123456")

eth.getBalance("0xbc5e52fe4cac1af65038986ba1223cf89f2578c6")
eth.getBalance("0x2D25495c1FeAC644830d2F66777f15E978154E1E")
eth.getBalance("0x6a171bd34B36e058e33fEbd1Cf90A88ce330F70D")
eth.getBalance("0x215dDD2A10a7518bAb6AC1A3dE9f9452F250ACF9")
eth.getBalance("0xbA053172E40b17220A4F884b4a436936E5b32D5d")
eth.getBalance("0x3D0cbf46e85aE816EE976013693B7d52f4CEe2Cc")


eth.getTransactionReceipt('0xdee8aa1f0dbe300dd00cce4973e6a13b8019c46dfdd56ccc3869879b0acc7852')
eth.getTransactionReceipt('0x0d9d9d1148c05b7704cbc9ae2e066ca5eacc22ef7ca6f03c826d9649b271e40c')
#一个合约的hash
0xf56159c9250c0cb5519eb0e297d6d1374b72c1bca6f6d9a82315b4e81cf6cc8f
eth.getTransactionReceipt('0xf56159c9250c0cb5519eb0e297d6d1374b72c1bca6f6d9a82315b4e81cf6cc8f')
eth.getTransactionReceipt('0x5ab450ee78ea42eb6ff4ffde894a07b1a9bca0176af1475db3f7366ae6a7dca9')




> web3.personal.importRawKey("0x19ef687851b95bfc06df3ebda6c87a65eb76e670dfea3022c506cc68f4eb6d8e", "123456")
"0xae07efca8f31f8f024c5d7805525129be5e1acd2"

eth.getBalance("0xae07efca8f31f8f024c5d7805525129be5e1acd2")

personal.unlockAccount("0xae07efca8f31f8f024c5d7805525129be5e1acd2","123456")






   eth.getBalance(eth.accounts[0])
   personal.unlockAccount(eth.accounts[0]) //解锁 1234

370000000000000000000
   eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:10000000000000000000})
   eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:amount})
   web3.fromWei(eth.getBalance(eth.accounts[1]),'ether')

eth.blockNumber

   eth.getBalance('0x2994d4112c1859eeeff606454b9d9b5c68b90b55')



   账户 :0x71615304fa6b53e5c396BF77AD99Fd1193Fbf5A2有ETH余额    999961061000000000
   其中有DD2余额									  9999899998000
   转给别人									  1000000000000
   生成的块 41497
   交易的hash 0x353f2f9e45085813acce469d6393cba04802bf8ecf85ae1a78c1cd1b2729a61b

   结果账户变成了 999922058000000000 渐少了	39003000000000
   其中块的生成消耗了 39003个 当前gas的price=1000000000 刚好一致
   结论ETH的余额变化部分是gas的消耗部分;

