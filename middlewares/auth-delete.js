module.exports = (req, res, next) => {
  if (!req.user)
    return res.status(401).send({
      ok: false,
      msg: "You don't have the necessary credential to perform this action",
    });

  next();
};
