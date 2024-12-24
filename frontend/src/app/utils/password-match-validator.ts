import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPasswords(
  passwordKey: string,
  confirmPasswordKey: string
) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey)?.value;
    const confirmPassword = formGroup.get(confirmPasswordKey)?.value;

    if (password !== confirmPassword) {
      formGroup.get(confirmPasswordKey)?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      formGroup.get(confirmPasswordKey)?.setErrors(null);
      return null;
    }
  };
}
