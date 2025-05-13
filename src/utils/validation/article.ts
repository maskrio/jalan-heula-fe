import * as yup from "yup";

// Article search/filter validation schema
export const articleFilterSchema = yup.object().shape({
	searchTerm: yup
		.string()
		.trim()
		.max(100, "Search term must be less than 100 characters"),
	category: yup.string().trim().nullable(),
	sortBy: yup
		.string()
		.oneOf(
			["latest", "oldest", "title_asc", "title_desc"],
			"Invalid sort option"
		)
		.default("latest"),
});

// Article creation form validation schema
export const articleCreateSchema = yup.object().shape({
	title: yup.string().required('Title is required').max(100, "Title must be less than 100 characters"),
	description: yup.string().required('Description is required').max(1000, "Description must be less than 1000 characters"),
	cover_image_url: yup.string().required('Cover image is required'),
	category: yup.number().required('Category is required'),
});
