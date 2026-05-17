/**
 * Return a 32-bit FNV-1a hash of the input string.
 */
export function fnv1a32(input: string): number {
  let hash = 0x811c9dc5; // offset basis for 32 bit hash

  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // FNV prime for 32 bit hash
  }

  return hash >>> 0;
}
