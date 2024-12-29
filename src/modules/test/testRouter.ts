import express from "express";
const router = express.Router();
import * as testController from "./testController";
import { upload } from "./testService";

router.post("/test", testController.test);
router.post("/file-upload", upload.single("testFile"), testController.fileUpload);

export default router;