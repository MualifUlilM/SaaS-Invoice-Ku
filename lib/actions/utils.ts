import { ZodError } from "zod";

export function formatValidationErrors(error: ZodError) {
  const fieldErrors: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const key = issue.path.join(".") || "general";
    if (!fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  });

  return fieldErrors;
}
