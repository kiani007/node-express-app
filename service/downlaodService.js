import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const DownlaodService = {
	downloadFromUrl: async (urls) => {
		try {
			const download = await Promise.all(urls.map(async (url) => {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.text
			}))
			const downlaodedContent = await prisma.downlaodedContent.create({ data: download })
			return downlaodedContent;
		} catch (error) {
			logger.error(error);
			throw new Error(error);
		}
	},
	getDownlaodedContent : async (id) => {
		try {
			const downloadedContents = await prisma.downlaodedContent.findFirst({
				//getting last stored contents
				where: { id: id },
				order: 'desc',
			});
			return downloadedContents;
		} catch (error) {
			throw new Error(error);
		}
	}
}
export default DownlaodService;