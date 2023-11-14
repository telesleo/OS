export function getPathParts(path) {
  return path.split('/').filter((part) => part !== '');
}

export function isPathValid(storage, path) {
  if (!path) return false;

  const parts = getPathParts(path);

  let current = storage.content;

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (current[part] === undefined) {
      return false;
    }
    current = current[part].content;
  }

  return true;
}

export function resolvePath(storage, path) {
  const parts = getPathParts(path);

  let current = storage;

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (current.type !== 'directory' || current.content[part] === undefined) {
      return null;
    }
    current = current.content[part];
  }

  return current;
}

export function createDirectory(storage, setStorage, name, path) {
  if (!isPathValid(storage, path)) {
    return 'Invalid directory';
  }

  const directory = resolvePath(storage, path);

  if (directory.content[name] !== undefined) {
    return 'Directory already exists';
  }

  directory.content[name] = {
    type: 'directory',
    content: {},
  };

  setStorage({ ...storage });
  return `Directory "${name}" created at path ${path}`;
}
