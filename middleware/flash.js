module.exports = function (flash){

  let obj = (flash === undefined || Object.is(flash, {})) ? {on: false, message: ''} : flash;

  return function(req, res, next) {
    res.locals.flash = (!obj.on) ? undefined : obj;
    next();
  }
}
