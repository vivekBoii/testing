export default function customHashUint8Array(input: Uint8Array): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input[i];
  }
  const hashString = String(hash);
  if (hashString.startsWith("-")) {
    return hashString.substring(1);
  }
  return hashString;
}