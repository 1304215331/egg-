/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: 'node',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    jwt: {  //令牌配置项
      secret: "ylw"
    }
  };

  config.middleware = ['jwtErr'];

  config.validate = {
    convert: true,
    widelyUndefined:true
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609916871179_4772';
  config.security = {
    csrf :{
      enable:false
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };



  return {
    ...config,
    ...userConfig
  };
};