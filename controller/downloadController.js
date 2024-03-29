import logger from "../logger.js"
import { HTTP_STATUS, STATUS_MESSAGE } from "../utils/httpStatus.js"
import { successResponse } from "../utils/response.js"
import DownlaodService from "../service/downlaodService.js"
import { json } from "express"

const DownloadController = {
	renderDownloadContent: async (req, res, next) => {
		try {
			return res.render('downloadedurl',{title: "Downlaod from URL"})
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
			console.log(urls);
			const downloadedContents = await DownlaodService.downloadFromUrl(urls);
			console.log('success', downloadedContents);
			const downloadedContentObjects = downloadedContents.map(({ url, content }) => {
				const parsedContent = JSON.parse(content);
				return {
					url,
					content: parsedContent
				};
			});
			const transformedData = downloadedContents.map(({ url, content }) => ({
				url: url,
				context: content
			}));
			return res.render('content', { 
				title: 'content', 
				data: transformedData
			});
			// return res.status(HTTP_STATUS.OK).json(successResponse({ metadata: downloadedContents, message: 'success', status: HTTP_STATUS.OK }));			
		} catch (error) {
			logger.error(error);
			return res.render('downloadedurl', { message: error });
			return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: error});
		}
	},
	getDownloadedContent: async (req, res) => {
		try {
			//we can get id's in two ways one from header other from cookies
			const { id } = req.user;
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