# FitLife Blog

## Overview

FitLife Blog is a full-stack fitness web application focused on strength training and exercise guidance. The platform provides users with comprehensive exercise libraries, detailed workout guides, and informative blog content. Built with modern web technologies, it features a React frontend with shadcn/ui components, an Express.js backend API, and PostgreSQL database integration through Drizzle ORM.

The application serves as a content management and delivery platform for fitness enthusiasts, offering structured exercise data, blog articles, and equipment recommendations with rich media content and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Single-page application using React 18 with TypeScript for type safety
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build System**: Vite for fast development and optimized production builds

### Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript support
- **Route Structure**: Modular routing system with dedicated endpoints for blog posts, exercises, and equipment
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development Tools**: Hot module replacement and development middleware integration

### Data Layer
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Definition**: Type-safe database schemas with Zod validation
- **Migration System**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL integration

### API Design
The REST API follows a resource-based structure:
- `/api/blog-posts` - Blog content management
- `/api/exercises` - Exercise library with category filtering
- `/api/equipment` - Equipment recommendations
- Slug-based routing for SEO-friendly URLs
- Query parameter support for filtering and categorization

### Development Environment
- **Development Server**: Integrated Vite dev server with Express backend
- **Hot Reloading**: Full-stack hot module replacement for rapid development
- **TypeScript**: Strict type checking across client, server, and shared modules
- **Path Resolution**: Configured module aliases for clean imports

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with schema validation
- **@tanstack/react-query**: Server state management and data fetching
- **wouter**: Lightweight client-side routing

### UI and Styling
- **@radix-ui/***: Complete suite of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library for consistent iconography

### Development Tools
- **vite**: Modern build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Database and Validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **connect-pg-simple**: PostgreSQL session store for Express
- **zod**: Schema validation and type inference

The application is designed for deployment on Replit with integrated development tools and can be easily extended with additional content types and features.