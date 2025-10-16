export type AuthMode = "login" | "signup";

export type AuthFields = {
  email: string;
  password: string;
  confirm?: string;
  fullName?: string;
};

export type FieldErrors = Partial<Record<keyof AuthFields, string>>;

export function validateAuthFields(
  fields: AuthFields,
  mode: AuthMode
): FieldErrors {
  const { email, password, confirm, fullName } = fields;
  const errors: FieldErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (mode === "signup") {
    if (!fullName?.trim()) errors.fullName = "Full name is required";
    if (!confirm?.trim()) errors.confirm = "Please confirm your password";
    if (password && confirm && password !== confirm) {
      errors.confirm = "Passwords do not match";
    }
  }

  return errors;
}
