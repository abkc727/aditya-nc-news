exports.handleFourOFourErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: err.detail });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  if (err.status === 500) {
  res.status(500).send({ msg: 'Internal Server Error' });
  } else {
    next(err);
  } 
};