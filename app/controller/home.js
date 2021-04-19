'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx,app } = this;
    const post = await app.mysql.select('login');
    console.log('post',post);

    ctx.body = {
      code:0,
      data:{
        list:[],
        msg:'测试',
        post
      }
    };
  }
}

module.exports = HomeController;
