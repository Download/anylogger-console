import anylogger, {
  type AnyLogger,
  type Logger,
  type LogLevel,
  type LogFunction,
  type Adapter,
} from 'anylogger'

const adapter: Adapter = (anylogger, console) => {
  // bail early if already extended
  if ((anylogger as any).console) return
  // override anylogger.ext() to make it use the console
  anylogger.ext = (logger: LogFunction): Logger => {
    for (const level in anylogger.levels) {
      // need to do some casting here as we are building the logger
      (logger as Logger)[level as LogLevel] = (
        ((console as any)[level as LogLevel] || console.log || (()=>{}))
      )
    }
    (logger as Logger).enabledFor = () => true
    return logger as Logger
  }
  // set a flag so we can tell it was extended
  (anylogger as any).console = console
}

export default adapter

// backward compat
adapter(anylogger, console)
