// context
import context from './imports/configs/context';
import injectTapEventPlugin from 'react-tap-event-plugin';
// mantra core
import {createApp} from 'mantra-core';
// modules
import coreModule from './imports/modules/core';

import launch from './imports/main.jsx';

injectTapEventPlugin();

const app = createApp(context);
app.loadModule(coreModule);
//app.loadModule(commentsModule);
app.init();

launch();




