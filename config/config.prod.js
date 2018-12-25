/**
 * Created by nxycd on 2018/10/31.
 */
module.exports = app => {
  const config = exports = {};
  config.web3Provider = 'http://127.0.0.1:8486';
  config.web3Ws='ws://127.0.01:8546';
  return config;
};
