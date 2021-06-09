/*eslint-env mocha*/

import './dom_extension.test.js';
import './db_connector.test.js';

mocha.checkLeaks();
mocha.run();
