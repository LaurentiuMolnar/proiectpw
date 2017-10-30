module.exports = function (flash){

  let obj = (flash === undefined) ? {on: false, message: ''} : flash;

  return function(req, res, next) {
    res.locals.flash = (!obj.on) ? undefined : obj;
    next();
  }
}
