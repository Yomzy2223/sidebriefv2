import { FormInput } from "@/components/form/constants";
import { z } from "zod";

export const useDynamic = ({
	isLoading = false,
	subForms,
}: {
	isLoading?: boolean;
	subForms?: FormInput[];
}) => {
	// generate a zod schema based on the subforms data
	const schema =
		isLoading || subForms === undefined
			? z.object({})
			: z.object(
					Object.fromEntries(
						subForms.map((field) => {
							switch (field.type) {
								case "business name":
									return [
										field.type,
										z
											.array(
												z
													.string()
													.min(
														1,
														"Name must have at least one character"
													)
											)
											.length(
												4,
												"Enter 4 business names"
											),
									];
								case "objectives":
									// let objectivesSchema = z.array(z.string());
									// if (field.compulsory) {
									// 	objectivesSchema =
									// 		objectivesSchema.length(
									// 			4,
									// 			"Enter  4 business objectives"
									// 		);
									// }
									// return [field.type, objectivesSchema];
									return [
										field.type,
										z
											.array(z.string())
											.length(
												4,
												"Enter 4 business objectives"
											),
									];
								case "country":
									return [field.type, z.string()];
								// Add more cases as needed
								default:
									return [field.type, z.any()]; // Default validation if no specific type matches
							}
						})
					)
			  );

	const defaultValues =
		isLoading || subForms === undefined
			? {}
			: Object.entries(
					subForms.map((field) => {
						switch (field.type) {
							case "business name":
								return [field.type, []];
							case "objectives":
								return [field.type, []];
							default:
								return [field.type, ""];
						}
					})
			  );

	return {
		schema,
		defaultValues,
	};
};
