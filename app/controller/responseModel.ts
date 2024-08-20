import { Status } from "@/config/status";

export interface ResponseBody<T> {
  code: Status;
  data: T;
  msg: string;
}
