import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'list'})
export class RefreshPipePipe implements PipeTransform {

  transform(value, args: any): any {
    const list = [];
    for (const item of list) {
      list.push({item, value: value[item]});
    }
    return list;
  }

}
