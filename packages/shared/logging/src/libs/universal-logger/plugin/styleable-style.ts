import { type LogLevel, logColors } from '../../../config.js';

import css from './object-to-css.js';

function getLogStyle(level: LogLevel) {
  return css({
    background: logColors.bg[level],
    border: `1px solid ${logColors.border[level]}`,
    color: logColors.text[level],
    lineHeight: 1.3,
    padding: '2px 5px',
  });
}

const style = {
  level: {
    trace: getLogStyle('trace'),
    debug: getLogStyle('debug'),
    done: getLogStyle('done'),
    success: getLogStyle('success'),
    info: getLogStyle('info'),
    notice: getLogStyle('notice'),
    warn: getLogStyle('warn'),
    error: getLogStyle('error'),
    fatal: getLogStyle('fatal'),
  },
  namespace: css({ color: '#036F96', lineHeight: 2 }),
  timestamp: css({ background: '#EDEFF4', color: '#3B5998', lineHeight: 1.5, padding: '2px 0' }),
};

export default style;
