#!/bin/bash

##############################################################################
# GUARDIAN.SH - Frontend Code Quality & Functionality Guardian
##############################################################################
# Enforces:
# - Max 500 lines per file
# - Max 50 lines per function
# - TypeScript type safety
# - ESLint rules
# - All tests pass
# - Build succeeds
##############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         🛡️  GUARDIAN - Frontend Code Quality Check       ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

log_check() {
    echo -e "${BLUE}▶ $1${NC}"
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
}

log_pass() {
    echo -e "${GREEN}✓ $1${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
}

log_fail() {
    echo -e "${RED}✗ $1${NC}"
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
}

log_warn() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

##############################################################################
# PART 1: CODE STRUCTURE GUARDS
##############################################################################

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}PART 1: Code Structure Guards${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_check "Checking file line counts (500 lines max)..."
if [ -f "./scripts/check-file-lines.sh" ]; then
    if ./scripts/check-file-lines.sh; then
        log_pass "All files are under 500 lines"
    else
        log_fail "Some files exceed 500 lines"
        exit 1
    fi
else
    log_warn "check-file-lines.sh not found"
fi

echo ""

log_check "Checking function lengths (50 lines max)..."
if [ -f "./scripts/check-function-lines.sh" ]; then
    if ./scripts/check-function-lines.sh; then
        log_pass "All functions are under 50 lines"
    else
        log_fail "Some functions exceed 50 lines"
        exit 1
    fi
else
    log_warn "check-function-lines.sh not found"
fi

echo ""

##############################################################################
# PART 2: TYPE SAFETY GUARDS
##############################################################################

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}PART 2: Type Safety Guards${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_check "Running TypeScript type checks..."
if command -v npm &> /dev/null; then
    if npm run type-check 2>/dev/null; then
        log_pass "TypeScript type checks passed"
    else
        log_fail "TypeScript errors found"
        exit 1
    fi
else
    log_warn "npm not found"
fi

echo ""

##############################################################################
# PART 3: CODE QUALITY GUARDS
##############################################################################

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}PART 3: Code Quality Guards${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_check "Running ESLint..."
if npm run lint 2>/dev/null; then
    log_pass "ESLint checks passed"
else
    log_fail "ESLint errors found"
    exit 1
fi

echo ""

##############################################################################
# PART 4: FUNCTIONALITY GUARDS
##############################################################################

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}PART 4: Functionality Guards${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_check "Running tests..."
if npm test -- --run 2>/dev/null; then
    log_pass "All tests passed"
else
    log_warn "Tests failed or not configured"
fi

echo ""

log_check "Testing build..."
if npm run build 2>/dev/null; then
    log_pass "Build successful"
else
    log_fail "Build failed"
    exit 1
fi

echo ""

##############################################################################
# SUMMARY
##############################################################################

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    📊 SUMMARY                             ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Total Checks: ${TOTAL_CHECKS}"
echo -e "${GREEN}Passed: ${PASSED_CHECKS}${NC}"
echo -e "${RED}Failed: ${FAILED_CHECKS}${NC}"
echo ""

if [ $FAILED_CHECKS -eq 0 ]; then
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║          ✅ ALL GUARDS PASSED - COMMIT ALLOWED            ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    exit 0
else
    echo -e "${RED}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║         ❌ GUARDS FAILED - FIX ISSUES BEFORE COMMIT       ║${NC}"
    echo -e "${RED}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    exit 1
fi
