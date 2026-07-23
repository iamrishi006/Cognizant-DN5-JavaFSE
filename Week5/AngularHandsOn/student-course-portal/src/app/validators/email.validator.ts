import {
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {

  return new Promise(resolve => {

    setTimeout(() => {

      const email = control.value;

      if (email && email.includes('test@')) {

        resolve({
          emailTaken: true
        });

      } else {

        resolve(null);

      }

    }, 800);

  });

}