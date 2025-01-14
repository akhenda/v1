import type { LogLevel as Level } from '../../../config.js';

class LogLevel {
  name: Level | 'off' = 'off';
  value = 9999;

  constructor(name: Level | 'off', value: number) {
    if (typeof name !== 'string' || !name) {
      throw new Error(`The given name (${name}) is not a valid string.`);
    }

    if (typeof value !== 'number') {
      throw new Error(`The given value (${value}) is not a valid number.`);
    }

    this.name = name;
    this.value = Number(value) || 0;
  }
}

export default LogLevel;
