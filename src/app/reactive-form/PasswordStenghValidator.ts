import {FormControl} from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordStenghValidator {

  public static strong(control: FormControl): ValidationResult {
    const hasUpper = /[A-Z]/.test(control.value);
    const hasSpecialCharacter = /[@#$%^&]/.test(control.value);
    const valid =  hasUpper && hasSpecialCharacter;
    if (!valid) {
      // return what´s not valid
      return { strong: true };
    }
    return null;
  }
}
