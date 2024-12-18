// https://github.com/stacktracejs/stacktrace.js/blob/master/stacktrace.js
import ErrorStackParser from 'error-stack-parser';
import StackGenerator from 'stack-generator';

const generateError = function stacktrace$$generateError() {
  try {
    // Error must be thrown to get stack in IE
    throw new Error();
  } catch (error) {
    return error as Error;
  }
};

const isShapedLikeParsableError = function stacktrace$$isShapedLikeParsableError(
  error: Error & {
    'opera#sourceloc'?: string;
  },
) {
  return error.stack || error['opera#sourceloc'];
};

const stacktrace = {
  get: function stacktrace$$get(options?: {
    /** Maximum number of StackFrames to return. Default is 10 */
    maxStackSize: number;
  }) {
    const err = generateError();
    const stackframes = isShapedLikeParsableError(err)
      ? ErrorStackParser.parse(err)
      : StackGenerator.backtrace(options ?? { maxStackSize: 10 });

    return stackframes;
  },
};

export default stacktrace;
