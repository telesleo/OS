import { resolve } from 'path-browserify';

import {
  createDirectory, createFile, isPathValid, getDirOrFile,
} from './fileSystem';

export default {
  path(_parameters, path) {
    return path;
  },
  list(_parameters, path, _setPath, storage) {
    return Object.keys(getDirOrFile(storage, path).content).join(' ');
  },
  goto(parameters, currentPath, setPath, storage) {
    let targetPath = resolve(currentPath, parameters);
    if (isPathValid(storage, targetPath)) {
      if (!targetPath || targetPath[0] !== '/') {
        targetPath = `/${targetPath}`;
      }
      setPath(targetPath);
      return null;
    }
    return 'Invalid directory';
  },
  dir(parameters, path, _setPath, storage, setStorage) {
    const [name, dirPath = path] = parameters.split(' ');

    if (!isPathValid(storage, dirPath)) {
      return 'Invalid directory';
    }

    return createDirectory(storage, setStorage, name, dirPath);
  },
  file(parameters, path, _setPath, storage, setStorage) {
    const [name, dirPath = path] = parameters.split(' ');

    if (!isPathValid(storage, dirPath)) {
      return 'Invalid directory';
    }

    return createFile(storage, setStorage, name, dirPath);
  },
  clear(_parameters, _path, _setPath, _storage, _setStorage, _history, setHistory) {
    setHistory([]);
  },
};
