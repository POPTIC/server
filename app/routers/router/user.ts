import Router from "koa-router";
export const userRouter = new Router();
import userController from "@/controller/userController";
/**
 * @swagger
 * /user/info: # 接口地址
 *   post: # 请求体
 *     description: 用户登入 # 接口信息
 *     security:
 *       - Bearer: []
 *     tags: [user] # 模块名称
 *     produces:
 *       - application/json # 响应内容类型
 *     parameters: # 请求参数
 *       - name: body
 *         description: user info parmas
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             example: 1
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
 *               type: 'object'
 *               properties:
 *                 userName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 school:
 *                   type: string
 *                 birthday:
 *                   type: string
 *               description: 返回数据
 *             msg:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
userRouter.post("/user/info", userController.getUSerInfo);
/**
 * @swagger
 * /user/checkEmail: # 接口地址
 *   post: # 请求体
 *     description: email exist check # 接口信息
 *     tags: [user] # 模块名称
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json # 响应内容类型
 *     parameters: # 请求参数
 *       - name: body
 *         description: user email check 
 *         in: body
 *         required: true
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *             example: '2094596800@qq.com'
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
 *               type: 'boolean'
 *               description: 返回数据
 *             msg:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
userRouter.post("/user/checkEmail", userController.checkEmail);
