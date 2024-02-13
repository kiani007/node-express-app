import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const DownlaodService = {
	//   downloadFromUrl: async (urls) => {
    //     const downloadObjects = [];
    //     try {
    //         console.log("before try",urls);
    //          await Promise.all(urls.map(async (url) => {
    //             console.log("in try");
    //             const response = await fetch(url);
    //             console.log({response});
    //             if (!response.ok) {
    //                 const errorMessage = `HTTP error! Status: ${response.status}`;
    //                 logger.error(errorMessage);
    //                 throw new Error(errorMessage);
    //             }
    //             const data = await response.json(); 
    //             console.log({data});
    //             const downloadData = { url, content: JSON.stringify(data) }; 
    //             downloadObjects.push(downloadData);
    //             return data;
    //         })); 
    
    //         console.log('downloadedContent', downloadObjects);
    //         return downloadObjects;
    //     } catch (error) {
    //         logger.error(error.message);
    //         throw new Error(error.message);
    //     }
    // },

     downloadFromUrl: async (url) => {
        const downloadObjects = [];
        try {
            const response = await fetch(url);
      
            if (!response.ok) {
                const errorMessage = `HTTP error! Status: ${response.status}`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
      
            const data = await response.json();
            console.log({data});
            return data;
        } catch (error) {
            logger.error(error.message);
            throw new Error(error.message);
        }
      },

	getDownlaodedContent : async (id) => {
		try {
			const downloadedContents = await prisma.downlaodedContent.findFirst({
				//getting last stored contents
				where: { id },
				order: 'desc',
			});
			return downloadedContents;
		} catch (error) {
			throw new Error(error);
		}
	}
}
export default DownlaodService;