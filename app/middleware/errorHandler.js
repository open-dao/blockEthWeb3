'use strict';
module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield* next;
    } catch (err) {
      // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
      // 框架会统一监听，并打印对应的错误日志
      this.app.emit('error', err, this);
      this.app.getLogger('inputLogger').info(this.traceId + '-' + this.appkey + '-exception-' + this.url + '-' + JSON.stringify(err.message));
      // 自定义错误时异常返回的格式
      if (err.message.indexOf('Response timeout for') >= 0) {
        err.message = err.message.split(',')[0];
      }
      const ret = this.helper.outError(this.status.toString(), this.app.config.env === 'prod' ? `${err.message}` : `${err.message}`);
      this.body = ret;
    }
  };
};
