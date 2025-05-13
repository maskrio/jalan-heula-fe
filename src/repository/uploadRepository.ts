import { categorizeError } from "@/utils/errorUtils";
import { getBaseUrl } from "@/utils/baseUrl";

/**
 * Interface for uploaded file response
 */
interface UploadResponseItem {
	id: number;
	name: string;
	url: string;
	mime: string;
	size: number;
	width: number;
	height: number;
	formats?: {
		large?: {
			url: string;
			width: number;
			height: number;
		};
		medium?: {
			url: string;
			width: number;
			height: number;
		};
		small?: {
			url: string;
			width: number;
			height: number;
		};
		thumbnail?: {
			url: string;
			width: number;
			height: number;
		};
	};
	// Additional fields as needed
}

/**
 * Repository for handling file uploads
 */
export const uploadRepository = {
	/**
	 * Upload a file to the server
	 * @param file File to upload
	 * @param token Auth token
	 * @returns Uploaded file data
	 */
	async uploadFile(file: File, token: string): Promise<UploadResponseItem[]> {
		try {
			// Create a new FormData instance
			const formData = new FormData();
			formData.append("files", file);

			// For file uploads, we'll use fetch directly to avoid the stream already read issue
			const url = `${getBaseUrl()}/upload`;

			const response = await fetch(url, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (!response.ok) {
				const errorText = await response.text();
				let errorMessage = "Failed to upload file";
				try {
					const errorData = JSON.parse(errorText);
					errorMessage = errorData.message || errorMessage;
				} catch {
					// If JSON parsing fails, use the default error message
				}
				throw new Error(errorMessage);
			}

			// Parse the response as JSON
			return await response.json();
		} catch (error) {
			throw categorizeError(error);
		}
	},
};
