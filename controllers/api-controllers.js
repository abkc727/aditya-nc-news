const { selectApis } = require("../models/api-models");


exports.getApis = (req, res, next) => {
  selectApis()
    .then((apis) => {
      res.status(200).send(apis);
    })
    .catch((err) => {
    });

};
