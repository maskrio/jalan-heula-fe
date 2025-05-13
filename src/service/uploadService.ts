import { uploadRepository } from "@/repository/uploadRepository";
import { authService } from "./authService";

/**
 * Service for handling file uploads
 */
export const uploadService = {
	/**
	 * Upload a file to the server
	 * @param file File to upload
	 * @returns URL of the uploaded file
	 */
	async uploadFile(file: File): Promise<string> {
		try {
			const token = authService.getToken();
			if (!token) {
				throw new Error("No auth token available");
			}

			const response = await uploadRepository.uploadFile(file, token);

			if (response && response.length > 0) {
				// Return the main URL of the uploaded file
				return response[0].url;
			}

			throw new Error("Invalid response from server");
		} catch (error) {
			console.error("Failed to upload file:", error);
			throw error;
		}
	},
};
