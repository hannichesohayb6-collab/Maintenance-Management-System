# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Backend (Laravel/PHP)
- Setup: `composer run setup`
- Development: `composer run dev` (runs server, queue, and vite concurrently)
- Test: `php artisan test` or `composer run test`
- Lint: `composer run lint` (via Laravel Pint)
- Lint Check: `composer run lint:check`

### Frontend (React/TypeScript)
- Development: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Format Check: `npm run format:check`
- Type Check: `npm run types:check`

## Architecture

This is a Laravel application using Inertia.js to bridge the backend and a React frontend.

### Backend Structure
- `app/`: Core application logic, including Controllers, Models, and Service providers.
- `routes/`: API and Web route definitions.
- `database/`: Migrations, seeders, and factories for the database schema.
- `config/`: Application configuration files.
- `tests/`: Test suite using Pest.

### Frontend Structure
- `resources/js/`: React source code, including components, pages, and Inertia integration.
- `vite.config.ts`: Vite configuration for bundling and asset management.
- `tsconfig.json`: TypeScript configuration.

### Key Technologies
- **Backend**: PHP 8.3+, Laravel 13, Pest (Testing)
- **Frontend**: React 19, Inertia.js, Tailwind CSS 4, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI, Lucide React
