const Controller = require('egg').Controller;

class NewsView extends Controller {
    async list(){
        let {ctx} = this
        const dataList = {
            list: [
              { id: 1, title: 'this is news 1', url: '/news/1' },
              { id: 2, title: 'this is news 2', url: '/news/2' }
            ]
          };
         ctx.body = dataList
    }
}
module.exports = NewsView