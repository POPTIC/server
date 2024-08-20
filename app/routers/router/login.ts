import Router from "koa-router";
export const loginRouter = new Router();
import loginController from "@/controller/userController";
/**
 * @swagger
 * /login: # 接口地址
 *   post: # 请求体
 *     description: login # 接口信息
 *     tags: [login] # 模块名称
 *     produces:
 *       - application/json # 响应内容类型
 *     parameters: # 请求参数
 *       - name: body
 *         description: login params
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           email:
 *             type: 'string'
 *             example: '2094596800@qq.com'
 *           password:
 *             type: 'string'
 *             example: 'qq1234'
 *     responses:
 *       '200':
 *         description: Ok
 *         schema:
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *               description: 返回状态码
 *             data:
 *               type: null
 *               description: 返回数据
 *             msg:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
loginRouter.post("/login", loginController.login);
/**
 * @swagger
 * /register: # 接口地址
 *   post: # 请求体
 *     description: register # 接口信息
 *     tags: [login] # 模块名称
 *     produces:
 *       - application/json # 响应内容类型
 *     parameters: # 请求参数
 *       - name: body
 *         description: register params 
 *         in: body
 *         required: true
 *         type: object 
 *         properties:
 *           password:
 *             type: 'string'
 *           userName:
 *             type: 'string'
 *           email:
 *             type: 'string'
 *     responses:
 *       '200':
 *         description: Ok
 *         schema:
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *               description: 返回状态码
 *             data:
 *               type: null
 *               description: 返回数据
 *             msg:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
loginRouter.post("/register", loginController.register);