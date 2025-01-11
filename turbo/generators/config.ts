import type { PlopTypes } from '@turbo/gen';

import example from './example';
import init from './init';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('example', example);
  plop.setGenerator('init', init);
}
