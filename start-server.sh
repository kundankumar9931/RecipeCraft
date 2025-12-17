#!/bin/bash
# Startup script for Recipe Planner Server

echo "Starting Recipe Planner Backend Server..."
echo "=========================================="

# Navigate to server directory
cd "$(dirname "$0")/server"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Show environment info
echo "Environment Variables:"
echo "  PORT: ${PORT:-5000}"
echo "  NODE_ENV: ${NODE_ENV:-development}"
echo "  MONGODB_URI: ${MONGODB_URI:-mongodb://localhost:27017/recipe-planner}"
echo ""

# Start server
echo "Starting server..."
npm run dev

