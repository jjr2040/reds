import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artifactFilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  constructor() { }
  transform(value: any, query: string, type: string): any {
    return query ? value.reduce((prev, next) => {
      if (type === 'all') {
        if (next['name'].includes(query) || next['description'].includes(query) || next['tags'] && next['tags'].includes(query)) {
          prev.push(next);
        }
      } else if (type === 'name') {
        if (next['name'].includes(query)) {
          prev.push(next);
        }
      } else if (type === 'description') {
        if (next['description'].includes(query)) {
          prev.push(next);
        }
      } else if (type === 'tags') {
        if (next['tags'] && next['tags'].includes(query)) {
          prev.push(next);
        }
      }
      return prev;
    }, []) : value;
  }
}
