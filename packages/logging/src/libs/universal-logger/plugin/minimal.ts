import { noop } from '../../../utils.js';
import type { LogContext, LoggerOptions } from '../core/types.js';

const defaultFormatter = (context: LogContext, messages: unknown[]) => {
  const formatters = [];
  const { level, namespace } = { ...context };

  if (level?.name) formatters.push(level.name.toUpperCase());
  if (namespace) formatters.push(namespace);

  const msgs = [formatters.join(' '), ...messages];

  return msgs;
};

const nativeConsoleMethods = {
  trace: typeof console !== 'undefined' && console.trace,
  debug: typeof console !== 'undefined' && console.debug,
  done: typeof console !== 'undefined' && console.log,
  success: typeof console !== 'undefined' && console.log,
  info: typeof console !== 'undefined' && console.info,
  notice: typeof console !== 'undefined' && console.info,
  warn: typeof console !== 'undefined' && console.warn,
  error: typeof console !== 'undefined' && console.error,
  fatal: typeof console !== 'undefined' && console.error,
  off: noop,
};

const minimal = (options: LoggerOptions) => {
  let { formatter = defaultFormatter } = options;
  const { useNativeConsoleMethods = true, showSource = true } = options;

  if (typeof formatter !== 'function') formatter = (_: LogContext, messages: unknown[]) => messages;

  return (context: LogContext, messages: unknown[], next = noop) => {
    // biome-ignore lint/style/noParameterAssign: very intentional
    if (typeof next !== 'function') next = noop;
    if (typeof console === 'undefined') {
      next();

      return;
    }

    let msgs = formatter(context, messages);

    if (showSource && context.stackframes.length > 0) {
      const stackframeIndex = Math.min(4, context.stackframes.length - 1);
      const source = context.stackframes[stackframeIndex]?.source || '';

      msgs = msgs.concat(source);
    }

    const log = useNativeConsoleMethods
      ? nativeConsoleMethods[context.level.name] || console.log || noop
      : console.log || noop;

    Function.prototype.apply.call(log, console, msgs);

    next();
  };
};

export default minimal;
