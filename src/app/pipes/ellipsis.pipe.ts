import { Pipe, PipeTransform } from '@angular/core';

const DEFAULT_MAX_LENGTH = 60;

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(text: string, maxLength = DEFAULT_MAX_LENGTH): string {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength)}...`;
  }
}
