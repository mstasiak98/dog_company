import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class ValidatorUtils {
  static dateRangeValidator(fg: FormGroup): ValidationErrors | null {
    const start = fg.get('start_date')?.value;
    const end = fg.get('end_date')?.value;
    return start !== null && end !== null && start < end
      ? null
      : { range: true };
  }

  static dateGreaterThanToday(fc: FormControl): ValidationErrors | null {
    const dateNow = new Date();
    const formDate = fc.value;
    return formDate < dateNow ? { dateBeforeToday: true } : null;
  }

  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return {
        notOnlyWhitespace: true,
      };
    } else {
      return null;
    }
  }
}
