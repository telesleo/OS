export default function getCurrentTime() {
  const date = new Date();
  return date.toISOString();
}
