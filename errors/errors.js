exports.handleFourOFourErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if ((err.code === "22P02") ||  (err.code === "23502")){
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {

  res.status(500).send({ msg: 'Internal Server Error' });
};