import { dataQuery } from "@/db/index";
import { UserInfo } from "@/model/types";

export type BasicUserInfo = Omit<UserInfo, "password">;

const queryBasicUserInfoPrefix =
  "select userId, userName, email, school, birthday, avatar from users";

export async function getUserInfoById(params: {
  id: number;
}): Promise<BasicUserInfo[]> {
  const sql = `${queryBasicUserInfoPrefix} where userId = ?`;
  return await dataQuery.query<BasicUserInfo[]>(sql, [params.id]);
}

export async function getUserInfoByUserName(params: {
  userName: string;
}): Promise<BasicUserInfo[]> {
  const sql = `${queryBasicUserInfoPrefix} where userName = ?`;
  return await dataQuery.query<BasicUserInfo[]>(sql, [params.userName]);
}

export async function getUserInfoByEmailAndPassword(params: {
  email: string;
  password: string;
}): Promise<BasicUserInfo[]> {
  const sql = `${queryBasicUserInfoPrefix} where email = ? and password = ?`;
  return await dataQuery.query<BasicUserInfo[]>(sql, [
    params.email,
    params.password,
  ]);
}

export async function getUserInfoByEmail(params: {
  email: string;
}): Promise<BasicUserInfo[]> {
  const sql = `${queryBasicUserInfoPrefix} where email = ?`;
  return await dataQuery.query<BasicUserInfo[]>(sql, [params.email]);
}

export async function insertUserInfo(params: {
  userName: string;
  password: string;
  email: string;
}) {
  const sql = "insert into users values(null,?,?,?,null,null,null)";
  return await dataQuery.query<BasicUserInfo>(sql, [
    params.userName,
    params.password,
    params.email,
  ]);
}

