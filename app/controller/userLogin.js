const Controller = require('egg').Controller

class userLogin extends Controller {
    // 注册
    async registerUser() {
        let { ctx, service } = this
        await service.userLogin.registerUser()
    }
    // 登录
    async loginRule(){
        let { ctx, service } = this
        console.log(ctx.request.body);
        await service.userLogin.loginRule()
    }
}

module.exports = userLogin