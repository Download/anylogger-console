import anylogger, {
  type Logger,
  type LogLevel,
  type LogFunction
} from 'anylogger'

// override anylogger.ext() to make it use the console
anylogger.ext = (logger: LogFunction): Logger => {
  var con = (typeof console !== 'undefined') && console
  for (const level in anylogger.levels) {
    // need to do some casting here as we are building the logger
    (logger as Logger)[level as LogLevel] = ((
      con && (con[level as LogLevel] || con.log) || (()=>{})
    ) as LogFunction)
  }
  (logger as Logger).enabledFor = function(){return !0}
  return logger as Logger
}
