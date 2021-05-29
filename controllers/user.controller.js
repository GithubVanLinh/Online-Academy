const UserService = require("../services/user.service");
module.exports = {
  createNewStudent: async (req, res, next) => {
    const body = req.body;
    const user = await UserService.createUser(body);
    if (user === null) {
      return res.status(400).json({
        error: "cannot create user",
      });
    }
    return res.status(200).json(user);
  },
};
