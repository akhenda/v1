'use client';

import React from 'react';

import { logger } from '@/logger';

const obj = { name: 'Taya', age: 2.5 };

logger.trace('Logger testing...', obj);
logger.debug('Logger testing...', obj);
logger.done('Logger testing...', obj);
logger.success('Logger testing...', obj);
logger.info('Logger testing...');
logger.notice('Logger testing...');
logger.warn('Logger testing...');
logger.error('Logger testing...');
logger.fatal('Logger testing...');

function TestComp() {
  return <div>TestComp</div>;
}

export default TestComp;
