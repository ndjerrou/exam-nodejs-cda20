const { green: g, bold } = require('chalk');
const { table } = require('table');

module.exports = (req, res, next) => {
  const infos = [
    [bold('METHOD'), g(req.method)],
    [bold('HOSTNAME'), g(req.hostname)],
    [bold('ENDPOINT'), g(req.originalUrl)],
  ];

  console.log(table(infos));

  next();
};
