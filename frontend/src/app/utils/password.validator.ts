import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Allow empty values (handled by other required validators)
    }

    /* const hasUppercase = /[A-Z]/.test(value); */
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    /* const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value); */
    const isLengthValid = value.length >= 8 && value.length <= 20;

    const passwordValid =
     /*  hasUppercase && */
      hasLowercase &&
      hasNumber &&
    /*   hasSpecialChar && */
      isLengthValid;

    if (!passwordValid) {
      return {
        strongPassword: {
          message:
            'Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
      };
    }

    return null; // Valid password
  };
}
