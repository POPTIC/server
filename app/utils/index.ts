import jwt from "jsonwebtoken";
import { environment } from "@/config/enviroment";
export function useJwt(data: object) {
  return jwt.sign(data, environment.key, {
    expiresIn: environment.TokenExpiredTime,
  });
}
