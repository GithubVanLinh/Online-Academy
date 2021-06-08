// eslint-disable-next-line strict
const imgur = require("imgur");

imgur.setClientId(process.env.IMGUR_CLIENT_ID);
imgur.setAPIUrl("https://api.imgur.com/3/");

module.exports =
  {
    getNewFileUrl: async (filePath) => {
      try{
        const res = await imgur.uploadFile(filePath);
        return res.link;
      } catch (error) {
        console.log(error);
      }
    }
  }
