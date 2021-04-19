module.exports = app => {
    console.log('服务开启');
     // 校验用户名是否正确
    /* app.validator.addRule('userName', (rule, value)=>{		// value就是待检验的数据
        if (/^\d+$/.test(value)) {
            return "用户名应该是字符串";
        }
        else if (value.length < 3 || value.length > 10) {
        console.log("用户名的长度应该在3-10之间");
        }
    }); */
}