import Router from "koa-router";
import { userRouter } from "./router/user";
import { loginRouter } from "./router/login";
import { swaggerRouter } from "@/config/swagger";
export const router = new Router();

router.use(userRouter.routes());
router.use(loginRouter.routes());
router.use(swaggerRouter.routes());
