const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
  });

  const result = schema.validate(req.body);

  if (result.error)
    return res
      .status(400)
      .send({ ok: false, msg: result.error.details[0].message });

  next();
};
