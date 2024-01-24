import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coverletter',
  standalone: true
})
export class CoverletterPipe implements PipeTransform {

  transform(value: string | null): any {
    if (value == null){
      return value
    }

    // Regex to find phone numbers
    let phoneRegex = /\(\d{3}\) \d{3}-\d{4}/g
    let phone = value.match(phoneRegex)

    // Regex to find email addresses
    let emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
    let email = value.match(emailRegex)

    // Regex to find URLs
    let urlRegex = /(https?:\/\/[^\s]+)/g
    let url = value.match(urlRegex)

    // replace phone numbers with clickable links
    if (phone != null){
      phone.forEach((item) => {
        value = value!.replace(item, `<a href="tel:${item}">${item}</a>`)
      })
    }

    // replace email addresses with clickable links
    if (email != null){
      email.forEach((item) => {
        value = value!.replace(item, `<a href="mailto:${item}">${item}</a>`)
      })
    }

    // replace URLs with clickable links
    if (url != null){
      url.forEach((item) => {
        value = value!.replace(item, `<a href="${item}">${item}</a>`)
      })
    }

    return value
  }

}
