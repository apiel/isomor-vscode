# isomor

This extension is a toolset for [isomor](https://github.com/apiel/isomor) library.

## Features

Its main feature is to replace `isomor-transpiler` watcher by triggering transpiler when file is edited in `./src-isomor` folder.

This extension depends directly on VScode file event. This might be more reliable than using file system event (from chokidar) and will as well save resources.

## Requirements

TBD.
