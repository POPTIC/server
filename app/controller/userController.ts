import { Status } from "@/config/status";
import {
  BasicUserInfo,
  getUserInfoByEmail,
  getUserInfoByEmailAndPassword,
  getUserInfoById,
  insertUserInfo,
} from "@/Dao/userDao";
import Koa from "koa";
import { LoginInfo, RegisterInfo, UserId } from "./requestModel";
import { ResponseBody } from "./responseModel";
import crypto from "crypto-js";
import { useJwt } from "@/utils";
import { logger } from "@/utils/default.log";

type LoginResponse = Omit<BasicUserInfo, "userId">;
export default {
  getUSerInfo: async (
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext,
      ResponseBody<LoginResponse>
    >
  ) => {
    logger.info("reqeust /user/info");
    const { id } = ctx.request.body as UserId;
    const userInfos = await getUserInfoById({ id });
    if (userInfos.length) {
      const userInfo = userInfos[0];
      ctx.body = {
        code: Status.SUCCESS,
        msg: "get user info success",
        data: userInfo,
      };
    } else {
      ctx.body = {
        code: Status.USERNAME_NOTEXIST,
        msg: "user id not exist",
        data: {
          userName: "",
          email: "",
          birthday: "",
          school: "",
        },
      };
    }
  },
  login: async (
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext,
      ResponseBody<LoginResponse>
    >
  ) => {
    const { email, password } = ctx.request.body as LoginInfo;
    const cryptoPassword = crypto.MD5(password).toString(crypto.enc.Hex);
    const userInfos = await getUserInfoByEmailAndPassword({
      email,
      password: cryptoPassword,
    });
    if (userInfos.length) {
      const userInfo = userInfos[0];
      const token = useJwt({
        id: userInfos[0].userId,
      });
      const res: LoginResponse = {
        userName: userInfo.userName,
        school: userInfo.school,
        email: userInfo.email,
        birthday: userInfo.birthday,
      };
      ctx.set("authorization", "Bearer " + token);
      ctx.body = {
        code: Status.SUCCESS,
        msg: "login success",
        data: res,
      };
    } else {
      ctx.body = {
        code: Status.EMAIL_PASSWORD_NOT_MATCH,
        msg: "login fail",
        data: {
          userName: "",
          school: "",
          email: "",
          birthday: "",
        },
      };
    }
  },
  checkEmail: async (
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext,
      ResponseBody<null>
    >
  ) => {
    logger.info("request /user/checkEmail");
    const { email } = ctx.request.body as { email: string };
    const userInfos = await getUserInfoByEmail({ email });
    if (userInfos.length) {
      ctx.body = {
        code: Status.SUCCESS,
        msg: "email can be used",
        data: null,
      };
    } else {
      ctx.body = {
        code: Status.EMAIL_DUPLICATE,
        msg: "email duplicate",
        data: null,
      };
    }
  },
  register: async (
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext,
      ResponseBody<null>
    >
  ) => {
    logger.info("request ./login");
    const { userName, email, password } = ctx.request.body as RegisterInfo;
    const userInfos = await getUserInfoByEmail({ email });
    const cryptoPassword = crypto.MD5(password).toString(crypto.enc.Hex);
    if (!userInfos.length) {
      const res = await insertUserInfo({
        userName,
        password: cryptoPassword,
        email,
      });
      const token = useJwt({
        id: res.userId,
      });
      ctx.set("authorization", "Bearer " + token);
      ctx.body = {
        code: Status.SUCCESS,
        msg: "register successful",
        data: null,
      };
    } else {
      ctx.body = {
        code: Status.EMAIL_DUPLICATE,
        msg: "register error - email duplicate",
        data: null,
      };
    }
  },
  userAvatarUrl: async (
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext,
      ResponseBody<number>
    >
  ) => {
    const id = ctx.body.data;
    
  },
};
