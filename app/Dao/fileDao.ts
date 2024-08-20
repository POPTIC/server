import { CommonFileModel, UserFileModel } from "@/model";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { logger } from "@/utils/default.log";
import { CommonFile, UserFile } from "@/model/types";
import { connectedMongo } from "@/db";
import { openSync, readFileSync, writeFileSync, open } from "fs";
import { environment } from "@/config/enviroment";

const pathPrefix = "/assets";
export type PathType = "article" | "img" | "vedio" | "directory";
export type FileMeta = Omit<CommonFile, "child">;

export async function checkUserFileName(params: {
  fileName: string;
  userId: number;
}) {
  try {
    const res = await UserFileModel.findOne({
      name: params.fileName,
      userId: params.userId,
    }).exec();
    if (res) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    logger.error("check user file name error");
    return false;
  }
}

export async function checkCommonFileName(params: {
  parentFileId: string;
  fileName: string;
}) {
  try {
    const doc = await CommonFileModel.findOne({ id: params.parentFileId });
    if (doc) {
      const child = doc.get("child");
      const res = (
        await UserFileModel.find({ id: { $in: child } }, "name").exec()
      ).map((item) => {
        return item.name;
      });
      const filterList = res.includes(params.fileName);
      return filterList;
    } else {
      return false;
    }
  } catch (err) {
    logger.error("check common file name error");
    return false;
  }
}

export async function checkUserFileExist(params: {
  uuid: string;
}): Promise<FileMeta | null> {
  try {
    const doc = await UserFileModel.findOne({
      id: params.uuid,
    });
    if (doc) {
      return {
        id: doc.id,
        name: doc.name,
        path: doc.path,
      };
    }
    return null;
  } catch (err) {
    logger.error("check user file exist error");
    return null;
  }
}

export async function checkCommonFileExist(params: {
  uuid: string;
}): Promise<FileMeta | null> {
  try {
    const doc = await CommonFileModel.findOne({
      id: params.uuid,
    });
    if (doc) {
      return {
        id: doc.id,
        name: doc.name,
        path: doc.path,
      };
    }
    return null;
  } catch (err) {
    logger.error("check common file exist error");
    return null;
  }
}

export async function checkFileExist(params: {
  uuid: string;
}): Promise<FileMeta | null> {
  const promisesRes: (FileMeta | null)[] = await Promise.all([
    checkCommonFileExist(params),
    checkUserFileExist(params),
  ]);
  const ret = promisesRes.filter((item) => {
    return item !== null;
  });
  if (ret.length) {
    return ret[0];
  }
  return null;
}

export function useFileRecordCreate(fileParams: {
  fileName: string;
  path: string;
}) {
  function fileModelCreate(uuid: string, userId: number): UserFile {
    return {
      id: uuid,
      path: fileParams.path,
      name: fileParams.fileName,
      child: [],
      userId: userId,
    };
  }
  async function commonFileRecordCreate(
    parentFileId: string,
    uuid: string
  ): Promise<boolean> {
    const checkRes = await checkFileExist({ uuid: parentFileId });
    if (checkRes === null) {
      return false;
    } else if (checkRes.path !== "directory") {
      return false;
    }
    const fileModel = fileModelCreate(uuid, -1);
    const commonFile = new CommonFileModel(fileModel);
    const session = await connectedMongo.startSession();
    let res = true;
    session.startTransaction();
    try {
      CommonFileModel.updateOne(
        { id: parentFileId },
        {
          $push: { child: uuid },
        }
      ).session(session);
      commonFile.save({ session });
    } catch (err) {
      logger.error(`user file error`);
      res = false;
    } finally {
      session.endSession();
    }
    return res;
  }
  async function userFileRecordCreate(
    uuid: string,
    userId: number
  ): Promise<boolean> {
    const fileModel = fileModelCreate(uuid, userId);
    console.log("fileModel", fileModel);
    const userFile = new UserFileModel(fileModel);
    try {
      const res = await userFile.save();
      return true;
    } catch (err) {
      console.log(err);
      logger.error(`user file record create err`);
      return false;
    }
  }
  return {
    commonFileRecordCreate,
    userFileRecordCreate,
  };
}

export function pathGeneate(type: PathType) {
  let filePath = "";
  if (type === "directory") {
    filePath = "directory";
  } else {
    filePath = path.join(pathPrefix, type);
  }
  return filePath;
}

export function useFileCreate(fileParams: {
  fileName: string;
  type: PathType;
}) {
  const filePath = pathGeneate(fileParams.type);
  const { commonFileRecordCreate, userFileRecordCreate } = useFileRecordCreate({
    fileName: fileParams.fileName,
    path: filePath,
  });
  function realFileCreate(uuid: string) {
    if (fileParams.type !== "directory") {
      const finalPath = path.join(environment.fileLocation, filePath, uuid);
      try {
        console.log("filePath", finalPath);
        writeFileSync(finalPath, "");
        return true;
      } catch (err) {
        logger.error(`real file create error`);
        return false;
      }
    }
    return true;
  }
  async function userFileCreate(userId: number): Promise<FileMeta | null> {
    const uuid = uuidv4();
    const checkRes = await checkUserFileName({
      fileName: fileParams.fileName,
      userId: userId,
    });
    if (!checkRes) {
      const recordCreateRes = await userFileRecordCreate(uuid, userId);
      if (recordCreateRes) {
        try {
          if (fileParams.type === "directory") {
            return {
              id: uuid,
              name: fileParams.fileName,
              path: filePath,
            };
          } else {
            const fileCreateRes = realFileCreate(uuid);
            if (fileCreateRes) {
              return {
                id: uuid,
                name: fileParams.fileName,
                path: filePath,
              };
            } else {
              userFileRecordDelete(uuid);
              logger.warn("user file create - real file create fail");
              return null;
            }
          }
        } catch (err) {
          logger.error("user file create error");
          return null;
        }
      } else {
        logger.warn("user file create - file record create fail");
      }
    } else {
      logger.warn("user file create - file name check fail");
    }
    return null;
  }
  async function commonFileCreate(params: { parentId: string }) {
    if (
      await checkCommonFileName({
        parentFileId: params.parentId,
        fileName: fileParams.fileName,
      })
    ) {
      return false;
    }
    const uuid = uuidv4();
    let res = await commonFileRecordCreate(params.parentId, uuid);
    try {
      if (fileParams.type === "directory") {
      } else {
        res = res && realFileCreate(uuid);
      }
    } catch (err) {
      logger.error("common file create error");
      res = res && false;
    } finally {
      return res;
    }
  }
  return {
    userFileCreate,
    commonFileCreate,
  };
}

export async function userFileRecordDelete(uuid: string) {
  try {
    await UserFileModel.deleteOne({ id: uuid }).exec();
    return true;
  } catch (err) {
    logger.error(`user file id - ${uuid} delete`);
    return false;
  }
}

export async function commonFileDelete(uuid: string) {
  try {
    await CommonFileModel.deleteOne({ id: uuid }).exec();
    return true;
  } catch (err) {
    logger.error(`common file id - ${uuid} delete`);
  }
}

export function writeFileWrapper(
  pathType: Exclude<PathType, "directory">,
  uuid: string,
  data: NodeJS.ArrayBufferView
) {
  const fullPath = path.join(pathPrefix, pathType, uuid);
  try {
    const fd = openSync(fullPath, "w", 0o666);
    writeFileSync(fd, data);
    return true;
  } catch (err) {
    logger.error(`wirte file error - ${path}`);
    return (err as NodeJS.ErrnoException).code;
  }
}

export function readFileWrapper(path: string) {
  try {
    const fd = openSync(path, "r");
    const data = readFileSync(fd);
    return {
      status: true,
      data: data,
    };
  } catch (err) {
    logger.error(`read file error - ${path}`);
    return {
      status: false,
      data: (err as NodeJS.ErrnoException).code,
    };
  }
}

export async function searchUserFileInfo(userId: number) {
  try {
    const res = await UserFileModel.find({ userId: userId }).exec();
    return res.map((item) => {
      return {
        id: item.id,
        name: item.name,
        path: item.path,
      };
    });
  } catch (err) {
    logger.error("user file search error");
    return null;
  }
}

export async function searchUserFileInfoById(id: string) {
  try {
    const ret = {
      id: "",
      name: "",
      path: "",
    };
    const res = await UserFileModel.findOne({ id: id }).exec();
    if (res) {
      ret.id = id;
      ret.name = res.name;
      ret.path = res.path;
    }
    return ret;
  } catch (err) {
    logger.error("common file search error");
    return null;
  }
}

export async function searchCommonFileInfo(id: string) {
  try {
    const ret = {
      id: "",
      name: "",
      path: "",
    };
    const res = await CommonFileModel.findOne({ id: id }).exec();
    if (res) {
      ret.id = id;
      ret.name = res.name;
      ret.path = res.path;
    }
    return ret;
  } catch (err) {
    logger.error("common file search error");
    return null;
  }
}

export async function searchFileInfo(uuid: string) {
  try {
    const searchRes = await Promise.all([
      searchCommonFileInfo(uuid),
      searchUserFileInfoById(uuid),
    ]);
    const ret = searchRes.filter((item) => {
      return item !== null;
    });
    if (ret.length === 2 || ret.length === 0) {
      return null;
    } else {
      return ret[0];
    }
  } catch (err) {
    logger.error("file search error");
    return null;
  }
}
