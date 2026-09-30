const PATTERNS = [
  /Player\s+"([^"]+)"\s+killed\s+Player\s+"([^"]+)"\s+with\s+(.+?)\s+from\s+([\d.]+)\s*meters?/i,
  /Player\s+"([^"]+)"\s+killed\s+Player\s+"([^"]+)"\s+with\s+(.+)/i,
  /"([^"]+)"\s+\(.*?\)\s+killed\s+by\s+"([^"]+)"\s+\(.*?\)\s*with\s+(.+)/i,
];

function parseKillLine(line) {
  for (const re of PATTERNS) {
    const m = line.match(re);
    if (!m) continue;
    if (re.source.includes('killed by')) {
      return { victim: m[1], killer: m[2], weapon: (m[3] || 'Unknown').trim(), distance: null };
    }
    return {
      killer: m[1],
      victim: m[2],
      weapon: (m[3] || 'Unknown').trim(),
      distance: m[4] ? Math.round(parseFloat(m[4])) : null,
    };
  }
  return null;
}

module.exports = { parseKillLine };
