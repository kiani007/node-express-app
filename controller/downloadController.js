import logger from "../logger"
import { HTTP_STATUS, STATUS_MESSAGE } from "../utils/httpStatus"
import { successResponse } from "../utils/response.js"
import DownlaodService from "../service/downlaodService.js"
import { Http } from "winston/lib/winston/transports/index.js"

const DownloadController = {
	renderDownloadContent: async (req, res, next) => {
		try {
			return res.render('downloadurl',{title: "Downlaod from URL"})
		} catch (error) {
			logger.error(error);// can use next to pass to error handler 
			// next(error);
			return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: error}); //send to client
		}
	},
	downlaodedContent: async (req, res) => {
		try {
			logger.info(`hitted: ${req.path}`);
			const { urls } = req.body
			const downloadedContents = await DownlaodService.downloadFromUrl(urls);
			console.log(downloadedContents.map(content => content));
			return res.status(HTTP_STATUS.OK).json(successResponse({ metadata: downloadedContents, message: 'success', status: HTTP_STATUS.OK }));			
		} catch (error) {
			logger.error(error);
			return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: error});
		}
	},
	getDownloadedContent: async (req, res) => {
		try {
			//we can get id's in two ways one from header other from cookies
			const { id } = req.body();
			if (!id) {
				throw new Error("did not find userID");
			}
			const downlaodedContent = await DownlaodService.getDownlaodedContent(id);
			//but here we should render
			return res.render('content', { title: 'content', data: downlaodedContent });

			return res.status(HTTP_STATUS.OK).json(successResponse({ metadata: downlaodedContent, message: STATUS_MESSAGE.OK,status:HTTP_STATUS.OK }))
		} catch (error) {
			logger.error(error);
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: error});
		}
	}
}

export default DownloadController;