This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Naming Structure

The project follows this Routing naming structure:

- `src/app` - Main routing app structure following Next.js app directory convention
- `src/components` - Reusable UI components
- `src/lib` - Utility functions and shared logic
- `src/hooks` - Reusable Hooks 
- `src/store` - State Management UI 
- `src/types` - Reusable types and objects
- `src/service` - layer to handle business logics
- `src/repository` - layer to handle data transfer
- `src/utils` - Reusable util functions
- `public` - Static assets like images and fonts

Each route in the `src/app` directory uses the following structure:
- `page.tsx` - The main UI component for the route
- `layout.tsx` - Layout components that wrap pages

## Tech Stack

This project uses the following technologies:

- **Next.js 15** - React framework with server-side rendering and routing
- **TypeScript** - For type safety and better developer experience
- **Shadcn UI** - A collection of reusable UI components built with Radix UI and Tailwind CSS
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Zustand** - Lightweight state management solution
- **Yup** - Schema validation library for form validation
- **Axios** - Promise-based HTTP client for API requests
- **ESLint** - For code linting
- **Prettier** - For code formatting

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
