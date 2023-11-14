export default function resolvePath(storage, path) {
  const parts = path.split('/').filter((part) => part !== '');

  let current = storage;

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (current[part] === undefined) {
      return null;
    }
    current = current[part];
  }

  return current;
}
