"use client";

import { useState } from "react";
import * as yup from "yup";

interface UseFormValidationProps<T> {
	initialValues: T;
	validationSchema: yup.Schema<T>;
	onSubmit: (values: T) => Promise<void> | void;
}

interface FormState<T> {
	values: T;
	errors: Partial<Record<keyof T, string>>;
	touched: Partial<Record<keyof T, boolean>>;
}

export function useFormValidation<T extends Record<string, unknown>>({
	initialValues,
	validationSchema,
	onSubmit,
}: UseFormValidationProps<T>) {
	const [formState, setFormState] = useState<FormState<T>>({
		values: initialValues,
		errors: {},
		touched: {},
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormState((prev) => ({
			...prev,
			values: { ...prev.values, [name]: value },
			touched: { ...prev.touched, [name]: true },
		}));

		// Clear error when user types
		if (formState.errors[name as keyof T]) {
			setFormState((prev) => ({
				...prev,
				errors: {
					...prev.errors,
					[name]: undefined,
				},
			}));
		}
	};	const validateField = async (name: keyof T) => {
		try {
			// Use validateAt which handles paths safely
			await validationSchema.validateAt(
				name as string,
				formState.values
			);

			// Clear error if validation passes
			setFormState((prev) => ({
				...prev,
				errors: {
					...prev.errors,
					[name]: undefined,
				},
			}));

			return true;
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				// Set error message
				setFormState((prev) => ({
					...prev,
					errors: {
						...prev.errors,
						[name]: error.message,
					},
				}));
			}
			return false;
		}
	};

	const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
		const { name } = e.target;
		await validateField(name as keyof T);
	};
	const validateForm = async (): Promise<boolean> => {
		try {
			const validatedValues = await validationSchema.validate(
				formState.values,
				{
					abortEarly: false,
				}
			);

			// Update values with validated values
			setFormState((prev) => ({
				...prev,
				values: validatedValues as T,
				errors: {},
			}));

			return true;
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				// Transform Yup error to our error format
				const errors: Partial<Record<keyof T, string>> = {};
				error.inner.forEach((err) => {
					if (err.path) {
						errors[err.path as keyof T] = err.message;
					}
				});

				setFormState((prev) => ({
					...prev,
					errors,
				}));
			}
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const isValid = await validateForm();

		if (isValid) {
			try {
				await onSubmit(formState.values);
			} catch (error) {
				console.error("Form submission error:", error);
			}
		}

		setIsSubmitting(false);
	};

	const resetForm = () => {
		setFormState({
			values: initialValues,
			errors: {},
			touched: {},
		});
	};

	return {
		values: formState.values,
		errors: formState.errors,
		touched: formState.touched,
		handleChange,
		handleBlur,
		handleSubmit,
		resetForm,
		isSubmitting,
		setValues: (values: Partial<T>) => {
			setFormState((prev) => ({
				...prev,
				values: { ...prev.values, ...values },
			}));
		},
	};
}
