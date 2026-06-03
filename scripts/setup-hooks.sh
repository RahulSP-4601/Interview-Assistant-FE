#!/bin/bash

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up Guardian hooks for Frontend...${NC}"
echo ""

if [ ! -d ".git" ]; then
    echo "Error: Not in a Git repository root"
    exit 1
fi

mkdir -p .git/hooks
mkdir -p .git-hooks

# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
./guardian.sh
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo ""
    echo "❌ Commit blocked by Guardian"
    echo "Fix the issues above and try again"
    echo ""
    exit 1
fi

echo ""
echo "✅ Guardian checks passed - proceeding with commit"
echo ""
exit 0
EOF

chmod +x .git/hooks/pre-commit
chmod +x guardian.sh
chmod +x scripts/*.sh

echo -e "${GREEN}✓ Pre-commit hook installed${NC}"
echo ""

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           ✅ Guardian Setup Complete!                     ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Test it with: ./guardian.sh"
echo ""
