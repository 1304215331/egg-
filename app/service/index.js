const Service = require('egg').Service;
const { getTime } = require('../utils/time')
class TableService extends Service {
    async getTable(page,select_name,page_size) {
        let table,start,end;
        page == 1 ? start = 0 : start = page * page_size + 1;
        end = page * page_size;
        // 如果查询条件为空
        
        if(select_name == ''){
            table = await this.app.mysql.query(`select * from tabledata limit ${start},${end}`);
        }else{
            table = await this.app.mysql.query(`select * from tabledata where name like '%${select_name}%' or site like '%${select_name}%' limit ${start},${end}`)
        }
        return table;
    }
    /**
        * @description:
        * @param {name} 用户名称
        * @param {site} 用户地址 
    */
    async addTable(name, site) {
        if (!name) { return '昵称不能为空' }
        if (!site) { return '地址不能为空' }

        // const result = await this.app.mysql.insert('table', { name, site, date: getTime() });
        const result = await this.app.mysql.query(`insert into tabledata (name,site,date) values ('${name}','${site}','${getTime()}')`);
        if (result.affectedRows === 1) {
            return {
                code: 200,
                msg: '新增表格数据',
                data: {
                    success: 1
                }
            }
        }
    }

    /**
        * @description:
        * @param {id} 列id 
    */
    async delTable(id) {
        if (!id) { return 'id不能为空' }
        // let is_del = await this.app.mysql.delete('table', { id })
        let is_del = await this.app.mysql.query(`DELETE FROM tabledata WHERE id = ${id}`)
        // 删除成功
        if (is_del.affectedRows === 1) {
            return {
                code: 200,
                msg: '删除成功',
                data: { success: 1 },
            }
        } else {
            return {
                code: 400,
                msg: '请传递正确的参数',
                data: {
                    success: 0
                },
            }
        }
    }


    /**
        * @description:
        * @param {id} 更新id 
        * @param {name} 更新名字 
        * @param {site} 更新地址 
        * @return: 
    */
   async updateTable(id,name,site){
        // 校验
        if(!id){return '请输入id'}
        if(!name){return '请输入修改姓名'}
        if(!site){return '请输入修改地址'}

        // 校验成功
        let is_update = await this.app.mysql.query(`update tabledata set name = "${name}",site="${site}",date = "${getTime()}" where id = ${id}`)
        if(is_update.affectedRows === 1){
            return {
                code:200,
                data:{success:1},
                msg:'更新成功'
            }
        }else{
            return {
                code:400,
                data:{success:0},
                msg:'请输入正确的id'
            }
        }

        

   }
}

module.exports = TableService;