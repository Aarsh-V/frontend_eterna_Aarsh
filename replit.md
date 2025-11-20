# Axiom Trade Pulse - Token Discovery Platform

## Overview

This is a pixel-perfect clone of the Axiom Trade Token Discovery Table, a real-time cryptocurrency token analytics platform. The application displays trending tokens across three categories (New Pairs, Final Stretch, Migrated) with live price updates, market metrics, and instant trading capabilities. Built with React, TypeScript, Express, and shadcn/ui components, it emphasizes information density, real-time data visualization, and a dark-themed trading interface optimized for rapid decision-making.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool and development server.

**Routing**: wouter for lightweight client-side routing with a single main route (Pulse page) and a 404 fallback.

**State Management**: Redux Toolkit (@reduxjs/toolkit) for global state management, handling:
- Active token category tab selection
- Table sorting configuration
- Selected token for modals
- Real-time price updates and flash animations
- Token-specific flash states (green/red price changes)

**Data Fetching**: TanStack Query (React Query) v5 for server state management with custom query functions, automatic caching, and WebSocket-driven cache updates for real-time price synchronization.

**UI Components**: shadcn/ui component library (Radix UI primitives) providing accessible, customizable components including Dialog, Tabs, Tooltip, Popover, Alert, Badge, Button, and Table primitives.

**Table Implementation**: TanStack Table v8 for advanced table features including column sorting, flexible cell rendering, and custom row components with flash animation support.

**Styling Approach**: Tailwind CSS with a custom dark theme configuration, CSS variables for theming, and custom animations for price flash effects (green/red backgrounds fading over 500ms).

**Design System**: Follows crypto trading platform aesthetics with:
- Dark background (#0a0e14) and surface colors (#141922)
- Inter font for UI, JetBrains Mono for monospace data
- Color-coded price changes (green #10b981, red #ef4444)
- Information-dense layouts with consistent spacing

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js, serving both API endpoints and static frontend assets.

**API Structure**: RESTful endpoints with two main routes:
- `GET /api/tokens/:category` - Retrieves all tokens for a specific category (new_pairs, final_stretch, migrated)
- `GET /api/tokens/:category/:id` - Retrieves a single token by ID

**Real-time Updates**: WebSocket server (ws library) mounted at `/ws` path, broadcasting simulated price updates every 2 seconds to all connected clients with random price fluctuations.

**Data Storage**: In-memory storage implementation (MemStorage class) with interface-based design (IStorage) allowing future database integration. Generates mock token data with realistic crypto metrics including market cap, liquidity, volume, holder statistics, and risk levels.

**Development Setup**: Vite middleware integration for HMR during development, with custom logging middleware tracking API request timing and response data.

### Data Schema & Validation

**Schema Definition**: Drizzle ORM schema with PostgreSQL dialect defining the tokens table structure with fields for symbol, name, contract address, pricing data, holder metrics, bonding curve progress, risk level, and category.

**Validation**: Zod schemas for runtime validation of:
- Token category enum (new_pairs, final_stretch, migrated)
- Price update objects (tokenId, price, priceChange24h, timestamp)
- Insert token schema generated from Drizzle schema

**Database Configuration**: Drizzle Kit configured for PostgreSQL with migrations output to `./migrations` directory, though currently using in-memory storage.

### Key Features & Interactions

**Real-time Price Updates**: WebSocket connection auto-reconnects on failure, dispatches Redux actions for price updates, and triggers visual flash animations (green for increases, red for decreases) that automatically clear after 500ms.

**Token Details Modal**: Displays comprehensive token information including contract address (copyable), risk indicators, holder distribution, transaction metrics, and bonding curve progress (when applicable).

**Quick Buy Modal**: Simulated trading interface with SOL amount input, slippage configuration, risk warnings, and toast notifications for trade execution.

**Sorting**: Client-side column sorting with visual indicators (ArrowUp/ArrowDown icons) and persistent sort state in Redux.

**Loading States**: Skeleton loaders with shimmer animations during initial data fetch, showing 10 placeholder rows matching the table structure.

**Error Handling**: React Error Boundary component catching rendering errors with user-friendly error display and reset functionality.

### Responsive Design

Mobile-first approach with breakpoints, responsive tab navigation, and adaptive table layouts. Uses custom `useIsMobile` hook for device detection based on 768px breakpoint.

## External Dependencies

### Third-Party UI Libraries

- **Radix UI**: Unstyled, accessible component primitives (@radix-ui/react-*) for Dialog, Tabs, Tooltip, Popover, Dropdown, and other interactive components
- **shadcn/ui**: Component library built on Radix UI with Tailwind styling, configured via components.json
- **Lucide React**: Icon library providing consistent iconography (ArrowUp, ArrowDown, Zap, Copy, AlertCircle, etc.)

### State & Data Management

- **@reduxjs/toolkit**: Redux state management with simplified API
- **@tanstack/react-query**: Server state management and caching
- **@tanstack/react-table**: Headless table library for complex data tables
- **react-hook-form**: Form state management (imported but not extensively used)
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime schema validation

### Styling & Utilities

- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Component variant styling
- **clsx** & **tailwind-merge**: Conditional className utilities
- **date-fns**: Date formatting and manipulation

### Backend & Database

- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver (configured but not actively used with current in-memory storage)
- **drizzle-kit**: Database migration tool

### WebSocket & Real-time

- **ws**: WebSocket server implementation for real-time price updates

### Development Tools

- **Vite**: Frontend build tool and dev server with HMR
- **@vitejs/plugin-react**: React plugin for Vite
- **@replit/vite-plugin-***: Replit-specific development plugins (runtime error modal, cartographer, dev banner)
- **esbuild**: JavaScript bundler for server-side code
- **tsx**: TypeScript execution for development server

### Routing

- **wouter**: Lightweight routing library (~1.2KB) for client-side navigation

### Session Management

- **connect-pg-simple**: PostgreSQL session store for Express sessions (installed but not actively configured)