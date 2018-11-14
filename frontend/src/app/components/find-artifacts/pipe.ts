import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
  })
  export class MyFilterPipe implements PipeTransform {
    constructor() { }
    transform(value: any, query: string): any {
        return query ? value.reduce((prev, next) => {
          if (next['name'].includes(query) || next['description'].includes(query) || next['tags'] && next['tags'].includes(query)) {
            prev.push(next);
          }
          return prev;
        }, []) : value;
      }
  }
