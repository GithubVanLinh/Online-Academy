module.exports = {
  register: (req, res, next) => {
    const body = req.body;
    console.log(body);
    res.status(200).json(body);
  },
};
