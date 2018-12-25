'use strict';
/**
 * Created by Administrator on 2018/4/28.
 */
const moment = require('moment');
const _ = require('lodash');
module.exports = {
  relativeTime(time) {
    return moment(new Date(time * 1000)).fromNow();
  },
  toUpperCase: jsonObj => {
    if (typeof (jsonObj) === 'object') {
      for (const key in jsonObj) {
        jsonObj[key.toUpperCase()] = jsonObj[key];
        delete (jsonObj[key]);
      }
    }
    return jsonObj;
  },
  moment,
  outError: (code = '1', err = '', msg = {}) => {
    return { data: { head: { ret: code, remes: err }, msg } };
  },
  out: (err = '', msg) => {
    let code = '1';
    if (err === '') code = '0';
    return { data: { head: { ret: code, remes: err }, msg } };
  },
  getRandom: () => {
    const key = _.padStart(_.random(0, 1000000), 6, '0');
    return moment().format('YYYYMMDDHHmmssSSS') + key;
  },

};
