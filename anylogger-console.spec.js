import { expect } from 'chai'
import sinon from 'sinon'
import 'anylogger-console'
import anylogger from 'anylogger'

var sandbox = sinon.createSandbox();

describe('anylogger([name, [options]]) => log', () => {
  afterEach(() => {
    // clear any loggers that were created
    for (const name in anylogger.all) {
      delete anylogger.all[name]
    }
    // restore original console methods
    sandbox.restore()
  })


  it('is a function', () => {
    expect(anylogger).to.be.a('function')
  })

  it('returns a named logger when called with a name', () => {
    var name = 'test'
    var result = anylogger(name)
    expect(result).to.be.a('function')
    expect(result.name).to.equal(name)
  })

  it('returns the same logger when called multiple times with the same name', () => {
    var name = 'test'
    var expected = anylogger(name)
    var actual = anylogger(name)
    expect(actual).to.equal(expected)
  })

  it('calls anylogger.new when a new logger named "test" is created', () => {
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('test')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('calls anylogger.ext when a new logger named "test" is created', () => {
    sandbox.spy(anylogger, 'ext')
    expect(anylogger.ext.callCount).to.equal(0)
    anylogger('test')
    expect(anylogger.ext.callCount).to.equal(1)
  })

  it('does not call anylogger.new on subsequent calls with the same name', () => {
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('test')
    expect(anylogger.new.callCount).to.equal(1)
    anylogger('test')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('calls anylogger.new when a new logger named "toString" is created', () => {
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('toString')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('does not call anylogger.new on subsequent calls with "toString" as argument', () => {
    sandbox.spy(anylogger, 'new')
    expect(anylogger.new.callCount).to.equal(0)
    anylogger('toString')
    expect(anylogger.new.callCount).to.equal(1)
    anylogger('toString')
    expect(anylogger.new.callCount).to.equal(1)
  })

  it('accepts an optional options argument', () => {
    var name = 'test'
    var options = { level: 'info' }
    var result = anylogger(name, options)
    expect(result).to.be.a('function')
  })

  describe('log', () => {
    it('is a function', () => {
      var name = 'test'
      var log = anylogger(name)
      expect(log).to.be.a('function')
    })

    it('has a name that matches the name given to anylogger', () => {
      var name = 'test'
      var log = anylogger(name)
      expect(log.name).to.equal(name)
    })

    it('has a method `trace`', () => {
      var log = anylogger('test')
      expect(log).to.have.property('trace')
      expect(log.trace).to.be.a('function')
    })

    it('has a method `debug`', () => {
      var log = anylogger('test')
      expect(log).to.have.property('debug')
      expect(log.debug).to.be.a('function')
    })

    it('has a method `log`', () => {
      var log = anylogger('test')
      expect(log).to.have.property('log')
      expect(log.log).to.be.a('function')
    })

    it('has a method `info`', () => {
      var log = anylogger('test')
      expect(log).to.have.property('info')
      expect(log.info).to.be.a('function')
    })

    it('has a method `warn`', () => {
      var log = anylogger('test')
      expect(log).to.have.property('warn')
      expect(log.warn).to.be.a('function')
    })

    it('has a method `error`', () => {
      var log = anylogger('test')
      expect(log).to.have.property('error')
      expect(log.error).to.be.a('function')
    })

    it('has a method `enabledFor`', () => {
      var log = anylogger('test')
      expect(log).to.have.property('enabledFor')
      expect(log.enabledFor).to.be.a('function')
      expect(log.enabledFor()).to.equal(true)
    })

    it('can be invoked to log a message', () => {
      var log = anylogger('test')
      sandbox.spy(log, 'log')
      log('message')
      expect(log.log.callCount).to.equal(1)
    })

    it('can be invoked with a level name as first argument to log a message at that level', () => {
      var log = anylogger('test')
      sandbox.spy(log, 'log')
      sandbox.spy(log, 'info')
      log('info', 'message')
      expect(log.log.callCount).to.equal(0)
      expect(log.info.callCount).to.equal(1)
    })

    it('prints messages to the console', () => {
      sandbox.spy(console, 'log')
      var log = anylogger('test')
      expect(console.log.callCount).to.equal(0)
      log('message')
      expect(console.log.callCount).to.equal(1)
    })
  })
})
