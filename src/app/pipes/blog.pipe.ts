import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blog',
  standalone: true,
})
export class BlogPipe implements PipeTransform {
  transform(value: string | undefined): any {
    if (value == undefined) {
      return value;
    }

    // Regex to find admonitions
    const admonitionRegex =
      /> \[!(\w+)\]\n\s*>(.*?)(?=(?:\n\s*> \[!|$)|\n\n)/gs;
    let admonition = value.matchAll(admonitionRegex);

    // Replace admonitions with formatted divs
    for (const match of admonition) {
      const type = match[1];
      const text = match[2];
      const replacement = `<div class="admonition admonition-${type}">
        <div class="admonition-title">${type}</div>
        <div class="admonition-content">${text}</div>
      </div>`;
      value = value.replace(match[0], replacement);
    }

    return value;
  }
}
