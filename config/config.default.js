'use strict';
const path = require('path');
module.exports = app => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = app.name + '_1540971706726_645';

  // add your config here
  config.middleware = [ 'errorHandler', 'access' ];

  exports.customLogger = {

    inputLogger: {
      file: path.join(app.root, `/logs/${app.name}/input.log`),
    },
    transLogger: {
      file: path.join(app.root, `/logs/${app.name}/trans.log`),
    },
  };


  exports.security = {
    csrf: {
      enable: false,
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: [ '/account', '/block', '/transaction' ],
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      ignoreJSON: true,
    },
    domainWhiteList: ['http://www.baidu.com', 'http://192.168.11.75:8080']
  };


  exports.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enable: true,
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '192.168.200.35',
      // 端口号
      port: '3306',
      // 用户名
      user: 'ybjkweb',
      // 密码
      password: 'combobox',
      // 数据库名
      database: 'blockdb',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  exports.cors = {
    origin:'*',
    allowMethods: 'POST'
  };

  config.web3Provider = 'http://192.168.10.112:8486';
  config.web3Ws='ws://192.168.10.112:8546';

  config.coinbase = "0x36f498b0Ab2A6Ea9aCCb935a55062FA7Df75Ea0e";
  config.coinbasepwd="qwertyuiopqazplm" ;

  return config;
};
