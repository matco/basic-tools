# basic-tools
basic-tools is a set of tools that will make your life easier when developing Javascript applications.

It contains two kind of tools:
* Two tools "enhance" Javascript by prototyping Javascript native classes (use with caution)
* The other tools are Javascript classes that can be imported as ES modules

Some tools can be used in Node.js, some require a DOM.

Javascript extensions:
* **extension.js** extends base Javascript classes with useful methods and helpers.
* **dom_extension.js** (requires a DOM) extends DOM Javascript classes to make everyday DOM operations easier.

Javascript classes:
* **bus.js** creates a bus for your events.
* **csv.js** (requires a DOM) makes creation of CSV files easy.
* **db_connector.js** (requires a DOM) simplifies manipulation of indexedDB.
* **loader.js** (requires a DOM) is able to load code (HTML, CSS or Javascript) in a DOM document.
* **lzw.js** is an implementation of LZW.
* **queue.js** executes a set promises one after the other.
* **reviver.js** transforms a tree or raw objects in a tree of typed object.
* **svg.js** (requires a DOM) simplifies drawing in SVG.
* **timeframe.js** manages timeframe.
* **uuid.js** generated UUIDs.

All tools are tested in their related file *.test.js.

## Usage
### Manual
Copy the tools you need in a folder named `basic-tools` somewhere in your project.

#### Extensions
In a module:
```
import './basic-tools/extension.js';
```

In the HTML:
```
<script type="text/javascript" src="basic-tools/extension.js"></script>
```

#### Tools
Import only what you need:
```
import {Timeframe} from './basic-tools/timeframe.js';
```

### With NPM and Webpack
The instructions below are for those who are using NPM and Webpack.

Install as an NPM dependency:
```
npm i @matco/basic-tools --save
```

#### Extensions
In a module:
```
import '@matco/basic-tools/extension.js';
```

In the HTML:
```
<script type="text/javascript" src="@matco/basic-tools/extension.js"></script>
```

#### Tools
Import only what you need:
```
import {Timeframe} from '@matco/basic-tools/timeframe.js';
```
