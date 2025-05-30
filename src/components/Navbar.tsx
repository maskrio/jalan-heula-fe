"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";

export default function Navbar() {
	const { theme, setTheme } = useTheme();
	const { user, isAuthenticated, logout } = useAuth();
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

	// Check if the current path matches the link
	const isActive = (path: string) => {
		if (path === "/") {
			return pathname === path;
		}
		return pathname?.startsWith(path);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleProfileMenu = () => {
		setIsProfileMenuOpen(!isProfileMenuOpen);
	};

	return (
		<nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border shadow-sm font-modern">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
				<div className="flex justify-between items-center h-16">
					{/* Logo - visible on all screen sizes */}
					<div className="flex-shrink-0 flex items-center">
						<Link
							href="/"
							className="text-xl font-bold text-primary"
						>
							Jalan-Heula
						</Link>
					</div>

					{/* Desktop navigation links */}
					<div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
						<Link
							href="/"
							className={`inline-flex items-center px-1 pt-1 border-b-2 text-m font-medium ${
								isActive("/")
									? "border-primary text-primary"
									: "border-transparent hover:border-accent hover:text-accent"
							}`}
						>
							Home
						</Link>
						<Link
							href="/articles"
							className={`inline-flex items-center px-1 pt-1 border-b-2 text-m font-medium ${
								isActive("/articles")
									? "border-primary text-primary"
									: "border-transparent hover:border-accent hover:text-accent"
							}`}
						>
							Articles
						</Link>
						<Link
							href="/manage-categories"
							className={`inline-flex items-center px-1 pt-1 border-b-2 text-m font-medium ${
								isActive("/manage-categories")
									? "border-primary text-primary"
									: "border-transparent hover:border-accent hover:text-accent"
							}`}
						>
							Manage Categories
						</Link>
					</div>

					{/* Desktop right side controls */}
					<div className="hidden sm:flex sm:items-center sm:space-x-4">
						{mounted && (
							<button
								onClick={() =>
									setTheme(
										theme === "dark" ? "light" : "dark"
									)
								}
								className="p-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary"
								aria-label="Toggle theme"
							>
								{theme === "dark" ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</button>
						)}

						{isAuthenticated ? (
							<div className="relative">
								<button
									onClick={toggleProfileMenu}
									className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								>
									<span className="sr-only">
										Open user menu
									</span>
									<div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
										{user?.username
											?.charAt(0)
											.toUpperCase() || "U"}
									</div>
								</button>
								{/* Profile dropdown */}
								{isProfileMenuOpen && (
									<div
										className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-card ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="user-menu"
									>
										<div className="px-4 py-2 text-sm text-foreground border-b border-border">
											Signed in as{" "}
											<span className="font-semibold">
												{user?.username}
											</span>
										</div>
										<Link
											href="/profile"
											className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10"
											role="menuitem"
										>
											Your Profile
										</Link>
										<button
											onClick={logout}
											className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10"
											role="menuitem"
										>
											Sign out
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									href="/login"
									className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-primary hover:bg-primary/10"
								>
									Sign In
								</Link>
								<Link
									href="/register"
									className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
								>
									Sign Up
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="flex items-center sm:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-accent-foreground hover:bg-accent/20 focus:outline-none"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{!isMenuOpen ? (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu, show/hide based on menu state */}
			<div className={isMenuOpen ? "block sm:hidden" : "hidden"}>
				<div className="pt-2 pb-3 space-y-1">
					<Link
						href="/"
						className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
							isActive("/")
								? "bg-primary/10 border-primary text-primary"
								: "border-transparent hover:bg-accent/10 hover:border-accent hover:text-accent"
						}`}
					>
						Home
					</Link>
					<Link
						href="/articles"
						className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
							isActive("/articles")
								? "bg-primary/10 border-primary text-primary"
								: "border-transparent hover:bg-accent/10 hover:border-accent hover:text-accent"
						}`}
					>
						Articles
					</Link>
					<Link
						href="/manage-categories"
						className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 ${
							isActive("/manage-categories")
								? "bg-primary/10 border-primary text-primary"
								: "border-transparent hover:bg-accent/10 hover:border-accent hover:text-accent"
						}`}
					>
						Manage Categories
					</Link>
				</div>
				<div className="pt-4 pb-3 border-t border-border">
					<div className="flex items-center justify-between px-4">
						<div className="flex items-center">
							{mounted && (
								<button
									onClick={() =>
										setTheme(
											theme === "dark" ? "light" : "dark"
										)
									}
									className="p-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary"
									aria-label="Toggle theme"
								>
									{theme === "dark" ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-5 h-5"
										>
											<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-5 h-5"
										>
											<path
												fillRule="evenodd"
												d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
												clipRule="evenodd"
											/>
										</svg>
									)}
								</button>
							)}
						</div>

						{isAuthenticated ? (
							<div className="flex items-center">
								<div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
									{user?.username?.charAt(0).toUpperCase() ||
										"U"}
								</div>
								<button
									onClick={logout}
									className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20"
								>
									Sign out
								</button>
							</div>
						) : (
							<div className="flex space-x-2">
								<Link
									href="/login"
									className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-primary hover:bg-primary/10"
								>
									Sign In
								</Link>
								<Link
									href="/register"
									className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
								>
									Sign Up
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
