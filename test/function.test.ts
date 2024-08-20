import {
  commonFileDelete,
  useFileCreate,
  useFileRecordCreate,
  userFileRecordDelete,
} from "@/Dao/fileDao";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, test } from "@jest/globals";

describe("File Dao", () => {
  const fileRecordCreator = useFileRecordCreate({
    fileName: "test",
    path: "/assets/article",
  });
  const directoryCreator = useFileRecordCreate({
    fileName: "test",
    path: "dictory",
  });
  const userFileUuid = uuidv4();
  test.skip("user file record create", async () => {
    const createRes = await fileRecordCreator.userFileRecordCreate(
      userFileUuid,
      1
    );
    expect(createRes).toBe(true);
    const deleteRes = await userFileRecordDelete(userFileUuid);
    expect(deleteRes).toBe(true);
  });

  test.skip("common file record create", async () => {
    const uuid = uuidv4();
    const createRes = await fileRecordCreator.commonFileRecordCreate(
      userFileUuid,
      uuid
    );
    try {
      expect(createRes).toBe(false);
    } catch (err) {
      console.log(err);
      const deleteRes = await commonFileDelete(uuid);
      expect(deleteRes).toBe(true);
    }
    const createUserFileRes = await fileRecordCreator.userFileRecordCreate(
      userFileUuid,
      1
    );
    expect(createUserFileRes).toBe(true);
    const createCommonFileRes = await fileRecordCreator.commonFileRecordCreate(
      userFileUuid,
      uuid
    );
    expect(createCommonFileRes).toBe(false);
    const deleteRes = await userFileRecordDelete(userFileUuid);
    expect(deleteRes).toBe(true);
  });

  test.skip("user dict record create", async () => {
    const uuid = uuidv4();
    const userDictCreateRes = await directoryCreator.userFileRecordCreate(
      userFileUuid,
      1
    );
    expect(userDictCreateRes).toBe(true);
    const newCommonFileRes = await fileRecordCreator.commonFileRecordCreate(
      userFileUuid,
      uuid
    );
    expect(newCommonFileRes).toBe(true);
    await userFileRecordDelete(userFileUuid);
    await commonFileDelete(uuid);
  });

  const fileCreator = useFileCreate({
    fileName: "test",
    type: "article",
  });

  test("user file create", async () => {
    const res = await fileCreator.userFileCreate(1);
    console.log("res", res);
  });
});
