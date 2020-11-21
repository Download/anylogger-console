import anylogger from 'anylogger'

// override anylogger.ext() to make every log method use the console
anylogger.ext = function(logger) {
  var con = (typeof console !== 'undefined') && console
  for (var level in anylogger.levels) {
    logger[level] = con && (con[level] || con.log) || function(){}
  }
  logger.enabledFor = function(){return !0}
  return logger
}
