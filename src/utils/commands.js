import resolvePath from './fileSystem';

export default {
  path(_parameters, path) {
    return path;
  },
  list(_parameters, path, _setPath, storage) {
    return Object.keys(resolvePath(storage, path)).join(' ');
  },
};
