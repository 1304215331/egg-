const { Controller } = require('egg')


class table extends Controller {
    /**
        * @description:
        * @param {page}  页面
        * @param {select_name}  查询参数
        * @param {page_size}  一页多少条
        * @return:
    */
    async getTable(/* page = 1, select_name = '', page_size = 1 */) {
        let { ctx, service } = this
        let {page = 1,select_name = '',page_size = 10} = ctx.query
        let table = await service.index.getTable(page,select_name,page_size)

        ctx.body = {
            code: 200,
            data: table,
            msg: '获取表格数据'
        }
    }
    // 新增
    async addTable() {
        let { ctx, service } = this
        let { name, site } = ctx.query
        let ruleData = await service.index.addTable(name, site)
        // 校验失败
        if (typeof ruleData == 'string') {
            ctx.body = {
                code: 400,
                data: { success: 0 },
                msg: ruleData
            }
            return
        }

        // 校验成功
        ctx.body = ruleData

    }
    // 删除
    async delTable() {
        let { ctx, service } = this
        let id = ctx.request.body.id
        let ruleData = await service.index.delTable(id)
        // 校验失败
        if (typeof ruleData == 'string') {
            ctx.body = {
                code: 400,
                data: { success: 0 },
                mag: ruleData
            }
            return
        }

        // 校验成功
        ctx.body = ruleData
    }

    // 更新
    async updateTable(){
        let {ctx,service} = this
        let {id,name,site} = ctx.request.body
        let ruleData = await service.index.updateTable(id,name,site)

        if(typeof ruleData == 'string'){
            ctx.body = {
                code:400,
                data:{success:0},
                msg:ruleData
            }
            return
        }

        ctx.body = ruleData

    }
}

module.exports = table