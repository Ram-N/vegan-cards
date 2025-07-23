#!/bin/bash
# Script to force a clean deployment to GitHub Pages

echo "Starting forced deployment process..."

# Build the project
echo "Building project..."
npm run build

# Force remove gh-pages branch locally
echo "Removing local gh-pages branch..."
git branch -D gh-pages 2>/dev/null || echo "No local gh-pages branch to delete"

# Create a new local gh-pages branch
echo "Creating new gh-pages branch..."
git checkout --orphan gh-pages

# Remove all files from the working directory
echo "Clearing working directory..."
git rm -rf --cached .
git rm -rf .

# Add the build directory
echo "Adding build directory..."
git add build/ -f

# Move build files to the root directory
echo "Moving files from build/ to root..."
find build -type f -print0 | xargs -0 -I{} mv {} .
rm -rf build/

# Add all the moved files
echo "Adding all files..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Force deploy: $(date)"

# Push to remote, overwriting the remote gh-pages branch
echo "Pushing to GitHub..."
git push origin gh-pages --force

# Return to the main branch
echo "Returning to main branch..."
git checkout main

echo "Forced deployment complete! Check your GitHub Pages site in a few minutes."