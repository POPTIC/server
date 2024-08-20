import type { Context } from "koa";
import { UserFileModel } from "@/model";
function createFile(folderName: string, fileName: string) {
  return folderName + "/" + folderName;
}
export default {
  uploadAvatar: async (ctx: Context) => {
    
  },
  removeFolder: async (ctx: Context) => {},
  removeFile: async (ctx: Context) => {},
  addFolder: async (ctx: Context) => {
    const newFolder = new Folder({
        userId: {type: Number, required: true},
        path: {type: String, required: true},
        name: {type: String, required: true},
        child: {type: Array(String), required:true},
    });
    const ret = await folder.updateOne(
      { id:  },
      // 对于第二个动作push（键）对应的value 也可以为一个Object对象，其中的键为要插入的属性值（这个属性必须是array类型）
      { $push: { folders: { type: "folder", name: folderName, child: Array } } }
    ).exec();
    ctx.body = {
      code: "200",
      message: "success",
    };
  },
  addFile: async (ctx: Context) => {
    const { userName, folderName, fileName } = ctx.request
      .body as AddFileRequestBody;
    // 注意条件查找，向指定array字段插入数据的写法
    const path = createFile(folderName, fileName);
    // const ret = await Folder.find({ name: userName }).updateOne({
    //   folders: { $elemMatch: { name: folderName }}}, {$push: {child: {type: 'file', name: fileName, path: path}}}
    // ).exec();
    const ret = await Folder.findOne({ name: userName }).select('folders');
    //   .updateOne(
    //     {},
    //     { $push: { child: { type: "file", name: fileName, path: path } } }
    //   ).exec();
    console.log(ret);
    ctx.body = {
      code: "200",
      message: "success",
    };
  },
  searchAllFiles: async (ctx: Context) => {
    
    const { userName } = ctx.query;
    const fileData = await Folder.findOne({ name: userName }).select({
      _id: 0,
    }); // 如果其中的字段被设置为0则会被筛掉
    ctx.body = {
      code: "200",
      message: "success",
      data: fileData,
    };
  },
};
