import express from "express";
const router = express.Router();
import * as testController from "./testController";
import { upload } from "./testService";
import { verifyToken } from "../auth/authMiddleware";

router.post("/test", testController.test);
router.post("/file-upload-single", verifyToken, upload.single("testFile"), testController.fileUploadSingle);
router.post(
  "/file-upload-multiple",
  verifyToken,
  upload.fields([
    { name: "testFile1", maxCount: 1 },
    { name: "testFile2", maxCount: 1 },
  ]),
  testController.fileUploadMultiple
);
router.post("/connect-model-database", verifyToken, testController.connectModelDatabase);
router.get("/ejs-render", testController.ejsRender);

export default router;
