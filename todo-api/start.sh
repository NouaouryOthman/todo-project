
#!/bin/sh
set -e

# Run migrations
echo "Running migrations..."
npm run migration:run

# Start the app
echo "Starting backend..."
npm run dev
