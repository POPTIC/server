// const userDao = require('../Dao/videoDao.js');
// const articleDao = require('../Dao/articleDao.js');
// const { UNKNOW_ERROR,SUCCESS } = require('../config/StateConfig.js');

// module.exports = {
//     getUserImgURL: async ctx => {
//         let { id } = ctx.request.body;
//         // 连接数据库根据用户名和密码查询用户信息
//         let user = await userDao.Login(userName, password);
//         // 结果集长度为0则代表没有该用户
//         if (user.length === 0) {
//                 ctx.body = {
//                 code: USERNAME_PASSWORD_NOT_MATCH,
//                 msg: '用户名或密码错误'
//             }   
//             return;
//         }
//         else if (user.length === 1) {
//             const loginUser = {
//                 user_id: user[0].user_id,
//                 userName: user[0].userName
//             };
//         // 保存用户信息到session
//             ctx.session.user = loginUser;
//             //

//             ctx.body = {
//                 code: SUCCESS,
//                 user: loginUser,
//                 msg: '登录成功'
//             }
//             return;
//         }
//         else{
//             ctx.body = {
//                 code: UNKNOW_ERROR,
//                 msg: '未知错误'
//             }
//         }
//     },
//     Register: async ctx => {
//         let { userName, password } = ctx.request.body;

//         let user = await userDao.FindUserName(userName);

//         if (user.length !== 0) {
//             ctx.body = {
//             code: USERNAME_REPEAT,
//             msg: '用户名已经存在，不能注册'
//         }
//         return;
//         }
//         try {
//         // 连接数据库插入用户信息
//             let registerResult = await userDao.Register(userName, password);
//             // 操作所影响的记录行数为1,则代表注册成功
//             if (registerResult.affectedRows === 1) {
//                 ctx.body = {
//                     code: SUCCESS,
//                     msg: '注册成功'
//                 }
//                 return;
//             }
//             ctx.body = {
//                 code: USERNAME_REPEAT,
//                 msg: '未知错误'
//             }
//         } catch (error) {
//             reject(error);
//         }
//     },
//     IsNameExist: 
//     async ctx => {
//         console.log(ctx.request);
//         let userName = ctx.query.userName;
//         // 如果使用get方法，参数存在于url的查询参数中，则可以使用ctx.query方法来获取参数
//         let user = await userDao.FindUserName(userName);
//         if(user.length !== 0){
//             ctx.body = {
//                 code: USERNAME_REPEAT,
//                 msg: '用户名重复'
//             }
//             return;
//         }
//         else{
//             ctx.body = {
//                 code : SUCCESS,
//                 msg: '用户名不重复',
//             }
//             return;
//         }
//     }
// }