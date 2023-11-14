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

  let current = storage.content;

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (current[part] === undefined) {
      return null;
    }
    current = current[part].content;
  }

  return current;
}
