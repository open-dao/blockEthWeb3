'use strict';
/**
 * Created by nxycd on 2018/11/6.
 */
const Subscription = require('egg').Subscription;
// const moment = require('moment');

class AsyncBlockToDB extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1200m', // 1 分钟间隔
      // cron: '0 01 02 * * *',  //每天半夜2:01分开始执行;
      type: 'worker', // 随机一个work跑这个任务;
      immediate: true, // 程序启动后立即执行;
      env: 'prod',
    };
  }

  // 程序启动后同步最后的100个块;
  async subscribe() {
    console.log('start');
    const blockNumber = await this.app.web3.eth.getBlockNumber();
    for (let i = blockNumber - 180; i < blockNumber; i++) {

      const data = await this.app.mysql.select('blockhead', { where: { blocknumber: i } });
      if (data.length === 0) {
        // 开始同步;
        await this.ctx.service.eth.setBlockInfoToDB(i);
      }
    }

  }
}

module.exports = AsyncBlockToDB;
