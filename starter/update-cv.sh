#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f content/cv.docx ]; then
  echo "Missing content/cv.docx"
  echo "Place your Word CV at content/cv.docx, or run:"
  echo "  pnpm tsx scripts/generate-sample-cv.ts"
  exit 1
fi

pnpm tsx scripts/parse-cv.ts
echo ""
echo "CV data updated. Review src/data/ and public/cv/ and commit changes."
