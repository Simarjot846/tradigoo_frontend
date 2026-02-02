# Tradigoo Frontend

This is the **Frontend-Only** version of the Tradigoo platform.

## What's Included
- **UI Components**: All React/Next.js components.
- **Pages**: Frontend routes (Dashboard, Marketplace, etc.).
- **Styles**: Tailwind CSS and styling utilities.
- **Frontend Logic**: State management, hooks, and client-side utilities.

## What was Removed (Backend)
- `app/api/`: All Next.js API Routes were removed.
- `supabase/`: Database configurations and migrations were removed.
- Backend Utilities: Server-side database clients, payment processing, and fraud detection logic were removed.

## Purpose
This directory is intended for frontend development. The backend implementation (API, DB) has been stripped out to allow for a fresh backend implementation.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server (note: some features relying on the backend will not work):
   ```bash
   npm run dev
   ```
