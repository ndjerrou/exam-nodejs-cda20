module.exports = (req, res, next) => {
  req.user = {}; // testing...
  if (!req.user)
    return res.status(401).send({
      ok: false,
      msg: "You don't have the necessary credentials to perform this action",
    });

  next();
};
