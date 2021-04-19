'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news',controller.news.list)


  // 表格接口
  router.get('/get_table',controller.index.getTable)
  router.get('/add_table',controller.index.addTable)
  router.post('/del_table',controller.index.delTable)
  router.post('/update_table',controller.index.updateTable)


  /* 校验规则 */
  /* app.validator.addRule('ruleId', (rule, value)=>{		// value就是待检验的数据
    if (!value) {
      return "id不能为空";
    }
  }); */

  // 注册 app.jwt
  router.post('/register_account',controller.userLogin.registerUser)
  router.post('/login_rule',controller.userLogin.loginRule)
};
