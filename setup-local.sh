#!/bin/bash
echo "Setting up 14th Ward App locally..."

# Copy environment variables
if [ ! -f .env.local ]; then
    echo "Creating .env.local from supabase-env.txt..."
    cp supabase-env.txt .env.local
    echo "✓ Environment variables set up"
else
    echo "✓ .env.local already exists"
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    npm install
    echo "✓ Dependencies installed"
else
    echo "✓ Dependencies already installed"
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push database schema to Supabase
echo "Setting up database tables..."
npx prisma db push

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
