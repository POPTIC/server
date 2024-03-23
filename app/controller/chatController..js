const Friend = require('../model/User')
const mongoose = require('mongoose')

module.exports = {
    getMessage : async ctx => {
        const Message = require('../model/Message');
        console.log(ctx.request.body);
        let { userName } = ctx.request.body;
        const res = await Message.find({'$or': [{ from: userName }, { to: userName }] }).select({_id:0});
        ctx.body = {
            code : '200',
            message : "查询成功",
            data : res
        }
    },
    insertMessage : async (data) => {
        const Message = require('../model/Message');
        const date = new Date().getTime();
        let {from, to, message} = data;
        const ret = await Message.updateOne({from, to}, {$push : {'info' : [message, date.toString()]}}).exec();
        console.log(ret);
    },
    getFriendList : async ctx => {
        const Friend = require('../model/Friend');
        let { userName } = ctx.request.body;
        const res = await Friend.findOne({ name : userName }).select({_id:0});
        ctx.body = {
            code : '200',
            message : "查询成功",
            data : res,
        }
    }
}