// eslint-disable-next-line sonarjs/regex-complexity
const reFloat = /^-?(?:0|[1-9]\d*)(?:\.\d+(?:[eE][+-]?\d+)?|[eE][+-]?\d+)/;

/**
 * Replace JSON floats with strings containing a distinct marker that we can
 * later unpack into our own Float type.
 */
export function fudge_floats(json: string): string {
  const length = json.length;
  const chunks: string[] = [];

  let start = 0;
  let pos: number = 0;
  let ch: number;

  while (pos < length) {
    ch = json.charCodeAt(pos);

    if (ch === 34) {
      pos = scanString(json, pos + 1);
    } else if (ch === 45 || (ch >= 48 && ch <= 57)) {
      const match = reFloat.exec(json.slice(pos));
      if (match) {
        chunks.push(json.slice(start, pos));
        chunks.push(
          '"__float__' + json.slice(pos, pos + match[0].length) + '"',
        );
        pos += match[0].length;
        start = pos;
      } else {
        pos += 1;
      }
    } else {
      pos += 1;
    }
  }

  if (start !== pos) {
    chunks.push(json.slice(start, pos));
  }

  return chunks.join("");
}

function scanString(json: string, pos: number): number {
  const length = json.length;
  let ch: number;

  while (pos < length) {
    ch = json.charCodeAt(pos);

    switch (ch) {
      case 92: // \
        pos += 2;
        break;
      case 34: // "
        pos += 1;
        return pos;
      default:
        if (Number.isNaN(ch)) return pos;
        pos += 1;
    }
  }

  return pos;
}
