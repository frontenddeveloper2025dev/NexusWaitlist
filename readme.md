# Overview

This is a full-stack web application built with React, Express.js, and PostgreSQL. The application appears to be a waitlist landing page or early-stage product signup system. It features a modern UI built with shadcn/ui components, TailwindCSS for styling, and a robust backend API for managing waitlist registrations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: TailwindCSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas shared between frontend and backend
- **Error Handling**: Centralized error middleware with structured error responses
- **Request Logging**: Custom middleware for API request logging

## Data Storage
- **Database**: PostgreSQL with Neon serverless connection
- **Schema**: Two main tables - users and waitlist_registrations
- **Migration**: Drizzle Kit for database migrations
- **Connection Pooling**: Uses Neon's serverless connection pooling

## Key Features
- **Waitlist Registration**: Full signup flow with email validation and duplicate prevention
- **Form Validation**: Client-side and server-side validation using Zod schemas
- **Toast Notifications**: User feedback system for actions
- **Responsive Design**: Mobile-first responsive layout
- **Type Safety**: End-to-end TypeScript with shared schemas

## Development Setup
- **Monorepo Structure**: Client and server code in same repository with shared schemas
- **Hot Reload**: Vite dev server with Express backend proxy
- **Path Aliases**: Configured for clean imports (@/, @shared/)
- **Build Process**: Vite builds client, esbuild bundles server

# External Dependencies

## Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Connection**: Uses @neondatabase/serverless with WebSocket support

## UI/UX Libraries
- **Radix UI**: Headless UI components for accessibility
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component system

## Development Tools
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state and validation
- **Zod**: Schema validation library
- **date-fns**: Date manipulation utilities

## Build and Development
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript bundler for server
- **tsx**: TypeScript execution for development
- **Replit Integration**: Custom plugins for Replit environment

## Form and Data Handling
- **Drizzle ORM**: Type-safe database operations
- **Drizzle Kit**: Database migration tool
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

The application follows modern web development practices with a focus on type safety, developer experience, and user interface quality. The architecture supports easy scaling and maintenance through its modular design and comprehensive tooling setup.