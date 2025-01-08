// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { EventEmitter } from 'events';

import LogLevel from './LogLevel.js';
import { DEBUG, ERROR, INFO, OFF, TRACE, WARN } from './constants.js';
import stacktrace from './stacktrace.js';
import type { LogContext, LogHandler } from './types.js';

class Logger extends EventEmitter {
  namespace = '';
  level = OFF;
  stacktrace = false;
  chainedHandlers: LogHandler[] = [];

  constructor(namespace: Record<string, unknown> | string, options: { level?: LogLevel } = {}) {
    super();

    if (typeof namespace === 'object') {
      // biome-ignore lint/style/noParameterAssign: very intentional
      options = namespace;
      // biome-ignore lint/style/noParameterAssign: very intentional
      namespace = ''; // master
    }

    const { level = this.level } = { ...options };

    this.namespace = namespace;
    this.setLevel(level);
  }

  invokeChainedHandlers(level: LogLevel, messages: unknown[]) {
    let i = 0;

    const context: LogContext = { namespace: this.namespace, level: level, stackframes: [] };
    const next = () => {
      const handler = i < this.chainedHandlers.length ? this.chainedHandlers[i] : null;

      if (!handler) return;

      ++i;
      handler({ ...context }, messages, next);
    };

    if (this.stacktrace) {
      try {
        const stackframes = stacktrace.get();
        context.stackframes = stackframes;
        this.emit('log', { ...context }, messages);
      } catch (e) {
        // Ignore
        console.error(e);
      }

      next();
    } else {
      try {
        this.emit('log', { ...context }, messages);
      } catch (e) {
        console.error(e);
      }

      next();
    }
  }

  use(handler: LogHandler) {
    if (typeof handler === 'function') this.chainedHandlers.push(handler);

    return this;
  }

  enableStackTrace() {
    this.stacktrace = true;
  }

  disableStackTrace() {
    this.stacktrace = false;
  }

  // Changes the current logging level for the logging instance
  setLevel(level: LogLevel) {
    if (level instanceof LogLevel) this.level = level;

    this.emit('setLevel', this.level);

    return this.level;
  }

  // Returns the current logging level fo the logging instance
  getLevel() {
    return this.level;
  }

  log(level: LogLevel, ...messages: unknown[]) {
    if (level instanceof LogLevel && level.value >= this.level.value) {
      this.invokeChainedHandlers(level, messages);
    }
  }

  trace(...messages: unknown[]) {
    if (TRACE.value >= this.level.value) this.invokeChainedHandlers(TRACE, messages);
  }

  debug(...messages: unknown[]) {
    if (DEBUG.value >= this.level.value) this.invokeChainedHandlers(DEBUG, messages);
  }

  info(...messages: unknown[]) {
    if (INFO.value >= this.level.value) this.invokeChainedHandlers(INFO, messages);
  }

  warn(...messages: unknown[]) {
    if (WARN.value >= this.level.value) this.invokeChainedHandlers(WARN, messages);
  }

  error(...messages: unknown[]) {
    if (ERROR.value >= this.level.value) this.invokeChainedHandlers(ERROR, messages);
  }
}

export default Logger;
