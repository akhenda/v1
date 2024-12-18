import { colorize, getIcon, isServer } from '../../../utils.js';
import type { LogContext, LoggerOptions } from '../core/types.js';

import css from './object-to-css.js';
import styleableStyle from './styleable-style.js';

const noop = () => null;

const styleable = (options: LoggerOptions) => {
  const {
    colorized = true,
    showIcon = false,
    showSource = true,
    showTimestamp = false,
    formatTimestamp = (t: number) => new Date(t).toISOString(),
  } = options;

  const style = {
    ...styleableStyle,
    ...(options.style || {}),
    level: { ...styleableStyle.level, ...(options.style?.level || {}) },
  };

  return (context: LogContext, messages: unknown[], next: () => void) => {
    // biome-ignore lint/style/noParameterAssign: very intentional
    if (typeof next !== 'function') next = noop;
    if (typeof console === 'undefined') {
      next();

      return;
    }

    const styles = [];
    const formatters = [];
    const timestamp = new Date().getTime();
    const { namespace, level, stackframes = [] } = context;
    const scope = namespace ? `(${namespace})` : '';

    let formattedTimestamp = timestamp.toString();

    if (typeof formatTimestamp === 'function') formattedTimestamp = formatTimestamp(timestamp);
    if (!showTimestamp) formattedTimestamp = '';

    const timestampWithScope = formattedTimestamp ? `${formattedTimestamp} ${scope}` : scope;

    if (colorized) {
      if (isServer()) {
        formatters.push(colorize(` ${timestampWithScope} `, level.name, true));
      } else {
        formatters.push(`%c ${timestampWithScope} %c`);
        styles.push(style.timestamp);
        styles.push('');
      }
    } else {
      formatters.push(timestampWithScope);
    }

    if (level?.name) {
      const str = level.name.toUpperCase();

      if (colorized) {
        if (isServer()) {
          formatters.push(`[${colorize(str, level.name)}]:`);
        } else {
          formatters.push(`%c${str}%c`);

          const styledLevel = style.level[level.name] || '';

          if (typeof styledLevel === 'object') styles.push(css(styledLevel));
          else styles.push(String(styledLevel));

          styles.push('');
        }
      } else {
        formatters.push(str);
      }
    }

    let msgs = [
      formatters.join(' '),
      ...styles,
      showIcon ? getIcon(level.name) : null,
      ...messages.filter(Boolean),
    ].filter((e) => e !== null);

    if (showSource && stackframes.length > 0) {
      const stackframeIndex = Math.min(4, stackframes.length - 1);
      const source = stackframes[stackframeIndex]?.source || '';

      msgs = msgs.concat(source);
    }

    const log = console.log || noop;

    Function.prototype.apply.call(log, console, msgs);

    next();
  };
};

export default styleable;
