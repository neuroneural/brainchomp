#!/usr/bin/env bash
# Copy a built brainchomp-lib (https://github.com/neuroneural/brainchomp-lib)
# into this app until the npm package is published under its final name.
#   vendor/brainchomp/index.js   the API, bundled by Vite with the app
#   public/brainchomp/           worker.js and the wasm modules, which the API
#                                loads by URL and must stay unhashed and adjacent
# Usage: scripts/update-brainchomp-lib.sh [path/to/brainchomp-lib]
# Build the library first: (cd brainchomp-lib/js && npm run build)
set -euo pipefail
lib="${1:-../brainchomp-lib}"
dist="$lib/js/dist"
here="$(cd "$(dirname "$0")/.." && pwd)"
[ -f "$dist/index.js" ] || { echo "no build at $dist; run 'npm run build' in $lib/js" >&2; exit 1; }
rm -rf "$here/vendor/brainchomp" "$here/public/brainchomp"
mkdir -p "$here/vendor/brainchomp" "$here/public/brainchomp"
cp "$dist/index.js" "$dist"/*.d.ts "$here/vendor/brainchomp/"
cp "$dist/worker.js" "$dist"/brainchomp*.js "$dist"/brainchomp*.wasm "$here/public/brainchomp/"
cp "$lib/LICENSE" "$lib/THIRD_PARTY_NOTICES.md" "$here/vendor/brainchomp/"
commit="$(git -C "$lib" rev-parse HEAD)"
dirty="$(git -C "$lib" status --porcelain -- js src | head -1)"
printf 'brainchomp-lib %s%s\nversion %s\n' "$commit" "${dirty:+ (with uncommitted changes)}" \
  "$(node -p "require('$lib/js/package.json').version")" > "$here/vendor/brainchomp/VERSION"
cat "$here/vendor/brainchomp/VERSION"
