"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
	const features = [
		{
			title: "Expert Travel Guides",
			description:
				"Comprehensive destination guides written by experienced travelers.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6"
				>
					<path
						fillRule="evenodd"
						d="M8 4.75A.75.75 0 018.75 4h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 018 4.75zm0 2.5A.75.75 0 018.75 7h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 018 7.25zm0 2.5A.75.75 0 018.75 9h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 018 9.75z"
					/>
					<path d="M11.5 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
					<path
						fillRule="evenodd"
						d="M2 13.5A8.5 8.5 0 0111.5 5a8.5 8.5 0 110 17 8.5 8.5 0 01-9.5-8.5zm8.5-10a.75.75 0 000 1.5h4.783C16.216 7.784 18 11.256 18 15.75c0 .337-.014.67-.042 1H16a.75.75 0 000 1.5h2.42a1 1 0 001-1h.013A10.004 10.004 0 0014.42 6H12v2.25c0 .414.336.75.75.75h1.5a.75.75 0 000-1.5h-.75V7z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			title: "Hidden Gems",
			description:
				"Discover off-the-beaten-path destinations that most tourists miss.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6"
				>
					<path
						fillRule="evenodd"
						d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			title: "Travel Tips & Tricks",
			description:
				"Expert advice to make your travel experience smooth and enjoyable.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6"
				>
					<path
						fillRule="evenodd"
						d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
						clipRule="evenodd"
					/>
					<path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
				</svg>
			),
		},
		{
			title: "Cultural Experiences",
			description:
				"Immerse yourself in local traditions and authentic cultural experiences.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6"
				>
					<path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
				</svg>
			),
		},
	];

	const testimonials = [
		{
			quote: "The travel guides on Jalan-Heula helped me discover amazing hidden spots in Bali that weren't in any other guidebook!",
			author: "Jessica Chen",
			role: "Adventure Traveler",
		},
		{
			quote: "Their packing tips saved me so much hassle on my European backpacking trip. I'll never travel without checking this site first.",
			author: "Mark Johnson",
			role: "Digital Nomad",
		},
		{
			quote: "The cultural insights in their Japan article series made my experience so much more authentic and meaningful.",
			author: "Sarah Rodriguez",
			role: "Cultural Explorer",
		},
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
							Discover the World with{" "}
							<span className="text-primary">Jalan-Heula</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
							Expert travel guides, hidden gems, and insider tips
							to create unforgettable adventures around the globe.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href="/articles"
								className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
							>
								Explore Destinations
							</Link>
							<Link
								href="#features"
								className="px-6 py-3 bg-accent/10 text-accent-foreground hover:bg-accent/20 rounded-lg font-medium transition-colors"
							>
								Travel Tips
							</Link>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-20 bg-card">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
								Explore Our Travel Expertise
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Everything you need for your next adventure
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{features.map((feature, index) => (
								<div
									key={index}
									className="bg-background p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
								>
									<div className="p-3 bg-primary/10 rounded-full w-fit mb-4 text-secondary">
										{feature.icon}
									</div>
									<h3 className="text-xl font-semibold mb-2">
										{feature.title}
									</h3>
									<p className="text-muted-foreground">
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Color Showcase Section */}
				<section className="py-20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								Top Destinations
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Popular places our travelers love to explore
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="rounded-xl overflow-hidden shadow-sm border border-border">
								<div className="h-40 bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-20 h-20 opacity-50"
									>
										<path
											fillRule="evenodd"
											d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="p-4 bg-background">
									<p className="font-medium">
										Bali, Indonesia
									</p>
									<p className="text-sm text-muted-foreground">
										Tropical paradise with stunning beaches
										and rich culture
									</p>
								</div>
							</div>

							<div className="rounded-xl overflow-hidden shadow-sm border border-border">
								<div className="h-40 bg-secondary/10 flex items-center justify-center text-secondary overflow-hidden">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-20 h-20 opacity-50"
									>
										<path
											fillRule="evenodd"
											d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="p-4 bg-background">
									<p className="font-medium">Kyoto, Japan</p>
									<p className="text-sm text-muted-foreground">
										Ancient temples, traditional gardens and
										historic districts
									</p>
								</div>
							</div>

							<div className="rounded-xl overflow-hidden shadow-sm border border-border">
								<div className="h-40 bg-accent/10 flex items-center justify-center text-accent overflow-hidden">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-20 h-20 opacity-50"
									>
										<path
											fillRule="evenodd"
											d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="p-4 bg-background">
									<p className="font-medium">
										Santorini, Greece
									</p>
									<p className="text-sm text-muted-foreground">
										Stunning white buildings, blue domes,
										and breathtaking sunsets
									</p>
								</div>
							</div>
						</div>
          </div>
				</section>

				{/* Articles Preview Section */}
				<section className="py-20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								Travel Inspiration
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Explore our collection of exclusive travel
								content
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
							<div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
								<div className="h-40 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-16 w-16 text-primary opacity-60"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1}
											d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Destination Guides
								</h3>
								<p className="text-muted-foreground mb-4">
									Comprehensive guides for the world's most
									breathtaking destinations.
								</p>
								<Link
									href="/articles"
									className="text-primary hover:text-primary/80 font-medium"
								>
									Read guides →
								</Link>
							</div>

							<div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
								<div className="h-40 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-16 w-16 text-primary opacity-60"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1}
											d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Hidden Gems
								</h3>
								<p className="text-muted-foreground mb-4">
									Discover off-the-beaten-path locations that
									most tourists miss.
								</p>
								<Link
									href="/articles"
									className="text-primary hover:text-primary/80 font-medium"
								>
									Explore hidden gems →
								</Link>
							</div>

							<div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
								<div className="h-40 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-16 w-16 text-primary opacity-60"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1}
											d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Travel Tips
								</h3>
								<p className="text-muted-foreground mb-4">
									Expert advice to make your travel experience
									smooth and enjoyable.
								</p>
								<Link
									href="/articles"
									className="text-primary hover:text-primary/80 font-medium"
								>
									Get travel tips →
								</Link>
							</div>
						</div>

						<div className="text-center">
							<Link
								href="/articles"
								className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
							>
								Explore All Travel Articles
							</Link>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className="py-20 bg-muted/30">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								What People Say
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Don&apos;t just take our word for it
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{testimonials.map((testimonial, index) => (
								<div
									key={index}
									className="bg-background p-6 rounded-xl shadow-sm border border-border"
								>
									<svg
										className="h-8 w-8 text-primary mb-4 opacity-60"
										fill="currentColor"
										viewBox="0 0 32 32"
									>
										<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
									</svg>
									<p className="text-card-foreground mb-4">
										{testimonial.quote}
									</p>
									<div>
										<p className="font-semibold">
											{testimonial.author}
										</p>
										<p className="text-sm text-muted-foreground">
											{testimonial.role}
										</p>
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
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
								Ready for your next adventure?
							</h2>
							<p className="text-muted-foreground mb-8">
								Join thousands of travelers who are exploring
								the world with our expert guides and insider
								tips.
							</p>
							<Link
								href="/register"
								className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
							>
								Start Your Journey
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
							<h3 className="text-lg font-semibold mb-4">
								Jalan-Heula
							</h3>
							<p className="text-muted-foreground">
								Your ultimate resource for travel inspiration,
								guides and tips.
							</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Explore
							</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/"
										className="text-muted-foreground hover:text-primary"
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href="/articles"
										className="text-muted-foreground hover:text-primary"
									>
										Travel Guides
									</Link>
								</li>
								<li>
									<Link
										href="/articles"
										className="text-muted-foreground hover:text-primary"
									>
										Destinations
									</Link>
								</li>
								<li>
									<Link
										href="/articles"
										className="text-muted-foreground hover:text-primary"
									>
										Travel Tips
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Legal
							</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/privacy"
										className="text-muted-foreground hover:text-primary"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="text-muted-foreground hover:text-primary"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="/cookies"
										className="text-muted-foreground hover:text-primary"
									>
										Cookies
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Connect
							</h3>
							<div className="flex space-x-4">
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-6 h-6"
									>
										<path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
										<path
											fillRule="evenodd"
											d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-6 h-6"
									>
										<path
											fillRule="evenodd"
											d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
								<Link
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-6 h-6"
									>
										<path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
										<path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
									</svg>
								</Link>
							</div>
							<p className="mt-4 text-sm text-muted-foreground">
								Subscribe to our newsletter for travel
								inspirations, tips and exclusive offers!
							</p>
						</div>
					</div>

					<div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
						<p>
							&copy; {new Date().getFullYear()} Jalan-Heula Travel
							Blog. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</>
	);
}
