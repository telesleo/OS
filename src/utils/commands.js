import { resolve } from 'path-browserify';

import {
  createDirectory, createFile, isPathValid, getDirOrFile, removeDirOrFile,
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
    return removeDirOrFile(storage, setStorage, dirFilePath);
  },
  clear(_parameters, _path, _setPath, _storage, _setStorage, _history, setHistory) {
    setHistory([]);
  },
};
