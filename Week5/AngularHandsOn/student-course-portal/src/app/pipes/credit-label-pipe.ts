import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel'
})
export class CreditLabelPipe implements PipeTransform {

  transform(credits: number): string {

    if (credits >= 4) {
      return 'High Credit';
    }

    if (credits === 3) {
      return 'Medium Credit';
    }

    return 'Low Credit';
  }

}