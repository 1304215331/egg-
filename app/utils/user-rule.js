function register (username,phone,password){ 
    let regex = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,20}$"); // 包含数字-英文-中文正则
    let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if(!username){
        return '用户名不能为空'
    }
    if(!phone){
        return '手机号不能为空'
    }
    if(!password){
        return '密码不能为空'
    }
    if(username.length < 1 || username.length > 10){
        return '用户名的长度在3-10位之间'
    }
    if (!regex.test(username)) {
        return "用户名只能包含数字-英文-中文"
      }
    if(phone.length != 11){
        return '手机号长度为11位'
    }
    if (!myreg.test(phone)) {
        return "手机号格式不正确"
    }

    return false
}

module.exports = {register}