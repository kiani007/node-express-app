import { Router } from "express";
import DownloadController from "../controller/downloadController.js";
import page404 from "../middleware/page404.js";

const downloadRouter = Router();

downloadRouter.get('/downlaod-url', DownloadController.renderDownloadContent);
downloadRouter.post('/downlaod-urls-data', DownloadController.getDownloadedContent);
downloadRouter.post('/downlaod-content', DownloadController.downlaodedContent);
downloadRouter.all('/*', page404)


export default downloadRouter;
