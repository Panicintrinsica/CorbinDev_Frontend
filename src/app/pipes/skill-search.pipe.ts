import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillSearch',
  standalone: true
})
export class SkillSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return Object.keys(item).some(key => item[key]?.toString().toLowerCase().includes(searchText));
    });
  }

}
