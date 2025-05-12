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
