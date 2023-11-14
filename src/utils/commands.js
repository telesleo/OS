import { getPathParts, isPathValid, resolvePath } from './fileSystem';

export default {
  path(_parameters, path) {
    return path;
  },
  list(_parameters, path, _setPath, storage) {
    return Object.keys(resolvePath(storage, path)).join(' ');
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
};
