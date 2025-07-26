#!/bin/bash

# Quick start development server
echo "Starting Fabián Miranda website development server..."
echo "========================================"

cd /Users/fabian/Documents/personal/fabianmiranda.com-decapcms-nextjs

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start development server
echo "Starting Next.js development server..."
echo "Your site will be available at http://localhost:3000"
echo ""
echo "Work Samples section has been updated with:"
echo "✓ Full-width images (no cropping)"
echo "✓ Lightblue color scheme (no magenta on hover)"
echo "✓ Consistent typography with existing design"
echo ""

npm run dev