module.exports = reqFilter = (req, res, next) => {
  if (!req.query.age) {
    res.send("First Enter age....");
  } else if (req.query.age < 18) {
    res.send("You not access this page");
  } else {
    next();
  }
};
