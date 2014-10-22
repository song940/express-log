
var logger = function(options){
  var log = function(req, res){
    console.log('%s %s %jms',req.method, req.url, res.responseTime);
  };
  return function(req, res, next){
    var _end = res.end;
    req.requestTime = new Date;
    res.end = function(){
      res.responseTime = (new Date) - req.requestTime;
      res.end = _end;
      log(req, res);
      res.end.apply(res, arguments);
    };
    next();
  }
};

module.exports = logger;
