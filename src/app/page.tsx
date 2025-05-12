'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  const features = [
    { 
      title: 'Modern Design', 
      description: 'Sleek and intuitive user interfaces that work on any device.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      title: 'Responsive Layout', 
      description: 'Optimized for all screen sizes from mobile to desktop.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
          <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      title: 'Dark Mode Support', 
      description: 'Seamlessly switch between light and dark themes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      title: 'Consistent Color System', 
      description: 'Beautiful, consistent colors that look great in any mode.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      quote: "The color system in this application is simply amazing! The consistent colors look perfect in any setting.",
      author: "Alex Chen",
      role: "UX Designer"
    },
    {
      quote: "Dark mode implementation is flawless and easy on the eyes. I use it all day without eye strain.",
      author: "Sarah Johnson",
      role: "Developer"
    },
    {
      quote: "The responsive design is top-notch. Works perfectly on my phone, tablet, and desktop.",
      author: "Michael Rodriguez",
      role: "Product Manager"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl">
              Beautiful, responsive designs with <span className="text-primary">adaptive colors</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Explore our modern web application with seamless dark mode support and beautiful color system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Get Started
              </Link>
              <Link href="#features" className="px-6 py-3 bg-accent/10 text-accent-foreground hover:bg-accent/20 rounded-lg font-medium transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Discover what makes our design system special</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-background p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 text-secondary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color Showcase Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Color System</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Explore our cohesive color system that works beautifully in both light and dark modes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="h-40 bg-primary flex items-center justify-center text-primary-foreground font-semibold">Primary</div>
                <div className="p-4 bg-background">
                  <p className="font-medium">Primary Color</p>
                  <p className="text-sm text-muted-foreground">Used for primary actions and emphasis</p>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="h-40 bg-secondary flex items-center justify-center text-secondary-foreground font-semibold">Secondary</div>
                <div className="p-4 bg-background">
                  <p className="font-medium">Secondary Color</p>
                  <p className="text-sm text-muted-foreground">Used for secondary actions and components</p>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="h-40 bg-accent flex items-center justify-center text-accent-foreground font-semibold">Accent</div>
                <div className="p-4 bg-background">
                  <p className="font-medium">Accent Color</p>
                  <p className="text-sm text-muted-foreground">Used for highlighting and accenting elements</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="h-20 bg-success flex items-center justify-center text-white font-semibold">Success</div>
                <div className="p-4 bg-background">
                  <p className="font-medium">Success Indicators</p>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="h-20 bg-warning flex items-center justify-center text-black font-semibold">Warning</div>
                <div className="p-4 bg-background">
                  <p className="font-medium">Warning Indicators</p>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <div className="h-20 bg-destructive flex items-center justify-center text-destructive-foreground font-semibold">Error</div>
                <div className="p-4 bg-background">
                  <p className="font-medium">Error Indicators</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What People Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Don&apos;t just take our word for it</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-background p-6 rounded-xl shadow-sm border border-border">
                  <svg className="h-8 w-8 text-primary mb-4 opacity-60" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-card-foreground mb-4">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-primary/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[30rem] h-[30rem] rounded-full bg-primary/5 blur-3xl"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to get started?</h2>
              <p className="text-muted-foreground mb-8">Join thousands of users who are already enjoying our beautiful, responsive designs.</p>
              <Link href="/register" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Create an Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Jalan-Heula</h3>
              <p className="text-muted-foreground">Beautiful, responsive designs with consistent colors.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-muted-foreground hover:text-primary">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Jalan-Heula. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
