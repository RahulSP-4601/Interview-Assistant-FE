#!/bin/bash

MAX_LINES=500
VIOLATIONS=0

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' | grep -v 'node_modules' | grep -v 'dist' | grep -v 'build' | grep -v '.min.')

if [ -z "$FILES" ]; then
    exit 0
fi

for file in $FILES; do
    if [ -f "$file" ]; then
        line_count=$(wc -l < "$file" | tr -d ' ')
        if [ "$line_count" -gt "$MAX_LINES" ]; then
            echo -e "${RED}✗ $file: $line_count lines (exceeds $MAX_LINES)${NC}"
            VIOLATIONS=$((VIOLATIONS + 1))
        fi
    fi
done

if [ $VIOLATIONS -gt 0 ]; then
    echo -e "${RED}Found $VIOLATIONS file(s) exceeding $MAX_LINES lines${NC}"
    exit 1
fi

exit 0
