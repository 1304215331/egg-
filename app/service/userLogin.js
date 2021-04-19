const Service = require('egg').Service
const { register } = require('../utils/user-rule')
const { getTime } = require('../utils/time')
class userLogin extends Service {
    async registerUser() {
        let { ctx, app } = this
        /**
            * @description:
            * @param {username} 用户名 
            * @param {phone} 手机号码 
            * @param {password} 密码 
            * @return 
        */
        let { username = '', phone = '', password = '' } = ctx.request.body
        let rule_info = register(username, phone, password)
        if (rule_info) {
            return ctx.body = {
                err_code: -1,
                msg: rule_info,
            }
        }

        // 查询数据库是否被注册
        let sql = `SELECT * FROM tb_user WHERE username = "${username}"`
        let select_register = await app.mysql.query(sql)
        if(select_register.length){
            return ctx.body = {
                err_code:-1,
                msg:'该用户名已被注册'
            }
        }

        // 没有被注册写入数据库
        const token = app.jwt.sign({ ...ctx.request.body }, app.config.jwt.secret); // 生成token
        let insert_sql = `INSERT INTO tb_user (username,phone,password,create_time,token) values ('${username}','${phone}','${password}','${getTime()}','${token}')`
        let insert_reg = await app.mysql.query(insert_sql)
        if(insert_reg.affectedRows === 1){
            // const new_token = app.jwt.verify(token,app.config.jwt.secret)
            ctx.body = {
                err_code:0,
                msg:'注册成功',
                // new_token
            }
        }
    }
    async loginRule(){
        let { ctx, app } = this
        // 校验参数
        let { username = '', phone = '', password = '' } = ctx.request.body
        let rule_info = register(username, phone, password)
        if (rule_info) {
            return ctx.body = {
                err_code: -1,
                msg: rule_info,
            }
        }


        // 查询是否注册
        let sql = `SELECT * FROM tb_user where username = '${username}' AND phone = '${phone}' AND password = '${password}'`
        let rule_list = await app.mysql.query(sql)
        if(!rule_list.length){
            return ctx.body = {
                code:-1,
                msg:'请先注册'
            }
        }

        ctx.body = {
            code:0,
            msg:'登录成功',
            data:rule_list[0]
        }
    }
}

module.exports = userLogin