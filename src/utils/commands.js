import {
  createDirectory, getPathParts, isPathValid, resolvePath,
} from './fileSystem';

export default {
  path(_parameters, path) {
    return path;
  },
  list(_parameters, path, _setPath, storage) {
    return Object.keys(resolvePath(storage, path).content).join(' ');
  },
  goto(parameters, path, setPath, storage) {
    let gotoPath = parameters;
    if (gotoPath === '.') {
      return null;
    }
    if (gotoPath === '..') {
      const parts = getPathParts(path);
      parts.pop();
      const newPath = `/${parts.join('/')}`;
      setPath(newPath);
      return null;
    }
    if (isPathValid(storage, gotoPath)) {
      if (!gotoPath || gotoPath[0] !== '/') {
        gotoPath = `/${gotoPath}`;
      }
      setPath(gotoPath);
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
  clear(_parameters, _path, _setPath, _storage, _setStorage, history, setHistory) {
    setHistory([]);
  },
};
