import Jwt from "jsonwebtoken";
import { environment } from "@/config/enviroment";
import { Status } from "@/config/status";
import Koa from "koa";
import { useJwt } from "@/utils";

export default async function (ctx: Koa.BaseContext, next: Koa.Next) {
  if (ctx.url.startsWith("/swagger")) {
    await next();
    return;
  }
  if (ctx.url.startsWith("/login")) {
    await next();
    return;
  }
  if (ctx.url.startsWith("/register")) {
    await next();
    return;
  }
  const token = ctx.headers.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = {
      code: Status.NO_TOKEN,
      msg: "without token",
      data: null,
    };
    return;
  } else {
    try {
      const decode = Jwt.verify(token.trim(), environment.key);
      if (typeof decode === "object" && decode.exp && decode.id) {
        const expirationDate = decode.exp * 1000;
        const currentDate = Date.now();
        const deltaDate = expirationDate - currentDate;
        if (deltaDate < 0) {
          ctx.status = 401;
          ctx.body = {
            code: Status.TOKEN_INVALID,
            msg: "token expired",
            data: null,
          };
          return;
        }
        ctx.headers.authorization = decode.id;
        await next();
        if (deltaDate < environment.TokenExpiredTime / 3) {
          const newToken = useJwt({ id: decode.id });
          ctx.set("authorization", "Bearer " + newToken);
        } else {
          ctx.set("authorization", "Bearer " + token);
        }
        return;
      } else {
        ctx.status = 401;
        ctx.body = {
          code: Status.TOKEN_INVALID,
          msg: "token invalid",
          data: null,
        };
        return;
      }
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        code: Status.TOKEN_INVALID,
        msg: "token invalid",
        data: null,
      };
      return;
    }
  }
}
