import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimumAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const birthDate = new Date(control.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (
            age > minAge ||
            (age === minAge && monthDiff > 0) ||
            (age === minAge && monthDiff === 0 && dayDiff >= 0)
        ) {
            return null; // The age is valid
        } else {
            return { minimumAge: { value: control.value } };
        }
    };
}
