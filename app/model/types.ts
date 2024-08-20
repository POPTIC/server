import { Types } from "mongoose";
export interface UserInfo {
  userId: number;
  userName: string;
  password: string;
  email: string;
  school: string;
  birthday: string;
}

export interface ArticleInfo {
  id: number;
  userId: number;
  articleId: string;
  viewNumber: number;
  likeNumber: number;
  tag: number;
}

export interface CommonFile {
  id: string;
  name: string;
  path: string;
  child: string[];
}

export interface UserFile extends CommonFile {
  userId: number;
}
