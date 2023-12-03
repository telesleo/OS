import { resolve } from 'path-browserify';

import {
  createDirectory, createFile, isPathValid, getEntry, removeEntry,
} from './fileSystem';

export default {
  path(_parameters, path) {
    return path;
  },
  list(_parameters, path, _setPath, storage) {
    return Object.keys(getEntry(storage, path).content).join(' ');
  },
  goto(parameters, currentPath, setPath, storage) {
    const targetPath = resolve(currentPath, parameters);
    if (!isPathValid(storage, targetPath)) {
      return 'Invalid directory';
    }
    if (getEntry(storage, targetPath).type !== 'directory') {
      return 'The destination is not a directory';
    }
    setPath(targetPath);
    return null;
  },
  dir(parameters, path, _setPath, storage, setStorage) {
    const [name, dirPath = path] = parameters.split(' ');

    const resolvedPath = resolve(dirPath);

    if (!isPathValid(storage, resolvedPath)) {
      return 'Invalid directory';
    }

    return createDirectory(storage, setStorage, name, resolvedPath);
  },
  file(parameters, path, _setPath, storage, setStorage) {
    const [name, dirPath = path] = parameters.split(' ');

    const resolvedPath = resolve(dirPath);

    if (!isPathValid(storage, resolvedPath)) {
      return 'Invalid directory';
    }

    return createFile(storage, setStorage, name, resolvedPath);
  },
  remove(parameters, path, _setPath, storage, setStorage) {
    const dirFilePath = resolve(path, parameters);
    return removeEntry(storage, setStorage, dirFilePath);
  },
  clear(_parameters, _path, _setPath, _storage, _setStorage, _history, setHistory) {
    setHistory([]);
  },
};
