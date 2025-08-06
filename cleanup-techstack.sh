#!/bin/bash
# Script to remove unused TechStack components

echo "Removing unused TechStack components..."

# Remove TechStackToggle files
rm -f src/components/TechStack/TechStackToggle.js
rm -f src/components/TechStack/TechStackToggle.module.scss

# Remove TechStackShowcase files
rm -f src/components/TechStack/TechStackShowcase.js
rm -f src/components/TechStack/TechStackShowcase.module.scss

echo "✅ Cleanup completed! Removed:"
echo "  - TechStackToggle.js"
echo "  - TechStackToggle.module.scss"
echo "  - TechStackShowcase.js"
echo "  - TechStackShowcase.module.scss"
echo ""
echo "Only TechStackHoneycomb component remains."