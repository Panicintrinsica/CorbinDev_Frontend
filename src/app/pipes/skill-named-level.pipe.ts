import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'levelToName',
  standalone: true
})
export class NamedSkillLevel implements PipeTransform {
  transform(value: number): string {
    if (value < 20) return 'General';
    if (value >= 20 && value < 40) return 'Moderate';
    if (value >= 40 && value < 60) return 'Intermediate';
    if (value >= 60 && value < 80) return 'Advanced';
    if (value >= 80 && value < 95) return 'Expert';
    if (value >= 95) return 'Master';
    return 'Undefined';
  }
}
