"use client";

import { useAuth } from "@/hooks";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}
	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div>
			<Navbar />
			<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<div className="bg-card shadow rounded-lg overflow-hidden">
						<div className="px-4 py-5 sm:px-6 bg-primary/10">
							<h1 className="text-2xl font-bold text-foreground">
								Profile
							</h1>
							<p className="mt-1 text-sm text-muted-foreground">
								Your personal information and account settings
							</p>
						</div>
						<div className="border-t border-border px-4 py-5 sm:p-6">
							<div className="flex items-center space-x-4 mb-6">
								<div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
									{user.username.charAt(0).toUpperCase()}
								</div>
								<div>
									<h2 className="text-xl font-semibold text-foreground">
										{user.username}
									</h2>
									<p className="text-muted-foreground">
										{user.email}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div className="bg-background p-4 rounded-md border border-border">
									<h3 className="text-lg font-medium text-foreground mb-2">
										Account Information
									</h3>
									<dl className="space-y-2">
										<div className="flex justify-between">
											<dt className="text-sm text-muted-foreground">
												User ID
											</dt>
											<dd className="text-sm text-foreground">
												{user.id}
											</dd>
										</div>
										<div className="flex justify-between">
											<dt className="text-sm text-muted-foreground">
												Username
											</dt>
											<dd className="text-sm text-foreground">
												{user.username}
											</dd>
										</div>
										<div className="flex justify-between">
											<dt className="text-sm text-muted-foreground">
												Email
											</dt>
											<dd className="text-sm text-foreground">
												{user.email}
											</dd>
										</div>
										<div className="flex justify-between">
											<dt className="text-sm text-muted-foreground">
												Account Created
											</dt>
											<dd className="text-sm text-foreground">
												{new Date(
													user.createdAt
												).toLocaleDateString()}
											</dd>
										</div>
									</dl>
								</div>

								<div className="bg-background p-4 rounded-md border border-border">
									<h3 className="text-lg font-medium text-foreground mb-2">
										Account Status
									</h3>
									<dl className="space-y-2">
										<div className="flex justify-between">
											<dt className="text-sm text-muted-foreground">
												Email Confirmed
											</dt>
											<dd className="text-sm text-foreground">
												{user.confirmed ? (
													<span className="text-success">
														Verified
													</span>
												) : (
													<span className="text-warning">
														Pending
													</span>
												)}
											</dd>
										</div>
										<div className="flex justify-between">
											<dt className="text-sm text-muted-foreground">
												Provider
											</dt>
											<dd className="text-sm text-foreground capitalize">
												{user.provider}
											</dd>
										</div>
										<div className="flex justify-between">
											<dt className="text-sm text-muted-foreground">
												Status
											</dt>
											<dd className="text-sm text-foreground">
												{user.blocked ? (
													<span className="text-destructive">
														Blocked
													</span>
												) : (
													<span className="text-success">
														Active
													</span>
												)}
											</dd>
										</div>
									</dl>
								</div>
							</div>

							<div className="mt-8 flex justify-end">
								<button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
									Edit Profile
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
