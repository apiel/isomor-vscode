# isomor

This extension is a toolset for [isomor](https://github.com/apiel/isomor) library.

`isomor` give the possibility to develop a web application in a single project by abstracting the layers between frontend and backend.  Instead to implement an API, using REST or graphql, isomor will allow you to call the server functions directly from the UI code, without to think about the communication protocol. Isomor will take care to generate automatically those layers for you. All your code is implemented in the same folder and isomor will automatically separate them by using Babel transpiler. Since your code is tight together, there is much more consistency, that is one of the big advantage of using isomor, especially with TypeScript. It remove as well lot of overhead and let you focus on implementing features.

## Features

The main purpose of the extension is to replace `isomor-transpiler` watcher by triggering transpiler when file is edited in `./src-isomor` folder.

This extension depends directly on VScode file event. This might be more reliable than using file system event (from chokidar) and will as well save resources.

## Requirements

Instead to run your projects using `yarn dev`, run it using `yarn code`.
To re-build the all project, you can run the command `isomor build all`.

Get build informations in the output channel of VScode (Ctrl+K Ctrl+H), by selecting `isomor` in the dropdown menu.

## ToDo

- handle file deletion
- handle move files
