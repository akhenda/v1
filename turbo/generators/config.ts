import type { PlopTypes } from '@turbo/gen';

import example from './example';
import init from './init';
import { bunCreateExpo, bunCreateNextApp, bunInstall } from './utils/actions';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setActionType('bunInstall', bunInstall);
  plop.setActionType('bunCreateExpo', bunCreateExpo);
  plop.setActionType('bunCreateNextApp', bunCreateNextApp);

  // use the custom action
  plop.setGenerator('test', {
    description: 'Noma sana...',
    prompts: [{ type: 'input', name: 'title', message: 'What should be?' }],
    actions: [
      { type: 'doTheThing', configProp: 'available from the config param' },
      { type: 'doTheAsyncThing', speed: 'slow' },
      { type: 'bunInstall' },
    ],
  });

  plop.setGenerator('example', example);
  plop.setGenerator('init', init);
}
