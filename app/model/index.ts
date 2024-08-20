import { connectedMongo } from "@/db/index";
import { CommonFile, UserFile } from "./types";

const CommonFileSchema = new connectedMongo.Schema<CommonFile>({
  id: { type: String, required: true },
  path: { type: String, required: true },
  name: { type: String, required: true },
  child: { type: Array(String), required: true },
});

export const CommonFileModel = connectedMongo.model(
  "file",
  CommonFileSchema,
  "file"
);

const UserFileSchema = new connectedMongo.Schema<UserFile>({
  id: { type: String, required: true },
  userId: { type: Number, required: true },
  path: { type: String, required: true },
  name: { type: String, required: true },
  child: { type: Array(String), required: true },
});

export const UserFileModel = connectedMongo.model("userFile", UserFileSchema, "userFile");