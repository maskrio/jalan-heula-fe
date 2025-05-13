"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-lg">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition-colors"
            >
              Go to Homepage
            </Link>
            <Link 
              href="/articles"
              className="px-6 py-3 bg-accent text-accent-foreground rounded-md shadow hover:bg-accent/90 transition-colors"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}